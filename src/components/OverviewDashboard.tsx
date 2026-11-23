import React from 'react';
import { 
  SlidersHorizontal, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  Sparkles, 
  Sun, 
  ShieldCheck, 
  Home, 
  Users, 
  ChevronRight, 
  AlertTriangle, 
  BarChart2, 
  Plus, 
  Wind,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface OverviewDashboardProps {
  onOpenCustomize: () => void;
  onOpenFullPlan: () => void;
  onSelectMember: (memberId: string) => void;
  onOpenAddMember: () => void;
  onOpenAiChat: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onOpenCustomize,
  onOpenFullPlan,
  onSelectMember,
  onOpenAddMember
}) => {
  const { 
    aqiData, 
    household, 
    completedHacks, 
    toggleHackCompleted, 
    language, 
    seniorMode, 
    setActiveTab 
  } = useApp();

  const isHi = language === 'hi';

  const quickHacks = [
    {
      id: 'vent-timing-1',
      title: isHi ? 'दोपहर 2:00 बजे 15 मिनट खिड़की खोलें' : 'Ventilate 15m at 2:00 PM',
      desc: isHi ? 'धूप खिलने पर ताजी हवा आने दें' : 'Open brief cross-ventilation during peak dispersion'
    },
    {
      id: 'purifier-hepa-1',
      title: isHi ? 'बेडरूम में प्यूरीफायर स्लीप मोड पर रखें' : 'Keep purifier on Sleep Mode at night',
      desc: isHi ? 'दरवाजे बंद रखकर 24 घंटे चलने दें' : 'Continuous filtration in closed room'
    },
    {
      id: 'source-wet-mopping',
      title: isHi ? 'सूखे झाड़ू के बदले गीला पोछा लगाएं' : 'Wet mop floors; ban incense/dhoop',
      desc: isHi ? 'धूल उड़ने से रोकें' : 'Prevents fine dust resuspension'
    }
  ];

  const quickDoneCount = quickHacks.filter(h => completedHacks[h.id]).length;

  const aqiValue = aqiData.aqi;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(1, aqiValue / 500);
  const strokeDashoffset = circumference - percent * circumference;

  const todayDateString = isHi 
    ? 'बुधवार, 22 नवंबर 2026' 
    : 'WEDNESDAY, 22 NOVEMBER 2026';

  const primaryMembers = household.members.slice(0, 3);

  const getMemberRiskBadge = (condition: string, age: number) => {
    if (condition === 'asthma' || age >= 60 || condition === 'heart') {
      return {
        label: isHi ? 'गंभीर जोखिम' : 'Severe risk',
        bg: 'bg-[#fee2e2] text-[#b91c1c] border-[#fecaca]',
        dot: 'bg-[#ef4444]'
      };
    }
    if (age < 12 || condition === 'allergies') {
      return {
        label: isHi ? 'उच्च जोखिम' : 'High risk',
        bg: 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]',
        dot: 'bg-[#f59e0b]'
      };
    }
    return {
      label: isHi ? 'उच्च जोखिम' : 'High risk',
      bg: 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]',
      dot: 'bg-[#f59e0b]'
    };
  };

  const getMemberAvatarBg = (idx: number) => {
    if (idx === 0) return 'bg-[#c7ddf4] text-[#1e40af]';
    if (idx === 1) return 'bg-[#fae2c8] text-[#9a3412]';
    return 'bg-[#cde8da] text-[#065f46]';
  };

  return (
    <div className={`space-y-6 ${seniorMode ? 'text-base' : 'text-sm'}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block">
            {todayDateString}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0e2621] tracking-tight">
            {isHi ? 'आपके परिवार का दैनिक वायु ब्रीफ' : "Your family's air brief"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isHi 
              ? 'घर के अंदर और बाहर सुरक्षित, स्वस्थ दिन बिताने की स्पष्ट योजना।' 
              : 'One clear plan for a safer, healthier day indoors and out.'}
          </p>
        </div>

        <button
          onClick={onOpenCustomize}
          className="self-start sm:self-auto px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-[#d9e2d9] shadow-sm flex items-center gap-2 transition"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>{isHi ? 'कस्टमाइज व्यू' : 'Customize view'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-[#d9eedf] border border-[#c4e2cd] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-bold text-[#0c362d] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{isHi ? 'लाइव वायु गुणवत्ता' : 'Live air quality'}</span>
              </span>

              <span className="text-xs text-[#28574c] font-medium flex items-center gap-1">
                <span className="text-slate-400">((•))</span>
                <span>{aqiData.stationName}</span>
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-6xl sm:text-7xl font-extrabold text-[#09332c] tracking-tight leading-none">
                  {aqiData.aqi}
                </div>
                <div className="mt-2 text-sm sm:text-base font-bold text-[#144f42]">
                  {aqiData.cpcbCategory} · {isHi ? 'CPCB पैमाना' : 'CPCB scale'}
                </div>
              </div>

              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 90 90">
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke="#b9ddc3"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke="#ea580c"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Wind className="w-5 h-5 text-[#0d3f34]" />
                  <span className="text-[10px] font-bold text-[#144f42] uppercase tracking-wider mt-0.5">
                    PM2.5
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-2xl bg-white/60 border border-white/80 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-[#1e483e] font-medium leading-relaxed">
                <strong className="text-[#0e362d]">{isHi ? 'आज बाहर सावधानी बरतें: ' : 'Take it easy outdoors today. '}</strong>
                {isHi 
                  ? 'इतने उच्च प्रदूषण में बच्चों और बुजुर्गों को घर के अंदर ही रहना चाहिए।'
                  : 'Sensitive family members should stay indoors while pollution is this high.'}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#c0e0ca] flex items-center justify-between text-xs text-[#28574c] font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#3b7366]" />
                <span>{isHi ? 'अंतिम जांच 10:42 AM' : 'Last checked 10:42 AM'}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#3b7366]" />
                <span>{aqiData.stationDistanceKm} km {isHi ? 'दूर' : 'away'}</span>
              </span>
            </div>

            <button
              onClick={() => setActiveTab('air_quality')}
              className="font-bold text-[#09332c] hover:underline flex items-center gap-1"
            >
              <span>{isHi ? 'विवरण देखें' : 'View details'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#e5ebe5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#dff0e4] flex items-center justify-center text-[#0e4b3e]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {isHi ? 'आपकी दैनिक योजना' : 'YOUR DAILY PLAN'}
                  </span>
                  <h3 className="text-base font-bold text-[#0c2e26]">
                    {isHi ? 'आज का स्मॉग प्लान' : "Today's smog plan"}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                22 NOV
              </span>
            </div>

            <div 
              onClick={onOpenFullPlan}
              className="p-3.5 rounded-2xl bg-[#fef6e9] border border-[#fdecd2] flex items-center justify-between cursor-pointer hover:bg-[#fdf0dc] transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {isHi ? 'बाहर जाने का सर्वश्रेष्ठ समय' : 'Best outdoor window'}
                  </h4>
                  <p className="text-[11px] text-amber-900 font-medium">
                    2:00 – 3:30 PM · {isHi ? 'यदि आवश्यक हो' : 'if needed'}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-slate-900">
                    {isHi ? 'जरूरी काम पर मास्क पहनें' : 'Mask up for essentials'}
                  </h5>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    {isHi ? 'बाहर निकलते समय N95 मास्क का प्रयोग करें।' : 'Choose a well-fitted N95 outdoors.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <Home className="w-4 h-4 text-cyan-700" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-slate-900">
                    {isHi ? 'खिड़कियां बंद रखें' : 'Keep windows closed'}
                  </h5>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    {isHi ? 'केवल दोपहर में कुछ देर के लिए ही खोलें।' : 'Ventilate briefly only in the afternoon.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-rose-700" />
                </div>
                <div className="text-xs">
                  <h5 className="font-bold text-slate-900">
                    {isHi ? 'आज बाहर खेलने से बचें' : 'Skip outdoor play today'}
                  </h5>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    {isHi ? 'बच्चे और दादाजी अधिक संवेदनशील हैं।' : 'Kids and Dadaji are at higher risk.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onOpenFullPlan}
              className="text-xs font-bold text-[#0c362d] hover:underline flex items-center gap-1"
            >
              <span>{isHi ? 'पूरा दैनिक प्लान खोलें' : 'Open full daily plan'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isHi ? 'आपके परिवार के लिए अनुकूलित' : 'PERSONALIZED FOR YOUR HOUSEHOLD'}
            </span>
            <h3 className="text-lg font-bold text-[#0c2e26]">
              {isHi ? 'परिवार के सदस्य किस स्थिति में हैं' : 'How everyone is doing'}
            </h3>
          </div>

          <button
            onClick={() => setActiveTab('my_family')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <span>{isHi ? 'परिवार प्रबंधित करें' : 'Manage family'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryMembers.map((member, idx) => {
            const riskBadge = getMemberRiskBadge(member.condition, member.age);
            const avatarBg = getMemberAvatarBg(idx);
            return (
              <div
                key={member.id}
                onClick={() => onSelectMember(member.id)}
                className="bg-white border border-[#e5ebe5] hover:border-[#b8d4c0] rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow transition flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${avatarBg}`}>
                      {member.name[0]}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {member.name} <span className="text-slate-400 font-normal">{member.age}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate max-w-[130px]">
                        {member.customNotes || (member.condition === 'none' ? 'No sensitivities' : member.condition)}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-2" />
                </div>

                <div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${riskBadge.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${riskBadge.dot}`}></span>
                    <span>{riskBadge.label}</span>
                  </span>
                </div>
              </div>
            );
          })}

          <div
            onClick={onOpenAddMember}
            className="bg-white/80 hover:bg-white border-2 border-dashed border-[#c8ddcd] hover:border-teal-500 rounded-2xl p-4 cursor-pointer transition flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#dff0e4] text-[#0e4b3e] flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                {isHi ? 'सदस्य जोड़ें' : 'Add a family member'}
              </h4>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'व्यक्तिगत एयर प्लान बनाएं' : 'Personalize their air plan'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <div className="bg-white border border-[#e5ebe5] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {isHi ? 'अगले 24 घंटे' : 'NEXT 24 HOURS'}
                </span>
                <h4 className="text-base font-bold text-[#0c2e26] flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-slate-600" />
                  <span>{isHi ? 'वायु गुणवत्ता पूर्वानुमान' : 'Air quality forecast'}</span>
                </h4>
              </div>

              <button
                onClick={() => setActiveTab('air_quality')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>{isHi ? 'कल पीक की संभावना' : 'Peak expected tomorrow'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>{isHi ? 'बहुत खराब' : 'Very poor'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>{isHi ? 'खराब' : 'Poor'}</span>
              </span>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-2 text-center text-xs">
              {aqiData.hourlyForecast.slice(1, 7).map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold">{h.time.replace(':00 ', '')}</span>
                  <div className="w-full bg-slate-100 rounded-lg h-16 flex items-end justify-center p-1">
                    <div 
                      className={`w-full rounded-md ${h.isBestWindow ? 'bg-emerald-500' : h.aqi > 350 ? 'bg-rose-500' : 'bg-amber-500'}`}
                      style={{ height: `${Math.min(100, (h.aqi / 450) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">{h.aqi}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{isHi ? 'दोपहर 12 से 3 बजे के बीच सबसे साफ हवा' : 'Best vertical mixing around 2:00 PM'}</span>
            <button 
              onClick={() => setActiveTab('air_quality')}
              className="text-[#09332c] font-bold hover:underline"
            >
              {isHi ? 'पूरा 72h चार्ट देखें' : 'View 72h chart'} →
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#e5ebe5] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {isHi ? 'इनडोर टूलकिट' : 'INDOOR TOOLKIT'}
                </span>
                <h4 className="text-base font-bold text-[#0c2e26]">
                  {isHi ? 'घर पर स्वच्छ सांस लें' : 'Breathe better at home'}
                </h4>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#edf4ee] text-[#104b40]">
                {quickDoneCount} of {quickHacks.length} {isHi ? 'पूरा' : 'done'}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              {isHi ? 'आज की घरेलू चेकलिस्ट:' : "Today's home checklist"}
            </p>

            <div className="mt-3 space-y-2.5">
              {quickHacks.map((hack) => {
                const isDone = completedHacks[hack.id] || false;
                return (
                  <div
                    key={hack.id}
                    onClick={() => toggleHackCompleted(hack.id)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      isDone 
                        ? 'bg-[#f0f8f2] border-[#c0e0c8]' 
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isDone ? 'bg-emerald-600 text-white' : 'border border-slate-400'
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h5 className={`text-xs font-bold ${isDone ? 'text-emerald-900 line-through opacity-80' : 'text-slate-900'}`}>
                          {hack.title}
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          {hack.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{isHi ? 'CADR और DIY फिल्टर गाइड' : 'Includes CADR room calculator'}</span>
            <button
              onClick={() => setActiveTab('indoor_toolkit')}
              className="text-[#09332c] font-bold hover:underline"
            >
              {isHi ? 'टूलकिट खोलें' : 'Open toolkit'} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
