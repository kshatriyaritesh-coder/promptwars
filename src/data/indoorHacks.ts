import { IndoorHack } from '../types';

export const INDOOR_HACKS: IndoorHack[] = [
  {
    id: 'vent-timing-1',
    category: 'ventilation',
    title: 'Midday Window Opening Only (1:30 PM – 3:30 PM)',
    titleHi: 'केवल दोपहर में खिड़कियां खोलें (1:30 से 3:30 बजे)',
    description: 'Winter smog is trapped closest to the ground during night and early morning due to temperature inversion. Only open windows when sunlight has warmed the ground layer.',
    descriptionHi: 'सर्दियों में रात और सुबह तापमान उलटाव (इनवर्जन) के कारण धुआं जमीन के पास जमा रहता है। खिड़कियां केवल दोपहर की धूप में ही खोलें।',
    actionableSteps: [
      'Keep all balcony and street-facing windows sealed between 6:00 PM and 10:30 AM.',
      'Check app for midday lowest AQI dip (usually 1:30 PM – 3:00 PM).',
      'Conduct a 15-minute cross-ventilation burst to flush stale CO2, then re-seal.'
    ],
    actionableStepsHi: [
      'शाम 6:00 से सुबह 10:30 बजे तक बालकनी और खिड़कियां पूरी तरह बंद रखें।',
      'दोपहर 1:30 से 3:00 बजे के बीच जब धूप खिले, केवल तभी खिड़कियां खोलें।',
      '15 मिनट के लिए आर-पार हवा आने दें ताकि CO2 बाहर निकल सके, फिर तुरंत बंद कर लें।'
    ],
    scientificSource: 'CPCB & IIT-Kanpur Winter Smog Studies',
    isChecklistItem: true
  },
  {
    id: 'vent-exhaust-2',
    category: 'ventilation',
    title: 'Pre-Ventilate Kitchen During Cooking',
    titleHi: 'खाना बनाते समय किचन एग्जॉस्ट पहले चालू करें',
    description: 'Indian cooking techniques (tadka, deep frying) generate ultrafine PM2.5 spikes exceeding 1,200 µg/m³ inside the apartment.',
    descriptionHi: 'तड़का और तलने से घर के अंदर PM2.5 का स्तर 1,200 µg/m³ के पार पहुंच जाता है, जो बाहर की हवा से भी अधिक जहरीला हो सकता है।',
    actionableSteps: [
      'Switch on kitchen chimney/exhaust fan 2 minutes BEFORE heating oil or spices.',
      'Keep kitchen door closed to prevent smoke migration into living/bedrooms.',
      'Leave chimney running on low for 5 minutes after cooking finishes.'
    ],
    actionableStepsHi: [
      'तेल या मसाले गर्म करने से 2 मिनट पहले ही चिमनी/एग्जॉस्ट पंखा चलाएं।',
      'रसोई का दरवाजा बंद रखें ताकि धुआं बेडरूम में न फैले।',
      'खाना बनने के 5 मिनट बाद तक चिमनी को चालू रहने दें।'
    ],
    scientificSource: 'WHO Guidelines for Indoor Air Quality & ICMR',
    isChecklistItem: true
  },
  {
    id: 'purifier-hepa-1',
    category: 'purifier',
    title: 'Closed Room HEPA Operation & Position',
    titleHi: 'कमरे को बंद रखकर HEPA प्यूरीफायर चलाएं और सही जगह रखें',
    description: 'Air purifiers work by circulating a fixed volume of air multiple times per hour (ACH). If doors or windows are cracked open, dirty outdoor air overwhelms the filter.',
    descriptionHi: 'एयर प्यूरीफायर बंद कमरे की हवा को प्रति घंटे कई बार फिल्टर करता है। यदि खिड़की खुली रहेगी, तो बाहर का धुआं अंदर आता रहेगा।',
    actionableSteps: [
      'Place the purifier at least 1.5 to 2 feet away from walls and curtains for 360° airflow.',
      'Keep the unit at floor level or on a low stool where respiratory zone air settles.',
      'Run continuously on Low/Sleep mode throughout the night instead of cycling on/off.'
    ],
    actionableStepsHi: [
      'प्यूरीफायर को दीवार या परदों से कम से कम 1.5 से 2 फीट दूर रखें ताकि हवा का प्रवाह निर्बाध रहे।',
      'इसे फर्श या नीची स्टूल पर रखें।',
      'रात में बार-बार बंद-चालू करने के बजाय स्लीप मोड में लगातार चलने दें।'
    ],
    scientificSource: 'US EPA Air Cleaners in the Home & AHAM Standards',
    isChecklistItem: true
  },
  {
    id: 'purifier-filter-maintenance',
    category: 'purifier',
    title: 'Pre-Filter Vacuuming & Filter Schedule',
    titleHi: 'प्री-फिल्टर की सफाई और मुख्य HEPA की जांच',
    description: 'Clogged pre-filters with hair and coarse dust throttle motor airflow by up to 50%, reducing purification efficiency.',
    descriptionHi: 'प्री-फिल्टर पर बाल और मोटी धूल जमने से प्यूरीफायर की हवा खींचने की क्षमता 50% तक गिर जाती है।',
    actionableSteps: [
      'Wash or vacuum the mesh pre-filter every 14 days during winter peak months.',
      'NEVER wash the inner HEPA or carbon pleated filter with water (destroys electrostatic charge).',
      'Replace True HEPA H13 cartridge every 6 to 9 months in severe North Indian winters.'
    ],
    actionableStepsHi: [
      'सर्दियों में हर दो हफ्ते में जालीदार प्री-फिल्टर को साफ करें या धो लें।',
      'अंदर वाले मुख्य HEPA या कार्बन फिल्टर को कभी पानी से न धोएं (फिल्टर खराब हो जाता है)।',
      'गंभीर प्रदूषण वाले शहरों में 6 से 9 महीने में मुख्य फिल्टर जरूर बदलें।'
    ],
    scientificSource: 'Manufacturer CADR Standards & EPA Indoor Air Division',
    isChecklistItem: true
  },
  {
    id: 'source-incense-ban',
    category: 'source_control',
    title: 'Zero Agarbatti & Mosquito Coils Indoors',
    titleHi: 'अगरबत्ती, धूप और मच्छर अगरबत्ती पूरी तरह बंद करें',
    description: 'A single incense stick generates particulate emissions equivalent to smoking several cigarettes, releasing dangerous benzene, formaldehyde, and heavy PAHs.',
    descriptionHi: 'एक अगरबत्ती से निकलने वाला धुआं कई सिगरेट के बराबर बारीक कण और बेंजीन जैसे हानिकारक रसायन उत्सर्जित करता है।',
    actionableSteps: [
      'Switch to brass diya with pure oil/ghee or LED puja lights.',
      'Use liquid vaporizers or mosquito bed nets instead of smoking mosquito coils.',
      'Ban scented chemical candles and aerosol air fresheners during smog months.'
    ],
    actionableStepsHi: [
      'अगरबत्ती के बदले शुद्ध तेल/घी का दीया या इलेक्ट्रॉनिक दीया इस्तेमाल करें।',
      'मच्छर कॉइल के बदले मच्छरदानी या लिक्विड वेपोराइजर का प्रयोग करें।',
      'सुगंधित मोमबत्तियां और रूम फ्रेशनर स्प्रे का उपयोग न करें।'
    ],
    scientificSource: 'ICMR (Indian Council of Medical Research) Health Advisory',
    isChecklistItem: true
  },
  {
    id: 'source-wet-mopping',
    category: 'source_control',
    title: 'Wet Mopping Instead of Dry Sweeping (Jhadu)',
    titleHi: 'सूखे झाड़ू के बदले गीला पोछा (डस्ट रिसस्पेंशन से बचाव)',
    description: 'Traditional dry brooms resuspend microscopic settled PM2.5 and allergen dust into breathing height for up to 3 hours.',
    descriptionHi: 'सूखा झाड़ू लगाने से जमीन पर बैठी सूक्ष्म धूल उड़कर हवा में तैरने लगती है और 3 घंटे तक फेफड़ों में जाती रहती है।',
    actionableSteps: [
      'Always vacuum with a HEPA sealed vacuum or use damp microfiber mops.',
      'Damp-wipe surfaces with a moist cloth rather than dry dusting.',
      'Place damp coir doormats outside the entrance to trap outdoor street soot.'
    ],
    actionableStepsHi: [
      'सूखे झाड़ू के बजाय गीले माइक्रोफाइबर पोछे का प्रयोग करें।',
      'मेज, पंखे और अलमारी को गीले कपड़े से पोंछें ताकि धूल न उड़े।',
      'घर के मुख्य दरवाजे पर गीला पायदान रखें ताकि जूतों की धूल अंदर न आए।'
    ],
    scientificSource: 'CDC Clean Air & Indoor Hygiene Guidelines',
    isChecklistItem: true
  },
  {
    id: 'sealing-doors-windows',
    category: 'sealing',
    title: 'Weatherstrip Gaps in Doors and Windows',
    titleHi: 'दरवाजों और खिड़कियों के गैप सील करें (वेदरस्ट्रिप टेप)',
    description: 'Even small 5mm gaps under doors and sliding window frames allow outdoor toxic smog to continuously infiltrate indoor living spaces.',
    descriptionHi: 'दरवाजे के नीचे और खिड़कियों के बीच 5 मिमी का गैप भी बाहर के जहरीले स्मॉग को सीधे कमरे में खींचता है।',
    actionableSteps: [
      'Install silicone or foam draft stoppers at the bottom of main entrance and balcony doors.',
      'Apply self-adhesive rubber foam weatherstripping tape on sliding window seams.',
      'Draw thick woven curtains in the evening to create a thermal insulating air barrier.'
    ],
    actionableStepsHi: [
      'मुख्य दरवाजे के नीचे फोम या सिलिकॉन डोर ड्राफ्ट गार्ड लगाएं।',
      'खिड़कियों के जोड़ों पर फोम वेदरस्ट्रिपिंग टेप चिपकाएं।',
      'शाम होते ही मोटे परदे खींच दें ताकि ठंडी स्मॉगी हवा कमरे में न आ सके।'
    ],
    scientificSource: 'ASHRAE Residential Building Envelope Standards',
    isChecklistItem: true
  },
  {
    id: 'myth-plants-clean-air',
    category: 'myths',
    title: 'Myth: Indoor Houseplants Purify Smog & PM2.5',
    titleHi: 'भ्रम: मनी प्लांट या स्नेक प्लांट घर का स्मॉग पूरी तरह साफ कर देते हैं',
    description: 'The 1989 NASA clean air experiment was performed in an airtight chamber on VOC gases, not airborne particulate matter (PM2.5). In a real living room, you would need 10 to 100 plants per square meter to rival a single mechanical HEPA purifier.',
    descriptionHi: '1989 का नासा अध्ययन पूरी तरह सीलबंद छोटे चैंबर में रसायनों पर था, बारीक धूल (PM2.5) पर नहीं। एक कमरे में प्यूरीफायर जितनी हवा साफ करने के लिए प्रति वर्ग मीटर 10 से 100 पौधों की आवश्यकता होगी।',
    actionableSteps: [
      'Keep plants for aesthetic and psychological wellness, but do not rely on them as an air filter.',
      'Beware of overwatering indoor soil: damp soil in winter can breed fungal mold spores that trigger asthma.'
    ],
    actionableStepsHi: [
      'पौधों को हरियाली और मानसिक शांति के लिए रखें, लेकिन स्मॉग से बचाव का मुख्य साधन न समझें।',
      'गमलों में ज्यादा पानी न दें; नमी से फंगस और फफूंद पनपती है जिससे दमे का दौरा पड़ सकता है।'
    ],
    scientificSource: 'Journal of Exposure Science & Environmental Epidemiology (Drexel University, 2019)',
    isChecklistItem: false,
    mythVerdict: 'BUSTED'
  },
  {
    id: 'myth-cloth-mask-sufficient',
    category: 'myths',
    title: 'Myth: Simple Cloth Masks or Dupattas Protect from Smog',
    titleHi: 'भ्रम: सूती कपड़ा, गमछा या रुमाल स्मॉग से फेफड़ों को बचा लेता है',
    description: 'Weave gaps in standard cotton cloth and dupattas are between 100 to 500 microns. Fine winter particulate PM2.5 (2.5 microns) passes right through, filtering only 15-25% of harmful soot.',
    descriptionHi: 'सूती कपड़े और रुमाल के रेशों के बीच 100 से 500 माइक्रोन का गैप होता है। 2.5 माइक्रोन का बारीक जहरीला कण इससे आसानी से पार हो जाता है।',
    actionableSteps: [
      'Wear genuine BIS-certified IS 9473 or NIOSH-certified N95 / FFP2 masks.',
      'Ensure a tight facial seal around the nose bridge and chin without side air leaks.',
      'Avoid exhalation valves: valves allow unfiltered exterior air infiltration when breathing rhythm alters.'
    ],
    actionableStepsHi: [
      'हमेशा प्रमाणित N95 या FFP2 मास्क का उपयोग करें।',
      'नाक और ठोड़ी पर मास्क का फिट एकदम टाइट होना चाहिए ताकि किनारे से हवा न घुसे।',
      'बिना वॉल्व वाला मास्क पहनें।'
    ],
    scientificSource: 'WHO & CPCB Mask Guidelines for Fine Particulate Inhalation',
    isChecklistItem: false,
    mythVerdict: 'BUSTED'
  },
  {
    id: 'myth-ionizers-safe',
    category: 'myths',
    title: 'Myth: Ionizing & Ozone Air Purifiers are Superior',
    titleHi: 'भ्रम: आयोनाइजर और ओजोन छोड़ने वाले प्यूरीफायर ज्यादा अच्छे होते हैं',
    description: 'Ionizers generate ozone as a byproduct to make dust fall to surfaces. Ozone is a recognized lung irritant that damages bronchial membranes and worsens pediatric asthma.',
    descriptionHi: 'आयोनाइजर हवा में ओजोन गैस छोड़ते हैं। ओजोन फेफड़ों के लिए अत्यंत हानिकारक गैस है और दमे को गंभीर बना सकती है।',
    actionableSteps: [
      'Insist exclusively on mechanical HEPA (High-Efficiency Particulate Air) filtration.',
      'Check that the purifier is certified Zero-Ozone (UL 2998 or CARB compliant).'
    ],
    actionableStepsHi: [
      'केवल मैकेनिकल HEPA (H13 ग्रेड) फिल्टर वाले प्यूरीफायर ही चुनें।',
      'जांचें कि मशीन ओजोन मुक्त (Zero-Ozone) प्रमाणित हो।'
    ],
    scientificSource: 'California Air Resources Board (CARB) & EPA Warnings',
    isChecklistItem: false,
    mythVerdict: 'BUSTED'
  },
  {
    id: 'diy-corsi-rosenthal',
    category: 'diy',
    title: 'DIY Corsi-Rosenthal Box Air Purifier (Under ₹2,500)',
    titleHi: 'घर पर बनाएं कम लागत वाला Corsi-Rosenthal एयर फिल्टर (₹2,500 से कम)',
    description: 'A proven, scientifically validated open-source air cleaner built with a 20-inch box fan and 4 MERV 13 / HEPA furnace filters taped into a cube. Delivers CADR > 250 CFM at a fraction of commercial costs.',
    descriptionHi: 'वैज्ञानिक रूप से प्रमाणित DIY एयर फिल्टर जिसे 20 इंच के बॉक्स फैन और 4 MERV-13 फिल्टर को जोड़कर बनाया जाता है। यह महंगे प्यूरीफायर जितनी ही स्वच्छ हवा देता है।',
    actionableSteps: [
      'Materials: 1x 20" Box Fan (or strong exhaust fan), 4x MERV 13 or HEPA replacement panels, 1 roll duct tape, 1 cardboard bottom piece.',
      'Assembly: Form a 4-sided cube with the filters facing inwards (arrows pointing inside the box). Tape all edges airtight.',
      'Top Mount: Tape the box fan on top facing upward (blowing clean air into the room).',
      'Safety: Ensure motor is rated for low thermal impedance; keep electrical cord clear of water.'
    ],
    actionableStepsHi: [
      'सामग्री: 1 बॉक्स फैन, 4 MERV 13 या HEPA पैनल फिल्टर, 1 रोल डक्ट टेप और कार्डबोर्ड बेस।',
      'निर्माण: चारों फिल्टर को जोड़कर चौकोर बॉक्स बनाएं (हवा के तीर अंदर की ओर हों)। कोनों पर अच्छी तरह टेप लगाएं।',
      'पंखे को ऊपर रखें (हवा ऊपर की ओर फेंके)।',
      'कमरे में स्वच्छ हवा का प्रवाह तेजी से बढ़ता है।'
    ],
    scientificSource: 'UC Davis Environmental Health Sciences Center Peer-Reviewed Study',
    isChecklistItem: false,
    mythVerdict: 'PRACTICAL TRUTH'
  }
];

export function calculatePurifierCADR(roomLengthFt: number, roomWidthFt: number, ceilingHeightFt: number = 9): {
  roomSqFt: number;
  roomVolumeCuFt: number;
  recommendedCadrCfm: number;
  recommendedCadrM3H: number;
  airChangesPerHour: number;
  purifierTier: string;
} {
  const roomSqFt = roomLengthFt * roomWidthFt;
  const roomVolumeCuFt = roomSqFt * ceilingHeightFt;
  const airChangesPerHour = 4.5;
  const recommendedCadrCfm = Math.round((roomVolumeCuFt * airChangesPerHour) / 60);
  const recommendedCadrM3H = Math.round(recommendedCadrCfm * 1.699);

  let purifierTier = 'Compact Bedroom Unit';
  if (recommendedCadrM3H > 400) {
    purifierTier = 'Large Living Room / Hall Heavy-Duty Unit';
  } else if (recommendedCadrM3H > 250) {
    purifierTier = 'Standard Master Bedroom Unit';
  }

  return {
    roomSqFt,
    roomVolumeCuFt,
    recommendedCadrCfm,
    recommendedCadrM3H,
    airChangesPerHour,
    purifierTier
  };
}
