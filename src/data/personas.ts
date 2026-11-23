import { PersonaPreset } from '../types';

export const PERSONA_PRESETS: PersonaPreset[] = [
  {
    id: 'priya',
    personaName: 'Priya',
    personaTitle: '34, Working Parent',
    personaTitleHi: '34 वर्ष, कामकाजी माता',
    avatar: '👩‍💼',
    description: 'Lives in New Delhi, India. Has kids (Aarav, 7, asthmatic) and elderly Dadaji (68). Commutes to Cyber City.',
    descriptionHi: 'नई दिल्ली में रहती हैं। बच्चे (आरव, 7, दमा पीड़ित) और दादाजी (68)। कार्यस्थल साइबर सिटी।',
    household: {
      id: 'hh-priya',
      headName: 'Priya Sharma',
      city: 'Delhi NCR',
      neighborhood: 'Anand Vihar, New Delhi',
      workLocation: 'Cyber City, Gurugram',
      schoolLocation: 'DPS Noida',
      members: [
        {
          id: 'm-aarav',
          name: 'Aarav',
          age: 7,
          gender: 'male',
          relationship: 'Child',
          condition: 'asthma',
          customNotes: 'Uses Budecort inhaler on smoggy days. School recess outdoors prohibited.'
        },
        {
          id: 'm-priya',
          name: 'Priya',
          age: 34,
          gender: 'female',
          relationship: 'Self',
          condition: 'none',
          customNotes: 'Office commuter. Switched to Metro Line 3.'
        },
        {
          id: 'm-dadaji',
          name: 'Dadaji',
          age: 68,
          gender: 'male',
          relationship: 'Senior',
          condition: 'asthma',
          customNotes: 'Breathing sensitivity. Avoid early morning garden walk.'
        },
        {
          id: 'm-ananya',
          name: 'Ananya',
          age: 5,
          gender: 'female',
          relationship: 'Child',
          condition: 'child',
          customNotes: 'Kindergarten student, sensitive to cold morning fog.'
        }
      ],
      indoorPurifierCount: 1,
      hasChimneyOrExhaust: true,
      seniorMode: false,
      language: 'en',
      alertThreshold: 200,
      webPushAlerts: true,
      emailAlerts: false
    }
  },
  {
    id: 'ramesh',
    personaName: 'Ramesh Ji',
    personaTitle: '62, Senior with Breathing Sensitivity',
    personaTitleHi: '62 वर्ष, वरिष्ठ नागरिक (सांस में संवेदनशीलता)',
    avatar: '👴',
    description: 'Lives with his son in Pune. Chronic bronchitis, loves morning garden walks. Needs Hindi & Large font.',
    descriptionHi: 'पुणे में बेटे के परिवार के साथ रहते हैं। ब्रोंकाइटिस की शिकायत, सुबह टहलने के शौकीन। बड़े अक्षर और हिंदी की ज़रूरत।',
    household: {
      id: 'hh-ramesh',
      headName: 'Ramesh Patel',
      city: 'Pune',
      neighborhood: 'Shivajinagar, Pune',
      workLocation: 'Retired',
      schoolLocation: '',
      members: [
        {
          id: 'm-ramesh-self',
          name: 'Ramesh Ji',
          age: 62,
          gender: 'male',
          relationship: 'Self',
          condition: 'asthma',
          customNotes: 'Wheezing worsens below 18°C. Takes inhaler twice daily.'
        },
        {
          id: 'm-savitri',
          name: 'Savitri Devi',
          age: 60,
          gender: 'female',
          relationship: 'Senior',
          condition: 'heart',
          customNotes: 'Mild hypertension, prefers indoor temple activities.'
        },
        {
          id: 'm-rohan',
          name: 'Rohan',
          age: 32,
          gender: 'male',
          relationship: 'Child',
          condition: 'none',
          customNotes: 'Takes bike to office.'
        }
      ],
      indoorPurifierCount: 1,
      hasChimneyOrExhaust: false,
      seniorMode: true,
      language: 'hi',
      alertThreshold: 150,
      webPushAlerts: true,
      emailAlerts: true
    }
  },
  {
    id: 'anita',
    personaName: 'Anita',
    personaTitle: '41, Homemaker Managing Household Air',
    personaTitleHi: '41 वर्ष, गृहिणी (घर के वातावरण की देखभाल)',
    avatar: '👩',
    description: 'Manages a household in Lucknow. Cares for elderly mother-in-law (70) and family meals. Focuses on indoor air hacks.',
    descriptionHi: 'लखनऊ में घर संभालती हैं। 70 वर्षीय सास और परिवार की देखभाल। घर की हवा शुद्ध रखने पर विशेष ध्यान।',
    household: {
      id: 'hh-anita',
      headName: 'Anita Verma',
      city: 'Lucknow',
      neighborhood: 'Gomti Nagar, Lucknow',
      workLocation: 'Home',
      schoolLocation: 'CMS Gomti Nagar',
      members: [
        {
          id: 'm-anita-dadi',
          name: 'Dadi (Kamla)',
          age: 70,
          gender: 'female',
          relationship: 'Senior',
          condition: 'heart',
          customNotes: 'Heart patient, sensitive to kitchen smoke and agarbatti.'
        },
        {
          id: 'm-anita-self',
          name: 'Anita',
          age: 41,
          gender: 'female',
          relationship: 'Self',
          condition: 'none',
          customNotes: 'Cooks 3 meals daily, wants zero-smoke alternatives.'
        },
        {
          id: 'm-anita-son',
          name: 'Tanmay',
          age: 12,
          gender: 'male',
          relationship: 'Child',
          condition: 'allergies',
          customNotes: 'Sneezes during winter morning school bus wait.'
        }
      ],
      indoorPurifierCount: 0,
      hasChimneyOrExhaust: true,
      seniorMode: false,
      language: 'hi',
      alertThreshold: 200,
      webPushAlerts: true,
      emailAlerts: false
    }
  },
  {
    id: 'arjun',
    personaName: 'Arjun',
    personaTitle: '19, Eco-Aware College Student',
    personaTitleHi: '19 वर्ष, जागरूक कॉलेज छात्र',
    avatar: '🧑‍🎓',
    description: 'Cycles and rides metro in Bengaluru / Delhi. DIY enthusiast who built a Corsi-Rosenthal box; loves gamification & streaks.',
    descriptionHi: 'साइकिल और मेट्रो का उपयोग करते हैं। स्वयं DIY एयर फिल्टर बनाया; स्ट्रीक और बैज हासिल करना पसंद है।',
    household: {
      id: 'hh-arjun',
      headName: 'Arjun Mehta',
      city: 'Delhi NCR',
      neighborhood: 'South Extension, New Delhi',
      workLocation: 'IIT Delhi / North Campus',
      schoolLocation: 'University Enclave',
      members: [
        {
          id: 'm-arjun-self',
          name: 'Arjun',
          age: 19,
          gender: 'male',
          relationship: 'Self',
          condition: 'none',
          customNotes: 'Avid cyclist and runner, tests low-exposure routes.'
        },
        {
          id: 'm-kabir',
          name: 'Kabir (Roommate)',
          age: 20,
          gender: 'male',
          relationship: 'Other',
          condition: 'none',
          customNotes: 'Shared apartment, collaborates on low-emission habits.'
        }
      ],
      indoorPurifierCount: 1,
      hasChimneyOrExhaust: true,
      seniorMode: false,
      language: 'en',
      alertThreshold: 250,
      webPushAlerts: true,
      emailAlerts: false
    }
  }
];
