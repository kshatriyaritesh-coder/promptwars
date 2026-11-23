import React, { useEffect, useRef, useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  Accessibility, 
  Volume2, 
  VolumeX, 
  X,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PERSONA_PRESETS } from '../data/personas';
import { getCategoryHindi } from '../services/aqiService';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenCustomize: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu, onOpenCustomize }) => {
  const { 
    activeTab, 
    household, 
    selectedPersonaId, 
    selectPersona, 
    language, 
    setLanguage, 
    seniorMode, 
    toggleSeniorMode,
    isReadingAloud,
    speakText,
    stopSpeaking,
    alertNotification,
    dismissAlert,
    dailyPlan,
    aqiData
  } = useApp();

  const [openPanel, setOpenPanel] = useState<'language' | 'notifications' | 'profile' | null>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const isHi = language === 'hi';

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openPanel) {
        event.preventDefault();
        if (openPanel === 'language') languageButtonRef.current?.focus();
        if (openPanel === 'notifications') notificationsButtonRef.current?.focus();
        if (openPanel === 'profile') profileButtonRef.current?.focus();
        setOpenPanel(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [openPanel]);

  const tabTitleMap: Record<string, string> = {
    overview: isHi ? 'सिंहावलोकन' : 'Overview',
    plan: isHi ? 'दैनिक योजना' : 'Daily plan',
    air_quality: isHi ? 'वायु गुणवत्ता' : 'Air quality',
    forecast: isHi ? 'पूर्वानुमान' : 'Forecast',
    my_family: isHi ? 'परिवार' : 'My family',
    family: isHi ? 'परिवार' : 'My family',
    indoor_toolkit: isHi ? 'इनडोर टूलकिट' : 'Indoor toolkit',
    indoor: isHi ? 'इनडोर टूलकिट' : 'Indoor toolkit',
    low_emission_log: isHi ? 'इमिशन लॉग' : 'Low-emission log',
    tracker: isHi ? 'इमिशन लॉग' : 'Low-emission log',
  };

  const currentTabLabel = tabTitleMap[activeTab] || (isHi ? 'वायु गुणवत्ता' : 'Air quality');
  const firstName = household.headName.split(' ')[0] || 'Priya';
  const updateAge = aqiData.lastUpdated.replace(/\s*\([^)]*\)$/, '');
  const updateLabel = isHi
    ? updateAge === 'Just now'
      ? 'अभी अपडेट'
      : `${updateAge.replace(/^(\d+)\s+mins?\s+ago$/, '$1 मिनट पहले')} अपडेट`
    : `Updated ${updateAge}`;
  const initials = household.headName
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'PS';

  const handleSpeechToggle = () => {
    if (isReadingAloud) {
      stopSpeaking();
    } else {
      const category = isHi ? getCategoryHindi(aqiData.cpcbCategory) : aqiData.cpcbCategory;
      const outdoorGuidance = aqiData.aqi > 300
        ? isHi
          ? 'बहुत खराब वायु गुणवत्ता के कारण गैर-ज़रूरी बाहरी गतिविधियां टालें। बाहर जाना आवश्यक हो तो समय कम रखें और मास्क संबंधी सलाह मानें।'
          : 'Air quality is very poor, so avoid nonessential outdoor activity. If you must go out, keep it brief and follow the mask guidance.'
        : isHi
          ? `बाहर जाने का बेहतर समय: ${dailyPlan.bestOutdoorWindowHi}।`
          : `Best outdoor window: ${dailyPlan.bestOutdoorWindow}.`;
      const summary = isHi
        ? `नमस्ते ${firstName} जी। ${household.city} में आज AQI ${aqiData.aqi} है, श्रेणी ${category}। ${outdoorGuidance} ${dailyPlan.maskRecommendationHi} ${dailyPlan.ventilationTimingHi}`
        : `Good morning ${firstName}. Today's AQI in ${household.city} is ${aqiData.aqi}, ${category}. ${outdoorGuidance} ${dailyPlan.maskRecommendation} ${dailyPlan.ventilationTiming}`;
      speakText(summary);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#f6f8f6]/90 backdrop-blur-md border-b border-[#e5ebe5] px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-200/60 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            aria-label={isHi ? 'नेविगेशन मेन्यू खोलें' : 'Open navigation menu'}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>

          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 font-medium">
            <span className="text-slate-600">{currentTabLabel}</span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-800 font-semibold truncate max-w-[150px] sm:max-w-xs">
              {isHi ? `नमस्ते, ${firstName}` : `Good morning, ${firstName}`}
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3.5 text-xs">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span role="status">{updateLabel}</span>
          </div>

          <div className="relative">
            <button
              ref={languageButtonRef}
              onClick={() => {
                setOpenPanel(openPanel === 'language' ? null : 'language');
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              aria-label={isHi ? 'भाषा बदलें' : 'Change language'}
              aria-expanded={openPanel === 'language'}
              aria-controls={openPanel === 'language' ? 'language-options' : undefined}
            >
              <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            </button>

            {openPanel === 'language' && (
              <div
                id="language-options"
                role="group"
                aria-label={isHi ? 'भाषा चुनें' : 'Choose language'}
                className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-40 animate-in fade-in zoom-in-95"
              >
                <button
                  onClick={() => {
                    setLanguage('en');
                    setOpenPanel(null);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-teal-700 ${
                    language === 'en' ? 'font-bold text-teal-700' : 'text-slate-700'
                  }`}
                >
                  <span>English (EN)</span>
                  {language === 'en' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('hi');
                    setOpenPanel(null);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-teal-700 ${
                    language === 'hi' ? 'font-bold text-teal-700' : 'text-slate-700'
                  }`}
                >
                  <span>हिंदी (HI)</span>
                  {language === 'hi' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleSpeechToggle}
            className={`p-2 rounded-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
              isReadingAloud 
                ? 'bg-rose-100 text-rose-700' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
            title={isReadingAloud ? 'Stop audio narration' : 'Listen to air brief (Read aloud)'}
            aria-label={isReadingAloud
              ? (isHi ? 'वाचन बंद करें' : 'Stop reading air brief')
              : (isHi ? 'एयर ब्रीफ सुनें' : 'Listen to air brief')}
            aria-pressed={isReadingAloud}
          >
            {isReadingAloud ? <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
          </button>

          <div className="relative">
            <button
              ref={notificationsButtonRef}
              onClick={() => {
                setOpenPanel(openPanel === 'notifications' ? null : 'notifications');
              }}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-200/60 relative transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              aria-label={alertNotification
                ? (isHi ? 'सूचनाएं, एक नई चेतावनी' : 'Notifications, one new alert')
                : (isHi ? 'सूचनाएं' : 'Notifications')}
              aria-expanded={openPanel === 'notifications'}
              aria-controls={openPanel === 'notifications' ? 'notifications-panel' : undefined}
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              {alertNotification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" aria-hidden="true"></span>
              )}
            </button>

            {openPanel === 'notifications' && (
              <section
                id="notifications-panel"
                aria-labelledby="notifications-heading"
                className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-40 animate-in fade-in"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h2 id="notifications-heading" className="text-xs font-bold text-slate-900">
                    {isHi ? 'स्मॉग और वायु सूचनाएं' : 'Smog & Air Notifications'}
                  </h2>
                  <button 
                    onClick={() => setOpenPanel(null)}
                    className="text-slate-400 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
                    aria-label={isHi ? 'सूचनाएं बंद करें' : 'Close notifications'}
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
                <div className="pt-2.5 space-y-2 text-xs">
                  {alertNotification ? (
                    <div role="status" aria-live="polite" className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                      <span className="flex-1">{alertNotification}</span>
                      <button
                        onClick={dismissAlert}
                        className="shrink-0 rounded p-0.5 hover:bg-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-700"
                        aria-label={isHi ? 'चेतावनी हटाएं' : 'Dismiss alert'}
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-500 text-[11px]">
                      {isHi ? 'कोई नई सूचना नहीं है।' : 'No critical spike alerts currently active.'}
                    </p>
                  )}
                  <div className="p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600">
                    <strong>{isHi ? 'अलर्ट सीमा:' : 'Threshold:'}</strong> AQI ≥ {household.alertThreshold}
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="relative">
            <button
              ref={profileButtonRef}
              onClick={() => {
                setOpenPanel(openPanel === 'profile' ? null : 'profile');
              }}
              className="w-8 h-8 rounded-full bg-[#a5c4b8] text-[#08332c] flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-[#104b40]/30 transition shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              aria-label={isHi ? 'प्रोफ़ाइल और घर की सेटिंग' : 'Profile and household settings'}
              aria-expanded={openPanel === 'profile'}
              aria-controls={openPanel === 'profile' ? 'profile-menu' : undefined}
            >
              {initials}
            </button>

            {openPanel === 'profile' && (
              <section
                id="profile-menu"
                aria-label={isHi ? 'प्रोफ़ाइल और सेटिंग' : 'Profile and settings'}
                className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-40 animate-in fade-in zoom-in-95"
              >
                <div className="pb-2 mb-2 border-b border-slate-100">
                  <div className="font-bold text-xs text-slate-900">{household.headName}</div>
                  <div className="text-[11px] text-slate-500">
                    {household.city} · {household.members.length} {isHi ? 'सदस्य' : 'members'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                    {isHi ? 'डेमो प्रोफाइल बदलें' : 'Switch Demo Persona'}
                  </span>
                  {PERSONA_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        selectPersona(p.id);
                        setOpenPanel(null);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs flex items-center justify-between transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-teal-700 ${
                        selectedPersonaId === p.id 
                          ? 'bg-[#edf3ed] font-bold text-[#08332c]' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{p.avatar} {p.personaName} ({p.personaTitle})</span>
                      {selectedPersonaId === p.id && <Check className="w-3.5 h-3.5 text-[#08332c]" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      toggleSeniorMode();
                      setOpenPanel(null);
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
                    aria-pressed={seniorMode}
                  >
                    <Accessibility className="w-3.5 h-3.5" />
                    <span>
                      {seniorMode
                        ? (isHi ? 'सामान्य टेक्स्ट' : 'Standard Text')
                        : (isHi ? 'सीनियर मोड (Aa+)' : 'Senior Mode (Aa+)')}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenCustomize();
                      setOpenPanel(null);
                    }}
                    className="text-xs font-semibold text-[#104b40] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-700"
                  >
                    {isHi ? 'सेटिंग्स' : 'Settings'}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
