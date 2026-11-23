import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Wind, 
  MapPin, 
  HeartPulse, 
  ChevronRight,
  Leaf,
  Layers,
  FileDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getCategoryColor, getCategoryHindi } from '../services/aqiService';
import { exportPlanAsPdf } from '../utils/pdfGenerator';

export const DailyPlanView: React.FC = () => {
  const { 
    dailyPlan, 
    aqiData, 
    household, 
    t, 
    language, 
    seniorMode, 
    setActiveTab 
  } = useApp();

  const isHi = language === 'hi';
  const colorTheme = getCategoryColor(aqiData.cpcbCategory);

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'Low':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300', icon: '🟢' };
      case 'Low-Moderate':
        return { bg: 'bg-lime-100 text-lime-800 border-lime-300 dark:bg-lime-950 dark:text-lime-300', icon: '🟡' };
      case 'Moderate':
        return { bg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300', icon: '🟡' };
      case 'High':
        return { bg: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-300', icon: '🟠' };
      case 'Very High':
        return { bg: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300', icon: '🔴' };
      case 'Severe':
      case 'Severe + "stay indoors"':
      default:
        return { bg: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300', icon: '🟣' };
    }
  };

  return (
    <div className={`space-x-0 space-y-6 max-w-7xl mx-auto ${seniorMode ? 'text-lg' : 'text-sm'}`}>
      <div className={`rounded-2xl p-6 md:p-8 border shadow-xl relative overflow-hidden transition-all ${colorTheme.bg} ${colorTheme.border}`}>
        <div 
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: colorTheme.hex }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-5">
            <div className="text-center shrink-0">
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
                CPCB AQI
              </span>
              <div 
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg font-black"
                style={{ backgroundColor: colorTheme.hex }}
              >
                <span className="text-4xl md:text-5xl leading-none">{aqiData.aqi}</span>
                <span className="text-[11px] font-bold mt-1 opacity-90">
                  {aqiData.cpcbCategory}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colorTheme.badge}`}>
                  {isHi ? getCategoryHindi(aqiData.cpcbCategory) : aqiData.cpcbCategory}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {aqiData.stationName} ({aqiData.stationDistanceKm} km)
                </span>
              </div>

              <h2 className={`${seniorMode ? 'text-2xl md:text-3xl font-extrabold' : 'text-xl md:text-2xl font-bold'} text-slate-900 dark:text-white`}>
                {t.heroQuestion}
              </h2>

              <p className="text-slate-700 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
                {isHi ? dailyPlan.maskRecommendationHi : dailyPlan.maskRecommendation}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <span><strong>{t.dominantPollutant}:</strong> {aqiData.dominantPollutant} ({aqiData.pollutants.pm25.value} µg/m³)</span>
                <span>•</span>
                <span><strong>{t.updated}:</strong> {aqiData.lastUpdated}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('air_quality')}
              className="px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition"
            >
              <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{isHi ? '24-72 घंटे का पूर्वानुमान' : '24-72h Forecast Trend'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => exportPlanAsPdf(dailyPlan, household, aqiData, language)}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-xs shadow flex items-center justify-center gap-2 transition"
            >
              <FileDown className="w-4 h-4" />
              <span>{isHi ? 'प्लान डाउनलोड / शेयर करें' : 'Download Smog Plan'}</span>
            </button>
          </div>
        </div>

        {aqiData.weather.inversionRisk.includes('Inversion') && (
          <div className="mt-5 p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm">
              <strong className="text-amber-900 dark:text-amber-200">{t.inversionAlert}: </strong>
              <span className="text-amber-800 dark:text-amber-300">
                {t.inversionDesc} {isHi ? 'सुबह 6 से 9:30 बजे जहरीले कण जमीन से चिपके रहते हैं।' : 'Ground smog concentration is 2.5x higher before 9:30 AM.'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t.bestWindow}
            </h3>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 leading-snug">
              {isHi ? dailyPlan.bestOutdoorWindowHi : dailyPlan.bestOutdoorWindow}
            </p>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 block">
            {isHi ? 'धूप खिलने पर हवा का फैलाव बेहतर होता है' : 'Solar thermal currents disperse particulates'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t.worstWindow}
            </h3>
            <p className="text-xs font-semibold text-rose-700 dark:text-rose-400 leading-snug">
              {isHi ? dailyPlan.worstOutdoorWindowHi : dailyPlan.worstOutdoorWindow}
            </p>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 block">
            {isHi ? 'तापमान उलटाव और भारी ट्रैफिक का कालिख' : 'Cold layer entrapment & diesel exhaust peak'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t.ventilationTiming}
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {isHi ? dailyPlan.ventilationTimingHi : dailyPlan.ventilationTiming}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('indoor_toolkit')}
            className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-semibold mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1"
          >
            <span>{isHi ? 'इनडोर एयर टूलकिट देखें' : 'View Indoor Toolkit'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {t.lowEmissionWin}
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {isHi ? dailyPlan.lowEmissionTipHi : dailyPlan.lowEmissionTip}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('low_emission_log')}
            className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-semibold mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1"
          >
            <span>{isHi ? 'आज की आदत दर्ज करें' : 'Log Daily Clean Habit'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className={`${seniorMode ? 'text-2xl font-black' : 'text-xl font-bold'} text-slate-900 dark:text-white flex items-center gap-2`}>
              <HeartPulse className="w-5 h-5 text-rose-500" />
              <span>{t.memberRisks}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isHi 
                ? 'प्रत्येक सदस्य की संवेदनशीलता के आधार पर तैयार किया गया व्यक्तिगत सुरक्षा प्लान' 
                : 'Rule-based mapping: AQI Category × Vulnerability Multiplier for each family member'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('my_family')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{isHi ? 'सदस्य प्रबंधित करें (+/-)' : 'Manage Family Members (+/-)'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyPlan.memberAssessments.map((mem) => {
            const riskBadge = getRiskBadge(mem.riskLevel);
            return (
              <div 
                key={mem.memberId}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {mem.memberName}
                      </h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        ({mem.age} yrs)
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400 capitalize">
                      {mem.condition === 'none' 
                        ? (isHi ? 'सामान्य स्वास्थ्य' : 'Healthy Adult') 
                        : (isHi ? `स्वास्थ्य स्थिति: ${mem.condition}` : `Condition: ${mem.condition}`)}
                    </span>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${riskBadge.bg}`}>
                    <span>{riskBadge.icon}</span>
                    <span>{isHi ? `जोखिम: ${mem.riskLevel}` : `Risk: ${mem.riskLevel}`}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0 w-24">
                      {isHi ? 'बाहरी गतिविधि:' : 'Outdoor / Play:'}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">
                      {isHi ? mem.recommendations.outdoorActivityHi : mem.recommendations.outdoorActivity}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0 w-24">
                      {isHi ? 'मास्क की जरूरत:' : 'Mask Required:'}
                    </span>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 mr-1.5">
                        {mem.recommendations.maskRequired}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {isHi ? mem.recommendations.maskReasonHi : mem.recommendations.maskReason}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0 w-24">
                      {isHi ? 'स्कूल / ऑफिस:' : 'School / Work:'}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">
                      {isHi ? mem.recommendations.schoolOrWorkHi : mem.recommendations.schoolOrWork}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400 shrink-0 w-24">
                      {isHi ? 'विशेष सावधानी:' : 'Special Care:'}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">
                      {isHi ? mem.recommendations.specialCareHi : mem.recommendations.specialCare}
                    </span>
                  </div>

                  {mem.recommendations.medicalConsultWarning && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 flex items-center gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span className="text-[11px] font-semibold">
                        {isHi 
                          ? 'सावधानी: गंभीर लक्षण (खांसी, सांस की घबराहट) पर तुरंत डॉक्टर से संपर्क करें।' 
                          : 'Medical Alert: Sensitive condition under severe AQI. Keep rescue inhaler close; consult physician if wheezing.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
