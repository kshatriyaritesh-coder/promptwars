import { AirQualityData, FamilyMember, ChatMessage } from '../types';

interface ContextPayload {
  aqiData: AirQualityData;
  members: FamilyMember[];
  language: 'en' | 'hi';
}

export function generateAssistantReply(
  question: string,
  context: ContextPayload
): { replyText: string; isWarning: boolean; suggestedQuestions: string[] } {
  const q = question.toLowerCase();
  const { aqiData, members, language } = context;
  const isHi = language === 'hi';

  const emergencyKeywords = [
    'chest pain', 'heart pain', 'cant breathe', "can't breathe", 'breathless', 'gasping', 
    'blue lips', 'unconscious', 'fainting', 'severe asthma attack', 'छाती में दर्द', 'सांस नहीं आ रही', 
    'दम घुट रहा है', 'होश'
  ];

  const isEmergency = emergencyKeywords.some(kw => q.includes(kw));

  if (isEmergency) {
    const warningEn = `🚨 **URGENT MEDICAL NOTICE**: The symptoms you described (acute breathlessness, chest discomfort, or severe asthma attack) require **immediate emergency medical evaluation**.\n\n- Sit upright in a calm, filtered room and administer the prescribed emergency rescue inhaler (such as Salbutamol / Budesonide) immediately.\n- If symptoms do not improve within 5 minutes, call Emergency Services at **112 / 108** or proceed directly to the nearest hospital casualty.\n- *Medical Disclaimer: BreatheWell provides air quality advisory, not clinical diagnosis or emergency medical care.*`;

    const warningHi = `🚨 **आपातकालीन चिकित्सा चेतावनी**: आपने जिन लक्षणों (अचानक सांस फूलना, छाती में तेज दर्द या गंभीर दमा का दौरा) का उल्लेख किया है, उनके लिए **तत्काल डॉक्टर की सहायता आवश्यक है**।\n\n- तुरंत शांत होकर सीधे बैठें और डॉक्टर द्वारा सुझाया गया रेस्क्यू इनहेलर लें।\n- यदि 5 मिनट में आराम न मिले, तो तुरंत आपातकालीन नंबर **112 / 108** पर कॉल करें या नजदीकी अस्पताल जाएं।\n- *चिकित्सा अस्वीकरण: ब्रीदवेल केवल वायु गुणवत्ता सलाहकार है, यह आपातकालीन डॉक्टरी इलाज का विकल्प नहीं है।*`;

    return {
      replyText: isHi ? warningHi : warningEn,
      isWarning: true,
      suggestedQuestions: isHi
        ? ['इनहेलर कैसे सही तरीके से लें?', 'स्मॉग में प्राथमिक उपचार क्या है?']
        : ['How to properly use a spacer?', 'First aid for smog breathlessness?']
    };
  }

  if (q.includes('night') && (q.includes('purifier') || q.includes('प्यूरीफायर') || q.includes('रात'))) {
    if (isHi) {
      return {
        replyText: `**हाँ, रात भर एयर प्यूरीफायर को स्लीप मोड में चालू रखना अत्यधिक लाभदायक है।**\n\n1. **कारण:** सर्दियों में रात को तापमान उलटाव (Temperature Inversion) के कारण जहरीला धुआं सबसे अधिक सघन होकर जमीन के पास जमा हो जाता है।\n2. **सेटिंग:** रात में पंखे की स्पीड को 'Sleep / Low Mode' पर रखें ताकि शोर न हो और बिजली की खपत भी मात्र 15-25 वॉट रहे।\n3. **कमरे की स्थिति:** बेडरूम के सभी खिड़की-दरवाजे बंद रखें और प्यूरीफायर को बिस्तर से 4-5 फीट दूर रखें।\n\nवर्तमान ${aqiData.city} में AQI **${aqiData.aqi}** है, इसलिए रात भर प्यूरीफायर चलाना फेफड़ों को 8 घंटे का सुरक्षित विष-मुक्त वातावरण देता है।`,
        isWarning: false,
        suggestedQuestions: ['प्यूरीफायर का फिल्टर कब बदलना चाहिए?', 'किचन का धुआं कैसे रोकें?']
      };
    } else {
      return {
        replyText: `**Yes, you should definitely run your air purifier throughout the night on Sleep/Low mode.**\n\n1. **Why Night is Critical:** Due to winter ground thermal inversion, smog concentrations peak between 9:00 PM and 6:00 AM.\n2. **Continuous Low Filtration:** Modern HEPA purifiers consume only 15–30 Watts on sleep mode (equivalent to a night lamp) and keep indoor PM2.5 below 25 µg/m³.\n3. **Placement:** Keep the purifier at least 2 feet away from bedroom walls and shut bedroom doors and balcony sliding glass.\n\nIn ${aqiData.city} with a current AQI of **${aqiData.aqi} (${aqiData.cpcbCategory})**, clean overnight air significantly cuts morning coughing and airway inflammation.`,
        isWarning: false,
        suggestedQuestions: ['When should I replace the HEPA filter?', 'Should windows be open today?']
      };
    }
  }

  if (q.includes('plant') || q.includes('पौध') || q.includes('nasa')) {
    if (isHi) {
      return {
        replyText: `🌿 **वैज्ञानिक सच्चाई: पौधे अकेले स्मॉग और PM2.5 को साफ नहीं कर सकते (यह एक लोकप्रिय भ्रम है)।**\n\n- **नासा स्टडी का सच:** 1989 की नासा रिसर्च एक छोटे, सीलबंद ग्लास चैंबर में रसायनों (VOCs) पर की गई थी, जहरीले धुएं (PM2.5 पार्टिकुलेट) पर नहीं।\n- **वास्तविकता:** एक मध्यम कमरे में प्यूरीफायर जितनी हवा साफ करने के लिए प्रति वर्ग मीटर 10 से 100 पौधों की जरूरत पड़ेगी।\n- **सावधानी:** सर्दियों में गमलों में ज्यादा पानी देने से मिट्टी में फंगस/फफूंद उगती है, जो दमा के मरीजों के लिए हानिकारक हो सकती है।\n- **सलाह:** पौधे घर की सुंदरता के लिए जरूर रखें, पर स्मॉग से बचाव हेतु HEPA फिल्टर का ही प्रयोग करें।`,
        isWarning: false,
        suggestedQuestions: ['कम खर्च में DIY प्यूरीफायर कैसे बनाएं?', 'N95 मास्क और कपड़े के मास्क में क्या अंतर है?']
      };
    } else {
      return {
        replyText: `🌿 **Scientific Fact: Houseplants alone cannot filter urban winter smog or PM2.5 particulate matter.**\n\n- **The NASA Study Context:** The famous 1989 NASA Clean Air study tested volatile organic gases (VOCs) in sealed 1-meter plexiglass chambers, NOT airborne PM2.5/PM10 smoke in real homes.\n- **Physical Reality:** Peer-reviewed studies show natural ventilation dilutes air faster than plants absorb toxins. You would need between 10 to 100 plants per square meter to equal a single standard HEPA purifier!\n- **Winter Caveat:** Overwatering indoor plants in winter increases indoor humidity and fungal mold spores, which can trigger wheezing in children and asthmatics.\n- **Verdict:** Keep plants for joy and biophilia, but rely on mechanical True HEPA filtration to clean severe smog.`,
        isWarning: false,
        suggestedQuestions: ['How does a Corsi-Rosenthal DIY box work?', 'What is the best mask for my child?']
      };
    }
  }

  if (q.includes('mask') || q.includes('मास्क') || q.includes('n95')) {
    if (isHi) {
      return {
        replyText: `😷 **मास्क संबंधी सटीक नियम एवं दिशा-निर्देश:**\n\n1. **N95 / FFP2 अनिवार्य:** सामान्य कपड़े का मास्क या गमछा केवल 15-25% धूल रोकता है; 2.5 माइक्रोन का बारीक जहरीला कण सीधे फेफड़ों में चला जाता है। N95 मास्क 95% से अधिक जहरीले कणों को रोकता है।\n2. **बिना वॉल्व वाला मास्क:** वॉल्व वाले मास्क सांस छोड़ते समय खुलते हैं और फिटिंग ढीली होने पर बाहर का धुआं अंदर खींच सकते हैं। बिना वॉल्व का मास्क सबसे सुरक्षित है।\n3. **बच्चों के लिए:** वयस्कों का मास्क बच्चों को ढीला होता है। उनके लिए विशेष 'Small/Pediatric N95' खरीदें जिसकी नोज-पिन नाक पर कसकर बैठ सके।\n4. **मास्क का जीवनकाल:** रोजाना 2-3 घंटे इस्तेमाल पर एक N95 मास्क 40-50 घंटे (लगभग 10-14 दिन) चलता है।`,
        isWarning: false,
        suggestedQuestions: ['क्या कपड़े का मास्क काम करता है?', 'बच्चों को स्कूल के समय क्या सावधानी रखें?']
      };
    } else {
      return {
        replyText: `😷 **Mask Guidance grounded in CPCB & WHO Standards:**\n\n1. **Why N95 / FFP2 is essential:** Cloth masks and bandanas only filter 15–25% of fine particles because textile weave pores (100–500 µm) are huge compared to PM2.5 (2.5 µm). Certified N95/FFP2 electrostatically captures ≥95% of micro-particles.\n2. **No Exhalation Valves:** Masks with plastic exhaust valves compromise seal integrity and inhale unfiltered side-drafts during quick inhalations.\n3. **For Children:** Adult masks leave gaps at cheeks and chin. Always source certified Pediatric Small N95s with adjustable ear loops and metal nose pinch clips.\n4. **Lifespan:** A single N95 mask can be reused for 40–50 hours of active wear (approx. 10–14 days) if stored in a dry paper bag between commutes.`,
        isWarning: false,
        suggestedQuestions: ['Can seniors go for a morning walk today?', 'When should I open windows?']
      };
    }
  }

  if (q.includes('walk') || q.includes('morning') || q.includes('senior') || q.includes('टहल') || q.includes('सुबह')) {
    if (isHi) {
      return {
        replyText: `🚶‍♂️ **बुजुर्गों एवं सुबह टहलने वालों के लिए जरूरी सलाह:**\n\n- **सुबह 6 से 9:30 बजे बिल्कुल न टहलें:** रात की ठंड के कारण प्रदूषण की घनी चादर (Thermal Inversion) जमीन से मात्र 50 मीटर ऊपर जम जाती है। सुबह गहरी सांस लेने से करोड़ों जहरीले कण सीधे रक्तप्रवाह में घुल जाते हैं।\n- **सही समय:** टहलने का सबसे सुरक्षित समय **दोपहर 1:30 से 3:30 बजे** के बीच है, जब धूप खिलने से धुआं ऊपर उठ जाता है।\n- **घर पर विकल्प:** सुबह घर के अंदर ही हल्का योग, प्राणायाम (हल्की गति से) या कमरे में 15 मिनट टहलें।\n- **दवाएं:** यदि दमा या बीपी की समस्या है, तो डॉक्टर द्वारा दिया गया इनहेलर हमेशा साथ रखें।`,
        isWarning: false,
        suggestedQuestions: ['दोपहर में खिड़की खोलने का सबसे अच्छा समय क्या है?', 'घर में अगरबत्ती जलाने के क्या नुकसान हैं?']
      };
    } else {
      return {
        replyText: `🚶‍♂️ **Morning Walk Guidance for Seniors & Active Adults:**\n\n- **Avoid 6:00 AM – 9:30 AM Outdoor Walks:** Cold nocturnal ground inversion traps dense vehicular soot and particulate matter right in the human breathing zone. Deep breathing during morning cardio causes severe bronchial irritation.\n- **Safe Time Window:** The safest outdoor window is **12:30 PM to 3:30 PM**, when solar radiation heats the ground and stimulates vertical atmospheric mixing.\n- **Indoor Alternative:** Substitute outdoor jogging with indoor stationary pedaling, chair yoga, or indoor hallway pacing in a filtered room.\n- **Current ${aqiData.city} AQI:** With ${aqiData.aqi} (${aqiData.cpcbCategory}), outdoor cardio causes more cardiovascular harm than aerobic benefit today.`,
        isWarning: false,
        suggestedQuestions: ['What should my family do today?', 'Should I run the purifier at night?']
      };
    }
  }

  if (q.includes('window') || q.includes('ventil') || q.includes('खिड़क') || q.includes('हवा')) {
    if (isHi) {
      return {
        replyText: `🪟 **खिड़कियां कब और कैसे खोलें:**\n\n- **सख्त नियम:** सुबह (6:00-10:00 AM) और शाम (7:00-11:00 PM) खिड़कियां पूरी तरह बंद रखें।\n- **खोलने का सही समय:** केवल **दोपहर 1:30 से 3:00 बजे** के बीच 10-15 मिनट के लिए ही खोलें, ताकि कमरे की कार्बन डाइऑक्साइड बाहर निकल सके।\n- **क्रॉस-वेंटिलेशन:** सामने की खिड़की और दरवाजा एक साथ 10 मिनट खोलकर तुरंत बंद कर दें, फिर एयर प्यूरीफायर चलाएं।`,
        isWarning: false,
        suggestedQuestions: ['किचन का धुआं कैसे रोकें?', 'क्या एयर प्यूरीफायर 24 घंटे चलाना चाहिए?']
      };
    } else {
      return {
        replyText: `🪟 **Smart Ventilation Guidelines:**\n\n- **Seal Morning & Evening:** Never leave windows open during morning rush hour (6:00–10:00 AM) or evening cooling (7:00–11:00 PM) when ground-level PM2.5 is at hazardous peaks.\n- **Midday Micro-Ventilation (10–15 Mins):** Open windows only between **1:30 PM and 3:30 PM** when solar thermal currents lift smog. A quick cross-ventilation burst flushes CO2 without dumping excessive soot indoors.\n- **Immediately Re-seal:** Seal tight after 15 minutes and run your HEPA filter to scrub ambient dust that entered.`,
        isWarning: false,
        suggestedQuestions: ['How to size a room air purifier?', 'Is incense/agarbatti really harmful?']
      };
    }
  }

  const memberCount = members.length;
  const vulnerableCount = members.filter(m => m.age < 12 || m.age >= 60 || m.condition !== 'none').length;

  if (isHi) {
    return {
      replyText: `आपके परिवार में ${memberCount} सदस्य हैं (जिनमें ${vulnerableCount} संवेदनशील सदस्य हैं)।\n\nवर्तमान में ${aqiData.city} में AQI **${aqiData.aqi} (${aqiData.cpcbCategory})** दर्ज है:\n1. **मास्क:** बाहर निकलने पर N95 मास्क का इस्तेमाल अनिवार्य रखें।\n2. **बाहरी गतिविधियां:** दोपहर 1:30 से 3:30 बजे के बीच ही बाहर के काम निपटाएं। सुबह-शाम बाहर कसरत न करें।\n3. **घर के भीतर सुरक्षा:** सूखे झाड़ू के बदले गीला पोछा लगाएं, अगरबत्ती और मच्छर कॉइल का उपयोग बंद रखें, और प्यूरीफायर चलाएं।\n4. **पर्यावरण योगदान:** आज कार के स्थान पर मेट्रो या कारपूल अपनाकर लगभग 1.8 किग्रा कार्बन बचाएं।\n\n*नोट: किसी भी गंभीर लक्षण पर तुरंत डॉक्टर से परामर्श लें।*`,
      isWarning: false,
      suggestedQuestions: [
        'क्या मुझे रात में प्यूरीफायर चलाना चाहिए?',
        'क्या पौधे स्मॉग साफ करते हैं?',
        'बुजुर्गों के लिए क्या सावधानी रखें?'
      ]
    };
  } else {
    return {
      replyText: `Based on your household profile (${memberCount} members, including ${vulnerableCount} vulnerable individuals) and ${aqiData.city}'s live AQI of **${aqiData.aqi} (${aqiData.cpcbCategory})**:\n\n1. **Target Outdoor Window:** Schedule outdoor chores between **1:30 PM and 3:30 PM**; strictly avoid outdoor sports or cardio during morning rush hours.\n2. **Personal Protection:** Wear certified N95 / FFP2 masks tightly pinched across the nose bridge for any transit outside.\n3. **Indoor Sanctuary:** Keep windows sealed during morning inversion. Wet-mop rather than dry-sweep, ban incense/dhoop, and run room purifiers in closed spaces.\n4. **Commute Impact:** Choosing metro over private driving today saves ~1.8 kg CO₂ and cuts roadway diesel soot exposure.\n\n*Disclaimer: BreatheWell recommendations are preventive guidance and do not replace personalized medical advice.*`,
      isWarning: false,
      suggestedQuestions: [
        'Should I run the purifier at night?',
        'Do indoor plants clean smog?',
        'Can seniors go for a morning walk?'
      ]
    };
  }
}
