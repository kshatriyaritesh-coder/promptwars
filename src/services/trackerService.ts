import { LowEmissionActivity, Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-metro-first',
    name: 'Metro Maestro',
    nameHi: 'मेट्रो सारथी',
    description: 'Log 3 clean metro trips instead of solo private driving.',
    descriptionHi: 'गाड़ी के बदले 3 बार मेट्रो की यात्रा दर्ज करें।',
    icon: '🚇',
    unlocked: true,
    progress: 3,
    maxProgress: 3
  },
  {
    id: 'badge-zero-smoke',
    name: 'Zero-Smoke Kitchen',
    nameHi: 'स्वच्छ रसोई नायक',
    description: 'Avoid incense and use chimney exhaust for 5 consecutive days.',
    descriptionHi: 'लगातार 5 दिन अगरबत्ती रहित और चिमनी युक्त रसोई अपनाएं।',
    icon: '🍳',
    unlocked: true,
    progress: 5,
    maxProgress: 5
  },
  {
    id: 'badge-pm-shield',
    name: 'Particulate Shield',
    nameHi: 'पार्टिकुलेट रक्षक',
    description: 'Prevent over 50 grams of fine particulate (PM2.5) emissions.',
    descriptionHi: '50 ग्राम से अधिक बारीक जहरीले कणों के उत्सर्जन को रोकें।',
    icon: '🛡️',
    unlocked: false,
    progress: 36,
    maxProgress: 50
  },
  {
    id: 'badge-streak-7',
    name: 'Winter Habit Champion',
    nameHi: 'सर्दियों का पर्यावरण योद्धा',
    description: 'Maintain a 7-day active low-emission logging streak.',
    descriptionHi: 'लगातार 7 दिन पर्यावरण अनुकूल आदतें दर्ज करें।',
    icon: '🔥',
    unlocked: false,
    progress: 4,
    maxProgress: 7
  },
  {
    id: 'badge-co2-century',
    name: 'Century Saver',
    nameHi: '100 किग्रा कार्बन रक्षक',
    description: 'Save a cumulative total of 100 kg of CO2 emissions.',
    descriptionHi: 'कुल 100 किलोग्राम CO2 उत्सर्जन की बचत करें।',
    icon: '🌱',
    unlocked: false,
    progress: 42,
    maxProgress: 100
  }
];

export const INITIAL_LOGS: LowEmissionActivity[] = [
  {
    id: 'log-1',
    date: 'Today, 8:45 AM',
    type: 'metro',
    title: 'Metro Commute to Work (18 km)',
    titleHi: 'कार्यालय हेतु मेट्रो यात्रा (18 किमी)',
    co2SavedKg: 2.4,
    pmSavedGrams: 16,
    details: 'Switched from solo petrol car drive to Metro Line 3.',
    detailsHi: 'पेट्रोल कार के बजाय मेट्रो से यात्रा की।'
  },
  {
    id: 'log-2',
    date: 'Yesterday, 6:30 PM',
    type: 'induction_lpg',
    title: 'Induction Cooking & Exhaust Use',
    titleHi: 'इंडक्शन कुकिंग एवं चिमनी का उपयोग',
    co2SavedKg: 0.8,
    pmSavedGrams: 4,
    details: 'Cooked dinner on clean induction cooktop with exhaust on.',
    detailsHi: 'चिमनी के साथ इंडक्शन चूल्हे पर भोजन पकाया।'
  },
  {
    id: 'log-3',
    date: '2 days ago',
    type: 'cycle_walk',
    title: 'Bicycle Neighborhood Grocery Run (3 km)',
    titleHi: 'साइकिल से किराना सामान खरीदारी (3 किमी)',
    co2SavedKg: 0.6,
    pmSavedGrams: 5,
    details: 'Avoided cold-start scooter trip for local store errands.',
    detailsHi: 'स्कूटर के बदले साइकिल चलाकर सामान लाया।'
  },
  {
    id: 'log-4',
    date: '3 days ago',
    type: 'no_waste_burning',
    title: 'Composted Garden Leaves (No Burning)',
    titleHi: 'पत्ते जलाने से परहेज एवं खाद निर्माण',
    co2SavedKg: 5.2,
    pmSavedGrams: 42,
    details: 'Reported and stopped neighbor yard waste burning in society.',
    detailsHi: 'सोसायटी में सूखे पत्ते जलाने से रोककर कंपोस्टिंग कराई।'
  }
];

export interface ActivityTemplate {
  type: LowEmissionActivity['type'];
  label: string;
  labelHi: string;
  defaultCo2: number;
  defaultPm: number;
  icon: string;
  unitPrompt: string;
}

export const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  {
    type: 'metro',
    label: 'Took Metro / Suburban Rail',
    labelHi: 'मेट्रो या लोकल ट्रेन से यात्रा',
    defaultCo2: 1.8,
    defaultPm: 12,
    icon: '🚇',
    unitPrompt: 'Distance in km (approx 15-20 km saves ~1.8 kg CO2)'
  },
  {
    type: 'carpool',
    label: 'Carpool / Shared EV Cab',
    labelHi: 'कारपूल या शेयर्ड इलेक्ट्रिक कैब',
    defaultCo2: 1.2,
    defaultPm: 8,
    icon: '🚗',
    unitPrompt: 'Shared ride with 3+ passengers'
  },
  {
    type: 'cycle_walk',
    label: 'Walked or Cycled for Errand',
    labelHi: 'पैदल या साइकिल से काम पूरा किया',
    defaultCo2: 0.7,
    defaultPm: 5,
    icon: '🚲',
    unitPrompt: 'Replaced a 2-4 km motorized trip'
  },
  {
    type: 'electric_bus',
    label: 'Rode Electric / CNG Public Bus',
    labelHi: 'इलेक्ट्रिक या सीएनजी बस से सफर',
    defaultCo2: 1.4,
    defaultPm: 10,
    icon: '🚌',
    unitPrompt: 'Regular urban commute on public bus'
  },
  {
    type: 'induction_lpg',
    label: 'Induction / Clean Cooking with Exhaust',
    labelHi: 'इंडक्शन कुकिंग एवं चिमनी का उपयोग',
    defaultCo2: 0.9,
    defaultPm: 6,
    icon: '🍳',
    unitPrompt: 'Low-smoke meal prepared with clean ventilation'
  },
  {
    type: 'no_waste_burning',
    label: 'Composted Leaves (Prevented Burning)',
    labelHi: 'कचरा या पत्ते जलाने से रोका',
    defaultCo2: 4.5,
    defaultPm: 35,
    icon: '🍂',
    unitPrompt: 'Stopped open biomass/leaf burning incident'
  },
  {
    type: 'solar_save',
    label: 'Energy Conservation / Solar Use',
    labelHi: 'बिजली बचत / सोलर वाटर हीटर',
    defaultCo2: 1.5,
    defaultPm: 7,
    icon: '☀️',
    unitPrompt: 'Switched off diesel gen backup / used solar'
  }
];
