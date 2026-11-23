import { AirQualityData, FamilyMember, MemberRiskAssessment, DailySmogPlan, RiskLevel, AQICategory } from '../types';

export function isVulnerableMember(member: FamilyMember): boolean {
  if (member.age < 12 || member.age >= 60) return true;
  if (['asthma', 'heart', 'pregnancy', 'elderly', 'child', 'allergies'].includes(member.condition)) {
    return true;
  }
  return false;
}

export function computeMemberRisk(
  member: FamilyMember,
  aqiData: AirQualityData
): MemberRiskAssessment {
  const { aqi, cpcbCategory } = aqiData;
  const isVulnerable = isVulnerableMember(member);
  const isSevereAsthmaOrHeart = ['asthma', 'heart'].includes(member.condition);

  let riskLevel: RiskLevel = 'Low';
  let riskScore = 2;

  if (cpcbCategory === 'Good' || cpcbCategory === 'Satisfactory') {
    if (isVulnerable) {
      riskLevel = 'Low-Moderate';
      riskScore = 3;
    } else {
      riskLevel = 'Low';
      riskScore = 1;
    }
  } else if (cpcbCategory === 'Moderate') {
    if (isVulnerable) {
      riskLevel = 'High';
      riskScore = 6;
    } else {
      riskLevel = 'Moderate';
      riskScore = 4;
    }
  } else if (cpcbCategory === 'Poor') {
    if (isVulnerable) {
      riskLevel = 'Very High';
      riskScore = 8;
    } else {
      riskLevel = 'High';
      riskScore = 6;
    }
  } else if (cpcbCategory === 'Very Poor') {
    if (isVulnerable) {
      riskLevel = 'Severe';
      riskScore = 9;
    } else {
      riskLevel = 'Very High';
      riskScore = 8;
    }
  } else {
    if (isVulnerable) {
      riskLevel = 'Severe + "stay indoors"';
      riskScore = 10;
    } else {
      riskLevel = 'Severe';
      riskScore = 9;
    }
  }

  let outdoorActivity = 'Safe for routine outdoor exercise and movement.';
  let outdoorActivityHi = 'सामान्य बाहरी गतिविधियों और व्यायाम के लिए सुरक्षित है।';

  let maskRequired: 'None' | 'Cloth (basic)' | 'N95 / FFP2 mandatory' = 'None';
  let maskReason = 'No mask needed under current clean atmospheric conditions.';
  let maskReasonHi = 'वर्तमान स्वच्छ वायु में मास्क की आवश्यकता नहीं है।';

  let schoolOrWork = 'Normal attendance and standard routine.';
  let schoolOrWorkHi = 'सामान्य उपस्थिति और नियमित दिनचर्या जारी रखें।';

  let specialCare = 'Stay hydrated. Keep general home cleanliness.';
  let specialCareHi = 'पर्याप्त पानी पिएं और घर में सामान्य स्वच्छता बनाए रखें।';
  let medicalConsultWarning = false;

  if (aqi > 200) {
    maskRequired = isVulnerable ? 'N95 / FFP2 mandatory' : 'N95 / FFP2 mandatory';
    maskReason = 'Fine particulate (PM2.5) penetrates deep lung alveoli. Cloth masks fail to filter microscopic smog particles.';
    maskReasonHi = 'बारीक कण (PM2.5) फेफड़ों में गहराई तक प्रवेश करते हैं। साधारण कपड़े का मास्क इसे नहीं रोक पाता।';

    if (member.age < 12) {
      outdoorActivity = aqi > 300 
        ? 'Strictly skip outdoor play and physical sports. Conduct indoor board games or study.'
        : 'Avoid morning outdoor play. Reschedule recess activities to indoor rooms.';
      outdoorActivityHi = aqi > 300
        ? 'बाहरी खेल और दौड़-कूद पूरी तरह बंद रखें। घर के अंदर रचनात्मक खेल खेलें।'
        : 'सुबह बाहर खेलने से बचें। दोपहर में थोड़ी देर ही बाहर जाएं।';

      schoolOrWork = aqi > 350
        ? 'Commute with snug-fitting pediatric N95. Request school to cancel outdoor morning assembly.'
        : 'Wear N95 on the school bus/van commute. Avoid open window seating.';
      schoolOrWorkHi = aqi > 350
        ? 'स्कूल आवागमन में N95 मास्क पहनें। स्कूल से प्रार्थना सभा हॉल में कराने का अनुरोध करें।'
        : 'स्कूल बस या वैन में यात्रा के दौरान N95 मास्क पहनें।';

      if (member.condition === 'asthma') {
        specialCare = 'Keep pediatric rescue inhaler accessible in backpack. Note any morning coughing fits.';
        specialCareHi = 'रेस्क्यू इनहेलर हमेशा स्कूल बैग में रखें। सुबह की खांसी पर नजर रखें।';
        medicalConsultWarning = aqi > 350;
      }
    } else if (member.age >= 60) {
      outdoorActivity = 'Stay strictly indoors. Do NOT go for 6 AM - 9 AM morning walks; cold inversion traps heavy toxic particles at ground level.';
      outdoorActivityHi = 'घर के अंदर ही रहें। सुबह 6 से 9 बजे के बीच टहलने बिल्कुल न जाएं; ठंडी हवा जहरीले कणों को नीचे रोकती है।';

      schoolOrWork = 'Stay at home in a filtered room. Switch morning walks to light indoor yoga or stretching.';
      schoolOrWorkHi = 'कमरे में ही रहें। बाहर टहलने के बदले घर के अंदर ही हल्का योग या वॉक करें।';

      if (isSevereAsthmaOrHeart) {
        specialCare = 'Keep doctor-prescribed bronchodilator / inhaler and pulse oximeter handy. Check SpO2 if breathless.';
        specialCareHi = 'डॉक्टर द्वारा दी गई दवाएं और पल्स ऑक्सीमीटर पास रखें। सांस फूलने पर तुरंत ऑक्सीजन स्तर जांचें।';
        medicalConsultWarning = aqi > 300;
      }
    } else if (member.condition === 'pregnancy') {
      outdoorActivity = 'Eliminate non-essential outdoor exposure. Fetal oxygenation is susceptible to ultrafine PM2.5 spikes.';
      outdoorActivityHi = 'बिना जरूरी काम के बाहर न निकलें। गर्भस्थ शिशु के स्वास्थ्य हेतु स्वच्छ हवा अनिवार्य है।';
      maskRequired = 'N95 / FFP2 mandatory';
      specialCare = 'Use room air purifier near bed. Avoid exposure to agarbatti, mosquito coils, and roadside diesel smoke.';
      specialCareHi = 'बेडरूम में एयर प्यूरीफायर चलाएं। अगरबत्ती और मच्छर की अगरबत्ती के धुएं से बचें।';
      medicalConsultWarning = aqi > 350;
    } else {
      outdoorActivity = aqi > 300
        ? 'Limit outdoor time to essential tasks only. Skip vigorous outdoor cardio or jogging.'
        : 'Shift vigorous workouts indoors or to midday (1 PM - 3 PM).';
      outdoorActivityHi = aqi > 300
        ? 'केवल अनिवार्य काम के लिए ही बाहर निकलें। बाहर तेज दौड़ने या जॉगिंग से बचें।'
        : 'वर्कआउट घर के अंदर करें या दोपहर 1 से 3 बजे के बीच करें।';

      schoolOrWork = 'Prefer metro rail over personal car/bike to lower both personal exposure and urban emissions.';
      schoolOrWorkHi = 'कार या बाइक के बदले मेट्रो का उपयोग करें ताकि व्यक्तिगत प्रदूषण संपर्क और उत्सर्जन दोनों कम हों।';
      specialCare = 'Use vehicle AC in recirculation mode with active PM2.5 cabin filter. Gargle with warm water in evening.';
      specialCareHi = 'कार चलाते समय एसी को रीसर्क्युलेशन मोड पर रखें। शाम को गुनगुने पानी से गरारे करें।';
    }
  } else if (aqi > 100) {
    if (isVulnerable) {
      maskRequired = 'N95 / FFP2 mandatory';
      maskReason = 'Sensitive respiratory tracts react even at moderate particulate thresholds.';
      maskReasonHi = 'संवेदनशील फेफड़ों वाले सदस्यों को मध्यम स्तर पर भी असुविधा हो सकती है।';
      outdoorActivity = 'Moderate outdoor activity is permitted, but avoid heavy exertion along busy roadways.';
      outdoorActivityHi = 'सामान्य बाहरी काम कर सकते हैं, लेकिन भारी ट्रैफिक वाली सड़कों के पास दौड़ने से बचें।';
      specialCare = 'Keep prescribed medications within reach.';
      specialCareHi = 'नियमित दवाएं पास रखें और पर्याप्त पानी पिएं।';
    } else {
      maskRequired = 'None';
      maskReason = 'Air quality is within manageable limits for healthy adults.';
      maskReasonHi = 'स्वस्थ वयस्कों के लिए वर्तमान स्तर सहनीय है।';
    }
  }

  return {
    memberId: member.id,
    memberName: member.name,
    age: member.age,
    condition: member.condition,
    riskLevel,
    riskScore,
    recommendations: {
      outdoorActivity,
      outdoorActivityHi,
      maskRequired,
      maskReason,
      maskReasonHi,
      schoolOrWork,
      schoolOrWorkHi,
      specialCare,
      specialCareHi,
      medicalConsultWarning
    }
  };
}

export function generateDailySmogPlan(
  members: FamilyMember[],
  aqiData: AirQualityData,
  hasPurifier: boolean
): DailySmogPlan {
  const memberAssessments = members.map(m => computeMemberRisk(m, aqiData));
  const { aqi, cpcbCategory } = aqiData;

  const todayStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  let bestOutdoorWindow = '2:00 PM – 3:30 PM (Midday inversion lifts with solar heating)';
  let bestOutdoorWindowHi = 'दोपहर 2:00 बजे से 3:30 बजे (धूप खिलने से धुआं ऊपर उठता है)';

  let worstOutdoorWindow = '06:00 AM – 09:30 AM & 07:30 PM – 10:30 PM (Peak cold ground inversion & traffic)';
  let worstOutdoorWindowHi = 'सुबह 06:00 से 09:30 बजे और रात 07:30 से 10:30 बजे (तापमान उलटाव और भारी स्मॉग)';

  let maskRecommendation = aqi > 200 
    ? 'Wear certified N95 / FFP2 masks without exhalation valves for all outdoor excursions.'
    : 'N95 recommended for sensitive members, children, and elderly during peak hours.';
  let maskRecommendationHi = aqi > 200
    ? 'बाहर जाते समय बिना वॉल्व वाला प्रमाणित N95 / FFP2 मास्क अवश्य पहनें।'
    : 'संवेदनशील सदस्यों, बच्चों और बुजुर्गों के लिए N95 मास्क की सलाह दी जाती है।';

  let ventilationTiming = aqi > 250
    ? 'Keep windows tightly sealed during morning and evening. Brief 10-15 min cross-ventilation only around 2:00 PM.'
    : 'Open windows for 20-30 mins between 1:30 PM and 3:30 PM when outdoor dispersion is highest.';
  let ventilationTimingHi = aqi > 250
    ? 'सुबह और शाम खिड़कियां पूरी तरह बंद रखें। केवल दोपहर 2:00 बजे 10-15 मिनट के लिए ही खोलें।'
    : 'दोपहर 1:30 से 3:30 बजे के बीच जब धूप हो, 20-30 मिनट के लिए ताजी हवा आने दें।';

  let cookingAndHomeAdvice = hasPurifier
    ? 'Run air purifier continuously in the bedroom / living room with doors shut. Turn on kitchen exhaust 2 minutes before cooking.'
    : 'Wet-mop floors instead of dry sweeping to stop dust resuspension. Avoid agarbatti/dhoop and use kitchen chimney.';
  let cookingAndHomeAdviceHi = hasPurifier
    ? 'कमरे के दरवाजे बंद करके प्यूरीफायर चलाएं। तड़का या छौंक लगाने से 2 मिनट पहले किचन एग्जॉस्ट चालू करें।'
    : 'सूखे झाड़ू के बदले गीला पोछा लगाएं ताकि धूल न उड़े। अगरबत्ती न जलाएं और किचन चिमनी का उपयोग करें।';

  let lowEmissionTip = 'Taking the metro today saves ~1.8 kg CO₂ and keeps one more car off a congested road.';
  let lowEmissionTipHi = 'आज मेट्रो की सवारी से ~1.8 किग्रा CO₂ और ~12 ग्राम जहरीले बारीक कणों का उत्सर्जन रुकता है।';

  return {
    date: todayStr,
    overallAqi: aqi,
    cpcbCategory,
    mainPollutant: aqiData.dominantPollutant,
    bestOutdoorWindow,
    bestOutdoorWindowHi,
    worstOutdoorWindow,
    worstOutdoorWindowHi,
    maskRecommendation,
    maskRecommendationHi,
    ventilationTiming,
    ventilationTimingHi,
    cookingAndHomeAdvice,
    cookingAndHomeAdviceHi,
    lowEmissionTip,
    lowEmissionTipHi,
    memberAssessments
  };
}
