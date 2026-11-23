import React, { useState } from 'react';
import { 
  Wind, 
  CheckCircle2, 
  Activity, 
  Users, 
  Home, 
  Leaf, 
  MapPin, 
  ChevronDown, 
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_CITIES } from '../services/aqiService';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, household, setCity, language, t } = useApp();
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const isHi = language === 'hi';

  const navItems = [
    { id: 'overview', label: isHi ? 'सिंहावलोकन' : 'Overview', icon: CheckCircle2 },
    { id: 'air_quality', label: isHi ? 'वायु गुणवत्ता' : 'Air quality', icon: Activity },
    { id: 'my_family', label: isHi ? 'मेरा परिवार' : 'My family', icon: Users },
    { id: 'indoor_toolkit', label: isHi ? 'इनडोर टूलकिट' : 'Indoor toolkit', icon: Home, badge: '3' },
    { id: 'low_emission_log', label: isHi ? 'इमिशन लॉग' : 'Low-emission log', icon: Leaf },
  ];

  const cityDisplay = household.city === 'Delhi NCR' ? 'New Delhi, India' : `${household.city}, India`;

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 md:w-72 bg-[#08332c] text-white z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex flex-col space-y-6 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5eead4] flex items-center justify-center text-[#08332c] shadow-sm">
                <Wind className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                  BreatheWell
                </h1>
                <p className="text-xs text-[#8ab3a8] font-medium">
                  {isHi ? 'पारिवारिक वायु साथी' : 'Family air companion'}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#8ab3a8] hover:text-white hover:bg-[#104b40]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1.5 relative">
            <span className="text-[10px] font-bold tracking-wider text-[#659186] uppercase block">
              {isHi ? 'आपका घर' : 'YOUR HOME'}
            </span>

            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="w-full bg-[#0c3d35] hover:bg-[#104b40] text-left px-3.5 py-2.5 rounded-xl border border-[#14564a]/80 flex items-center justify-between transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-[#5eead4] shrink-0" />
                <span className="text-xs font-semibold text-white truncate">
                  {cityDisplay}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#8ab3a8] shrink-0 ml-1" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0b3830] border border-[#186355] rounded-xl shadow-xl overflow-hidden z-20 py-1 max-h-56 overflow-y-auto no-scrollbar">
                {SUPPORTED_CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-[#104b40] transition ${
                      household.city === c ? 'text-[#5eead4] bg-[#0e453c]' : 'text-slate-200'
                    }`}
                  >
                    <span>{c}, India</span>
                    {household.city === c && <span className="text-[#5eead4] text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-[10px] font-bold tracking-wider text-[#659186] uppercase block mb-2 px-1">
              {isHi ? 'आपका स्पेस' : 'YOUR SPACE'}
            </span>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (activeTab === 'plan' && item.id === 'overview');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left
                      ${isActive 
                        ? 'bg-[#104b40] text-white shadow-sm' 
                        : 'text-[#9fc1b8] hover:text-white hover:bg-[#0c3d35]/60'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#5eead4]' : 'text-[#8ab3a8]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#155a4e] text-[#5eead4]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-[#124b40]/60 text-[11px] text-[#6d998f] flex items-center justify-between">
          <span>CPCB & NAQI Standard</span>
          <span className="text-[#5eead4] font-medium">v1.0</span>
        </div>
      </aside>
    </>
  );
};
