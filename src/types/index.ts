export type AQICategory = 
  | 'Good' 
  | 'Satisfactory' 
  | 'Moderate' 
  | 'Poor' 
  | 'Very Poor' 
  | 'Severe';

export type HealthCondition = 
  | 'none' 
  | 'asthma' 
  | 'heart' 
  | 'pregnancy' 
  | 'elderly' 
  | 'child' 
  | 'allergies';

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender?: 'female' | 'male' | 'other';
  relationship: 'Parent' | 'Child' | 'Senior' | 'Self' | 'Other';
  condition: HealthCondition;
  customNotes?: string;
}

export type RiskLevel = 
  | 'Low' 
  | 'Low-Moderate' 
  | 'Moderate' 
  | 'High' 
  | 'Very High' 
  | 'Severe' 
  | 'Severe + "stay indoors"';

export interface MemberRiskAssessment {
  memberId: string;
  memberName: string;
  age: number;
  condition: HealthCondition;
  riskLevel: RiskLevel;
  riskScore: number; // 1-10
  recommendations: {
    outdoorActivity: string;
    outdoorActivityHi: string;
    maskRequired: 'None' | 'Cloth (basic)' | 'N95 / FFP2 mandatory';
    maskReason: string;
    maskReasonHi: string;
    schoolOrWork: string;
    schoolOrWorkHi: string;
    specialCare: string;
    specialCareHi: string;
    medicalConsultWarning?: boolean;
  };
}

export interface PollutantDetail {
  value: number;
  unit: string;
  standardLimit: number;
  status: 'Safe' | 'Moderate' | 'Unhealthy' | 'Hazardous';
}

export interface AirQualityData {
  city: string;
  stationName: string;
  aqi: number;
  cpcbCategory: AQICategory;
  dominantPollutant: 'PM2.5' | 'PM10' | 'NO2' | 'CO' | 'SO2' | 'O3';
  pollutants: {
    pm25: PollutantDetail;
    pm10: PollutantDetail;
    no2: PollutantDetail;
    so2: PollutantDetail;
    co: PollutantDetail;
    o3: PollutantDetail;
  };
  weather: {
    temp: number;
    humidity: number;
    windSpeedKmH: number;
    windDirection: string;
    inversionRisk: 'Low' | 'Moderate' | 'High' | 'Severe Inversion Trap';
    condition: string;
  };
  stationDistanceKm: number;
  lastUpdated: string;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
}

export interface HourlyForecast {
  time: string; // e.g. "06:00 AM"
  hour: number;
  aqi: number;
  category: AQICategory;
  pm25: number;
  isBestWindow?: boolean;
  isWorstWindow?: boolean;
}

export interface DailyForecast {
  day: string; // e.g. "Tomorrow", "Tue", "Wed"
  date: string;
  minAqi: number;
  maxAqi: number;
  category: AQICategory;
  summary: string;
  summaryHi: string;
}

export interface DailySmogPlan {
  date: string;
  overallAqi: number;
  cpcbCategory: AQICategory;
  mainPollutant: string;
  bestOutdoorWindow: string;
  bestOutdoorWindowHi: string;
  worstOutdoorWindow: string;
  worstOutdoorWindowHi: string;
  maskRecommendation: string;
  maskRecommendationHi: string;
  ventilationTiming: string;
  ventilationTimingHi: string;
  cookingAndHomeAdvice: string;
  cookingAndHomeAdviceHi: string;
  lowEmissionTip: string;
  lowEmissionTipHi: string;
  memberAssessments: MemberRiskAssessment[];
}

export interface IndoorHack {
  id: string;
  category: 'ventilation' | 'purifier' | 'source_control' | 'sealing' | 'myths' | 'diy';
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  actionableSteps: string[];
  actionableStepsHi: string[];
  scientificSource: string;
  isChecklistItem: boolean;
  isCompleted?: boolean;
  mythVerdict?: 'BUSTED' | 'CONFIRMED FACT' | 'PRACTICAL TRUTH';
}

export interface LowEmissionActivity {
  id: string;
  date: string;
  type: 'metro' | 'carpool' | 'cycle_walk' | 'electric_bus' | 'no_waste_burning' | 'induction_lpg' | 'solar_save';
  title: string;
  titleHi: string;
  co2SavedKg: number;
  pmSavedGrams: number;
  details: string;
  detailsHi: string;
}

export interface Badge {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface RouteOption {
  id: string;
  name: string;
  nameHi: string;
  mode: 'metro_walk' | 'arterial_highway' | 'green_interior';
  modeLabel: string;
  modeLabelHi: string;
  durationMinutes: number;
  distanceKm: number;
  exposureScore: number; // 0 (best) to 100 (worst)
  estimatedPm25Exposure: number;
  co2FootprintKg: number;
  pros: string[];
  prosHi: string[];
  cons: string[];
  consHi: string[];
  maskAdvice: string;
  maskAdviceHi: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  suggestedQuestionsHi?: string[];
  isWarning?: boolean;
  isGeminiPowered?: boolean;
}

export interface UserHousehold {
  id: string;
  headName: string;
  city: string;
  neighborhood: string;
  workLocation?: string;
  schoolLocation?: string;
  members: FamilyMember[];
  indoorPurifierCount: number;
  hasChimneyOrExhaust: boolean;
  seniorMode: boolean;
  language: 'en' | 'hi';
  alertThreshold: number; // default 200 AQI
  webPushAlerts: boolean;
  emailAlerts: boolean;
}

export interface PersonaPreset {
  id: string;
  personaName: string;
  personaTitle: string;
  personaTitleHi: string;
  avatar: string;
  description: string;
  descriptionHi: string;
  household: UserHousehold;
}
