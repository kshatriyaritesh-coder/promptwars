import React from 'react';
import { 
  ShieldAlert, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WeeklyReportView: React.FC = () => {
  const { household, aqiData, emissionLogs, badges, language, seniorMode } = useApp();
  const isHi = language === 'hi';

  const totalCo2 = Number(emissionLogs.reduce((acc, l) => acc + l.co2SavedKg, 0).toFixed(1));
  const unlockedBadgesCount = badges.filter(b => b.unlocked).length;

  return (
    <div className={`space-y-6 max-w-7xl mx-auto ${seniorMode ? 'text-lg' : 'text-sm'}`}>
      <div>
        <h2 className={`${seniorMode ? 'text-3xl font-black' : 'text-2xl font-bold'} text-slate-900 flex items-center gap-2`}>
          <ShieldAlert className="w-6 h-6 text-teal-600" />
          <span>{isHi ? 'साप्ताहिक वायु गुणवत्ता व व्यवहार रिपोर्ट' : 'Weekly Exposure & Behavioral Habit Report'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {isHi ? 'पिछले 7 दिनों में आपके परिवार की सुरक्षा और पर्यावरण बचत का संपूर्ण ब्योरा' : '7-Day retrospective on household exposure reduction and emissions prevented'}
        </p>
      </div>

      <div className="bg-[#08332c] text-white rounded-3xl p-6 border border-[#144f42] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5eead4]">
              {isHi ? 'साप्ताहिक सुरक्षा स्कोर' : 'Weekly Protection Score'}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              88 / 100 <span className="text-base font-semibold text-emerald-300">(Excellent Protection)</span>
            </div>
          </div>
          <div className="text-xs text-[#8ab3a8]">
            {household.headName}'s Household · {household.city}
          </div>
        </div>

        <p className="text-xs text-[#cde8da] leading-relaxed max-w-3xl">
          {isHi 
            ? 'आपके परिवार ने दोपहर में खिड़कियां खोलकर और सुबह टहलने से बचकर इनडोर प्रदूषण को 64% तक कम रखा। 4 स्वच्छ आदतें दर्ज करके आपने शहर की हवा में जहरीले कणों को मिलने से रोका।'
            : 'By rescheduling morning outdoor cardio to midday and maintaining closed-door HEPA filtration, your household reduced inhaled toxic particulate by an estimated 64% compared to outdoor ambient smog.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">{isHi ? 'औसत बाहरी AQI' : 'Avg Outdoor AQI'}</span>
          <div className="text-2xl font-black text-rose-600">{Math.round(aqiData.aqi * 0.94)}</div>
          <span className="text-[11px] text-slate-400">Very Poor category prevailing</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">{isHi ? 'अनुमानित इनडोर सुरक्षित AQI' : 'Est. Indoor Filtered AQI'}</span>
          <div className="text-2xl font-black text-emerald-700">42 (Satisfactory)</div>
          <span className="text-[11px] text-emerald-700 font-semibold">88% cleaner than street air</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">{isHi ? 'कुल कार्बन बचत' : 'Total CO2 Prevented'}</span>
          <div className="text-2xl font-black text-[#08332c]">{totalCo2} kg</div>
          <span className="text-[11px] text-slate-400">Across {emissionLogs.length} clean trips & habits</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500">{isHi ? 'उपलब्धि बैज' : 'Badges Earned'}</span>
          <div className="text-2xl font-black text-amber-500">{unlockedBadgesCount} / {badges.length}</div>
          <span className="text-[11px] text-slate-400">Keep logging to unlock next tier!</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>{isHi ? 'आगामी सप्ताह के लिए रणनीति व मौसम पूर्वानुमान' : 'Strategic Focus for Next Week (Meteorological Forecast)'}</span>
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#edf4ee] text-[#08332c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </span>
            <div className="text-xs space-y-1">
              <strong className="text-slate-900">
                {isHi ? 'सर्दियों का दूसरा पखवाड़ा - तापमान में 2°C की गिरावट:' : 'Cold Wave Inversion Expected Mid-Week:'}
              </strong>
              <p className="text-slate-600">
                {isHi 
                  ? 'मौसम विभाग के अनुसार बुधवार को न्यूनतम तापमान 12°C तक गिर सकता है। सुबह 6 से 9:30 बजे के बीच स्मॉग का स्तर चरम पर होगा। बुजुर्गों और बच्चों को सुबह बाहर बिल्कुल न भेजें।'
                  : 'Temperatures are projected to dip by 2-3°C on Wednesday and Thursday. Nocturnal thermal inversion will trap particulates below 60 meters until 10:00 AM. Shift all morning exercise strictly indoors.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#edf4ee] text-[#08332c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </span>
            <div className="text-xs space-y-1">
              <strong className="text-slate-900">
                {isHi ? 'प्री-फिल्टर सफाई का समय आ गया है:' : 'Air Purifier 14-Day Maintenance Due:'}
              </strong>
              <p className="text-slate-600">
                {isHi
                  ? 'सर्दियों में भारी धूल के कारण प्यूरीफायर का बाहरी जालीदार फिल्टर भर जाता है। शनिवार को इसे वैक्यूम करें ताकि मशीन का खिंचाव मजबूत रहे।'
                  : 'After 14 consecutive days of winter running, gently vacuum the mesh pre-filter to dislodge coarse hair and dust. Do not wash the inner HEPA cartridge with water.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#edf4ee] text-[#08332c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </span>
            <div className="text-xs space-y-1">
              <strong className="text-slate-900">
                {isHi ? 'मेट्रो राइड स्ट्रीक को 7 दिन तक ले जाएं:' : 'Extend Metro & Transit Streak to 7 Days:'}
              </strong>
              <p className="text-slate-600">
                {isHi
                  ? 'आप 4 दिन की स्ट्रीक पर हैं। अगले 3 दिन सार्वजनिक परिवहन अपनाकर "Winter Habit Champion" बैज हासिल करें।'
                  : 'You are currently at 4 days active streak. Completing 3 more clean commutes this week will unlock the prestigious "Winter Habit Champion" badge and save another ~5.4 kg CO2!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
