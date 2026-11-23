import { AirQualityData, FamilyMember } from '../types';
import { generateAssistantReply } from './aiAssistant';

interface GeminiRequestPayload {
  question: string;
  aqiData: AirQualityData;
  members: FamilyMember[];
  language: 'en' | 'hi';
  customApiKey?: string;
}

interface GeminiResponse {
  replyText: string;
  isWarning: boolean;
  suggestedQuestions: string[];
  isGeminiPowered: boolean;
}

export async function askGeminiOrLocalRAG(payload: GeminiRequestPayload): Promise<GeminiResponse> {
  const { question, aqiData, members, language, customApiKey } = payload;
  const isHi = language === 'hi';

  const emergencyKeywords = [
    'chest pain', 'heart pain', 'cant breathe', "can't breathe", 'breathless', 'gasping',
    'blue lips', 'unconscious', 'fainting', 'severe asthma attack', 'छाती में दर्द', 'सांस नहीं आ रही',
    'दम घुट रहा है', 'होश'
  ];

  const lowerQ = question.toLowerCase();
  const isEmergency = emergencyKeywords.some(kw => lowerQ.includes(kw));

  if (isEmergency) {
    const warningEn = `🚨 **URGENT CLINICAL ALERT**: The symptoms you described (acute breathlessness, chest tightness, or severe asthma exacerbation) require **immediate emergency medical evaluation**.\n\n- Sit upright in a sealed room with active HEPA air filtration.\n- Administer the prescribed emergency rescue inhaler (such as Salbutamol / Budesonide) immediately.\n- If symptoms fail to resolve within 5 minutes, dial Emergency Services at **112 / 108** or proceed directly to hospital casualty.\n\n*Medical Notice: BreatheWell provides preventive environmental advisories, not clinical diagnosis.*`;
    const warningHi = `🚨 **आपातकालीन चिकित्सा चेतावनी**: आपने जिन गंभीर लक्षणों (अचानक सांस फूलना, छाती में तेज दर्द या दमा का दौरा) का उल्लेख किया है, उनके लिए **तत्काल आपातकालीन चिकित्सा सहायता आवश्यक है**।\n\n- सीधे शांत होकर बैठें और कमरे का एयर प्यूरीफायर चलाएं।\n- डॉक्टर द्वारा दिया गया आपातकालीन रेस्क्यू इनहेलर तुरंत लें।\n- यदि 5 मिनट में राहत न मिले तो तुरंत आपातकालीन नंबर **112 / 108** पर कॉल करें या नजदीकी अस्पताल जाएं।\n\n*चिकित्सा अस्वीकरण: ब्रीदवेल केवल पर्यावरण जोखिम परामर्श देता है, यह डॉक्टरी इलाज का विकल्प नहीं है।*`;

    return {
      replyText: isHi ? warningHi : warningEn,
      isWarning: true,
      suggestedQuestions: isHi
        ? ['इनहेलर का सही उपयोग कैसे करें?', 'स्मॉग में प्राथमिक उपचार क्या है?']
        : ['How to properly use an inhaler spacer?', 'Emergency steps for severe smog spikes?'],
      isGeminiPowered: false
    };
  }

  const apiKey = customApiKey?.trim() || import.meta.env.VITE_GEMINI_API_KEY?.trim() || '';

  if (!apiKey) {
    const fallback = generateAssistantReply(question, { aqiData, members, language });
    return {
      replyText: fallback.replyText,
      isWarning: fallback.isWarning,
      suggestedQuestions: fallback.suggestedQuestions,
      isGeminiPowered: false
    };
  }

  try {
    const membersSummary = members.map(m => 
      `- ${m.name}: Age ${m.age}, Relationship: ${m.relationship}, Vulnerability: ${m.condition}${m.customNotes ? ` (${m.customNotes})` : ''}`
    ).join('\n');

    const systemPrompt = `You are BreatheWell AI, an expert environmental health specialist and clinical smog prevention assistant grounded in official CPCB (Central Pollution Control Board of India), WHO Guidelines for Ambient & Indoor Air Quality, and ICMR (Indian Council of Medical Research) advisories.

Current Real-Time Atmospheric & Health Context:
- City: ${aqiData.city}
- Station: ${aqiData.stationName} (${aqiData.stationDistanceKm} km away)
- Current AQI: ${aqiData.aqi} (${aqiData.cpcbCategory})
- Primary Pollutant: ${aqiData.dominantPollutant} (${aqiData.pollutants.pm25.value} µg/m³)
- Meteorology: ${aqiData.weather.temp}°C, ${aqiData.weather.humidity}% Humidity, Wind ${aqiData.weather.windSpeedKmH} km/h ${aqiData.weather.windDirection}
- Boundary Layer Inversion: ${aqiData.weather.inversionRisk}
- Household Profile:
${membersSummary}

Core Guidelines:
1. Ground mask guidance strictly in certified N95/FFP2 without exhalation valves (cloth masks only stop 15-25% of PM2.5).
2. Ground ventilation guidance in solar convective mixing (midday 1:30 PM - 3:00 PM only, avoid 6:00 AM - 9:30 AM morning inversion).
3. Ground air purifier advice in True HEPA H13 filtration, closed doors, and continuous low/sleep operation.
4. If asked in Hindi, respond fluently in Hindi with Devanagari script. If asked in English, respond in English.
5. Keep response clear, structured with markdown bold points, highly actionable, empathetic, and concise (under 180 words).`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemPrompt}\n\nUser Question: ${question}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 600
        }
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('Empty Gemini response parts');
    }

    const suggested = isHi
      ? ['प्यूरीफायर रात में कैसे चलाएं?', 'बच्चों के लिए N95 मास्क गाइड', 'सुबह टहलने का सही समय']
      : ['Should I run purifier on sleep mode?', 'Pediatric N95 fitting guidelines', 'Best time for outdoor errands'];

    return {
      replyText: generatedText.trim(),
      isWarning: false,
      suggestedQuestions: suggested,
      isGeminiPowered: true
    };
  } catch (error) {
    const fallback = generateAssistantReply(question, { aqiData, members, language });
    return {
      replyText: fallback.replyText,
      isWarning: fallback.isWarning,
      suggestedQuestions: fallback.suggestedQuestions,
      isGeminiPowered: false
    };
  }
}
