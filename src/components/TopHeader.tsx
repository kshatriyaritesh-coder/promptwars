import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  Globe, 
  Accessibility, 
  Volume2, 
  VolumeX, 
  X,
  User,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PERSONA_PRESETS } from '../data/personas';

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

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isHi = language === 'hi';

  const tabTitleMap: Record<string, string> = {
    overview: isHi ? 'सिंहावलोकन' : 'Air quality',
    plan: isHi ? 'दैनिक योजना' : 'Air quality',
    air_quality: isHi ? 'वायु गुणवत्ता' : 'Air quality',
    forecast: isHi ? 'पूर्वानुमान' : 'Air quality',
    my_family: isHi ? 'परिवार' : 'My family',
    family: isHi ? 'परिवार' : 'My family',
    indoor_toolkit: isHi ? 'इनडोर टूलकिट' : 'Indoor toolkit',
    indoor: isHi ? 'इनडोर टूलकिट' : 'Indoor toolkit',
    low_emission_log: isHi ? 'इमिशन लॉग' : 'Low-emission log',
    tracker: isHi ? 'इमिशन लॉग' : 'Low-emission log',
  };

  const currentTabLabel = tabTitleMap[activeTab] || 'Air quality';
  const firstName = household.headName.split(' ')[0] || 'Priya';
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
      const summary = isHi
        ? `नमस्ते ${firstName} जी। आज का एयर ब्रीफ: ${household.city} में AQI ${aqiData.aqi} बहुत खराब है। बाहर निकलने का सबसे अच्छा समय दोपहर 2 से 3:30 बजे है। बाहर N95 मास्क पहनें और सुबह-शाम खिड़कियां बंद रखें।`
        : `Good morning ${firstName}. Your family's air brief: AQI is ${aqiData.aqi}, Very Poor. Best outdoor window is 2:00 to 3:30 PM if needed. Wear a fitted N95 mask outdoors, and keep windows sealed in morning and evening.`;
      speakText(summary);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#f6f8f6]/90 backdrop-blur-md border-b border-[#e5ebe5] px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-200/60 transition"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
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
            <span>{isHi ? '12 मिनट पहले अपडेट' : 'Updated 12 min ago'}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-200/50 transition"
            >
              <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-40 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                    language === 'en' ? 'font-bold text-teal-700' : 'text-slate-700'
                  }`}
                >
                  <span>English (EN)</span>
                  {language === 'en' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('hi');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
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
            className={`p-2 rounded-xl transition ${
              isReadingAloud 
                ? 'bg-rose-100 text-rose-700' 
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
            title={isReadingAloud ? 'Stop audio narration' : 'Listen to air brief (Read aloud)'}
          >
            {isReadingAloud ? <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-200/60 relative transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {alertNotification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-40 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900">
                    {isHi ? 'स्मॉग और वायु सूचनाएं' : 'Smog & Air Notifications'}
                  </h4>
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="pt-2.5 space-y-2 text-xs">
                  {alertNotification ? (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                      {alertNotification}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-[11px]">
                      {isHi ? 'कोई नई सूचना नहीं है।' : 'No critical spike alerts currently active.'}
                    </p>
                  )}
                  <div className="p-2 rounded-lg bg-slate-50 text-[11px] text-slate-600">
                    <strong>Threshold:</strong> AQI ≥ {household.alertThreshold}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-8 h-8 rounded-full bg-[#a5c4b8] text-[#08332c] flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-[#104b40]/30 transition shadow-sm"
              title="Switch Persona / Household Profile"
            >
              {initials}
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-40 animate-in fade-in zoom-in-95">
                <div className="pb-2 mb-2 border-b border-slate-100">
                  <div className="font-bold text-xs text-slate-900">{household.headName}</div>
                  <div className="text-[11px] text-slate-500">{household.city} · {household.members.length} members</div>
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
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs flex items-center justify-between transition ${
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
                      setUserDropdownOpen(false);
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <Accessibility className="w-3.5 h-3.5" />
                    <span>{seniorMode ? 'Standard Text' : 'Senior Mode (Aa+)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenCustomize();
                      setUserDropdownOpen(false);
                    }}
                    className="text-xs font-semibold text-[#104b40] hover:underline"
                  >
                    Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
