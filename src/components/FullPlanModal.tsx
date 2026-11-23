import React from 'react';
import { X, Sun, ShieldCheck, Home, Users, FileDown, Leaf, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportPlanAsPdf } from '../utils/pdfGenerator';

interface FullPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullPlanModal: React.FC<FullPlanModalProps> = ({ isOpen, onClose }) => {
  const { dailyPlan, household, aqiData, language } = useApp();
  if (!isOpen) return null;
  const isHi = language === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {dailyPlan.date}
            </span>
            <h3 className="font-extrabold text-lg text-[#08332c]">
              {isHi ? 'आज का संपूर्ण पारिवारिक स्मॉग प्लान' : "Today's Full Family Smog Plan"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#d9eedf] border border-[#c4e2cd] flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-[#08332c]">
              {aqiData.aqi} <span className="text-sm font-bold text-[#164e43]">({aqiData.cpcbCategory})</span>
            </div>
            <div className="text-xs text-[#28574c] font-medium">
              Dominant: {aqiData.dominantPollutant} ({aqiData.pollutants.pm25.value} µg/m³) · {aqiData.stationName}
            </div>
          </div>
          <button
            onClick={() => exportPlanAsPdf(dailyPlan, household, aqiData, language)}
            className="px-3.5 py-2 bg-[#08332c] hover:bg-[#104b40] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#fef6e9] border border-[#fdecd2] space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>{isHi ? 'बाहर जाने का सुरक्षित समय:' : 'Optimal Outdoor Window:'}</span>
            </div>
            <p className="text-slate-700 font-medium pl-6">
              {isHi ? dailyPlan.bestOutdoorWindowHi : dailyPlan.bestOutdoorWindow}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{isHi ? 'बाहर जाने से बिल्कुल बचें:' : 'Avoid Outdoors (Nocturnal Peak):'}</span>
            </div>
            <p className="text-slate-700 font-medium pl-6">
              {isHi ? dailyPlan.worstOutdoorWindowHi : dailyPlan.worstOutdoorWindow}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Mask Standard:</span>
              </div>
              <p className="text-slate-600 pl-6">
                {isHi ? dailyPlan.maskRecommendationHi : dailyPlan.maskRecommendation}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Home className="w-4 h-4 text-cyan-700" />
                <span>Ventilation Timing:</span>
              </div>
              <p className="text-slate-600 pl-6">
                {isHi ? dailyPlan.ventilationTimingHi : dailyPlan.ventilationTiming}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm text-slate-900">
            {isHi ? 'परिवार के सदस्यों का व्यक्तिगत निर्देश' : 'Per-Member Action Plan'}
          </h4>

          <div className="space-y-2.5">
            {dailyPlan.memberAssessments.map((mem) => (
              <div key={mem.memberId} className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">
                    {mem.memberName} ({mem.age} yrs, {mem.condition})
                  </div>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-rose-100 text-rose-800">
                    {mem.riskLevel}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {isHi ? mem.recommendations.outdoorActivityHi : mem.recommendations.outdoorActivity}
                </p>
                <div className="text-[11px] text-teal-700 font-semibold pt-0.5">
                  Mask: {mem.recommendations.maskRequired} · {mem.recommendations.specialCare}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#08332c] text-white font-bold rounded-xl text-xs hover:bg-[#104b40] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
