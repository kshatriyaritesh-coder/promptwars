import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserHousehold, 
  FamilyMember, 
  AirQualityData, 
  DailySmogPlan, 
  LowEmissionActivity, 
  Badge
} from '../types';
import { PERSONA_PRESETS } from '../data/personas';
import { fetchCityAirQuality, fetchLiveAqiFromWaqi } from '../services/aqiService';
import { generateDailySmogPlan } from '../services/riskEngine';
import { INITIAL_LOGS, INITIAL_BADGES } from '../services/trackerService';
import { translations } from '../i18n/translations';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: typeof translations.en;
  selectedPersonaId: string;
  selectPersona: (personaId: string) => void;
  household: UserHousehold;
  updateHousehold: (updated: Partial<UserHousehold>) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  removeFamilyMember: (id: string) => void;
  updateFamilyMember: (member: FamilyMember) => void;
  aqiData: AirQualityData;
  setCity: (city: string) => void;
  dailyPlan: DailySmogPlan;
  completedHacks: Record<string, boolean>;
  toggleHackCompleted: (hackId: string) => void;
  emissionLogs: LowEmissionActivity[];
  addEmissionLog: (log: Omit<LowEmissionActivity, 'id' | 'date'>) => void;
  badges: Badge[];
  streakDays: number;
  seniorMode: boolean;
  toggleSeniorMode: () => void;
  isReadingAloud: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  alertNotification: string | null;
  dismissAlert: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('priya');
  
  const [household, setHousehold] = useState<UserHousehold>(() => {
    const saved = localStorage.getItem('saans_household');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return PERSONA_PRESETS[0].household;
  });

  const [language, setLanguageState] = useState<'en' | 'hi'>(() => {
    return household.language || 'en';
  });

  const [seniorMode, setSeniorModeState] = useState<boolean>(() => {
    return household.seniorMode || false;
  });

  const [aqiData, setAqiData] = useState<AirQualityData>(() => {
    return fetchCityAirQuality(household.city || 'Delhi NCR');
  });

  const [dailyPlan, setDailyPlan] = useState<DailySmogPlan>(() => {
    return generateDailySmogPlan(household.members, aqiData, household.indoorPurifierCount > 0);
  });

  const [completedHacks, setCompletedHacks] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('saans_hacks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      'vent-timing-1': true,
      'vent-exhaust-2': true,
      'purifier-hepa-1': true
    };
  });

  const [emissionLogs, setEmissionLogs] = useState<LowEmissionActivity[]>(() => {
    const saved = localStorage.getItem('saans_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return INITIAL_LOGS;
  });

  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [streakDays, setStreakDays] = useState<number>(4);
  const [alertNotification, setAlertNotification] = useState<string | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('saans_household', JSON.stringify(household));
  }, [household]);

  useEffect(() => {
    localStorage.setItem('saans_hacks', JSON.stringify(completedHacks));
  }, [completedHacks]);

  useEffect(() => {
    localStorage.setItem('saans_logs', JSON.stringify(emissionLogs));
  }, [emissionLogs]);

  useEffect(() => {
    let isMounted = true;
    fetchLiveAqiFromWaqi(household.city).then(newAqi => {
      if (!isMounted) return;
      setAqiData(newAqi);
      if (newAqi.aqi >= household.alertThreshold) {
        setAlertNotification(
          language === 'hi'
            ? `⚠️ चेतावनी: ${household.city} में AQI ${newAqi.aqi} (${newAqi.cpcbCategory}) आपके अलर्ट थ्रेशोल्ड (${household.alertThreshold}) से अधिक है!`
            : `⚠️ Smog Alert: AQI in ${household.city} is currently ${newAqi.aqi} (${newAqi.cpcbCategory}), exceeding your alert threshold of ${household.alertThreshold}!`
        );
      }
    });

    return () => {
      isMounted = false;
    };
  }, [household.city, household.alertThreshold, language]);

  useEffect(() => {
    const plan = generateDailySmogPlan(
      household.members, 
      aqiData, 
      household.indoorPurifierCount > 0
    );
    setDailyPlan(plan);
  }, [household.members, household.indoorPurifierCount, aqiData]);

  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
    setHousehold(prev => ({ ...prev, language: lang }));
  };

  const toggleSeniorMode = () => {
    setSeniorModeState(prev => {
      const next = !prev;
      setHousehold(h => ({ ...h, seniorMode: next }));
      return next;
    });
  };

  const selectPersona = (personaId: string) => {
    const preset = PERSONA_PRESETS.find(p => p.id === personaId);
    if (!preset) return;
    setSelectedPersonaId(personaId);
    setHousehold({ ...preset.household });
    setLanguageState(preset.household.language);
    setSeniorModeState(preset.household.seniorMode);
    const newAqi = fetchCityAirQuality(preset.household.city);
    setAqiData(newAqi);
  };

  const updateHousehold = (updated: Partial<UserHousehold>) => {
    setHousehold(prev => ({ ...prev, ...updated }));
  };

  const setCity = (city: string) => {
    updateHousehold({ city });
  };

  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: `m-${Date.now()}`
    };
    setHousehold(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
  };

  const removeFamilyMember = (id: string) => {
    setHousehold(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== id)
    }));
  };

  const updateFamilyMember = (member: FamilyMember) => {
    setHousehold(prev => ({
      ...prev,
      members: prev.members.map(m => (m.id === member.id ? member : m))
    }));
  };

  const toggleHackCompleted = (hackId: string) => {
    setCompletedHacks(prev => ({
      ...prev,
      [hackId]: !prev[hackId]
    }));
  };

  const addEmissionLog = (log: Omit<LowEmissionActivity, 'id' | 'date'>) => {
    const newLog: LowEmissionActivity = {
      ...log,
      id: `log-${Date.now()}`,
      date: 'Just now'
    };
    setEmissionLogs(prev => [newLog, ...prev]);
    setStreakDays(s => s + 1);

    setBadges(prev => 
      prev.map(b => {
        if (b.id === 'badge-co2-century') {
          const next = Math.min(b.maxProgress, b.progress + log.co2SavedKg);
          return { ...b, progress: next, unlocked: next >= b.maxProgress };
        }
        if (b.id === 'badge-pm-shield') {
          const next = Math.min(b.maxProgress, b.progress + log.pmSavedGrams);
          return { ...b, progress: next, unlocked: next >= b.maxProgress };
        }
        if (b.id === 'badge-streak-7') {
          const next = Math.min(b.maxProgress, streakDays + 1);
          return { ...b, progress: next, unlocked: next >= b.maxProgress };
        }
        return b;
      })
    );
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsReadingAloud(true);
    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingAloud(false);
  };

  const dismissAlert = () => setAlertNotification(null);

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        t,
        selectedPersonaId,
        selectPersona,
        household,
        updateHousehold,
        addFamilyMember,
        removeFamilyMember,
        updateFamilyMember,
        aqiData,
        setCity,
        dailyPlan,
        completedHacks,
        toggleHackCompleted,
        emissionLogs,
        addEmissionLog,
        badges,
        streakDays,
        seniorMode,
        toggleSeniorMode,
        isReadingAloud,
        speakText,
        stopSpeaking,
        alertNotification,
        dismissAlert
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
