import { RouteOption } from '../types';

export const COMMUTE_ROUTES: RouteOption[] = [
  {
    id: 'route-metro',
    name: 'Metro Corridor + Covered Skywalk',
    nameHi: 'मेट्रो कॉरिडोर + कवर्ड स्काईवॉक',
    mode: 'metro_walk',
    modeLabel: 'Recommended Clean Transit',
    modeLabelHi: 'सर्वश्रेष्ठ स्वच्छ मार्ग',
    durationMinutes: 38,
    distanceKm: 19.5,
    exposureScore: 22,
    estimatedPm25Exposure: 82,
    co2FootprintKg: 0.35,
    pros: [
      'Station concourses & AC metro coaches feature air filtration',
      'Zero exposure to ground-level tailpipe exhaust of idling trucks',
      'Predictable transit duration without smog gridlock'
    ],
    prosHi: [
      'मेट्रो कोच और स्टेशन में एयर फिल्टर लगे होते हैं',
      'ट्रैफिक जाम और भारी वाहनों के धुएं से पूर्ण बचाव',
      'स्मॉग के कारण ट्रैफिक देरी से मुक्ति'
    ],
    cons: [
      'Requires a 600m brisk walk from final station to building'
    ],
    consHi: [
      'अंतिम स्टेशन से कार्यालय तक 600 मीटर चलना होगा'
    ],
    maskAdvice: 'N95 recommended for the brief 7-minute walk between station exit and office lobby.',
    maskAdviceHi: 'स्टेशन से कार्यालय की 7 मिनट की वॉक के दौरान N95 मास्क पहनें।'
  },
  {
    id: 'route-green',
    name: 'Tree-Lined Sector Road & Shaded Parkway',
    nameHi: 'हरी-भरी सेक्टर रोड एवं आंतरिक मार्ग',
    mode: 'green_interior',
    modeLabel: 'Moderate Shaded Exposure',
    modeLabelHi: 'मध्यम सुरक्षित मार्ग',
    durationMinutes: 44,
    distanceKm: 16.2,
    exposureScore: 54,
    estimatedPm25Exposure: 195,
    co2FootprintKg: 2.1,
    pros: [
      'Dense tree canopies facilitate particulate dispersion',
      'Bypasses heavy commercial diesel truck freight corridors',
      'Smoother speed with fewer red-light bottlenecks'
    ],
    prosHi: [
      'सड़क किनारे पेड़ों के कारण धुएं का असर कम होता है',
      'भारी डीजल ट्रकों वाले हाईवे से अलग आंतरिक रास्ता',
      'कम लाल बत्ती और स्थिर गति'
    ],
    cons: [
      'Slightly narrower lanes with occasional neighborhood school traffic'
    ],
    consHi: [
      'सड़क थोड़ी संकरी और स्कूल समय में मध्यम ट्रैफिक'
    ],
    maskAdvice: 'Keep vehicle windows closed with AC set to internal recirculation mode.',
    maskAdviceHi: 'कार की खिड़कियां बंद रखें और एसी को रीसर्क्युलेशन मोड पर चलाएं।'
  },
  {
    id: 'route-highway',
    name: 'Ring Road / Expressway Corridor',
    nameHi: 'रिंग रोड / मुख्य एक्सप्रेसवे',
    mode: 'arterial_highway',
    modeLabel: 'Severe Inversion & Heavy Diesel Choke',
    modeLabelHi: 'अत्यधिक प्रदूषण एवं डीजल धुआं',
    durationMinutes: 52,
    distanceKm: 21.0,
    exposureScore: 89,
    estimatedPm25Exposure: 348,
    co2FootprintKg: 3.6,
    pros: [
      'Direct, wide multi-lane route'
    ],
    prosHi: [
      'चौड़ी सीधी सड़कें'
    ],
    cons: [
      'Severe tailpipe exposure from idling diesel trucks and construction tippers',
      'Smog entrapment under flyovers creates toxic localized hot-spots',
      'Heavy bumper-to-bumper stop-and-go braking emissions'
    ],
    consHi: [
      'डीजल ट्रकों और डंपरों का काला जहरीला धुआं',
      'फ्लाईओवर के नीचे स्मॉग का भारी जमाव',
      'बार-बार ब्रेक लगाने से ब्रेक डस्ट और कालिख'
    ],
    maskAdvice: 'High Hazard Corridor: If traveling on two-wheeler or auto, tight-seal N95 is non-negotiable.',
    maskAdviceHi: 'अत्यधिक खतरनाक मार्ग: बाइक या ऑटो में हों तो N95 मास्क अनिवार्य है।'
  }
];
