import React, { useState } from 'react';
import { X, SlidersHorizontal, Accessibility, Globe, FileDown, Check, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PERSONA_PRESETS } from '../data/personas';
import { exportPlanAsPdf } from '../utils/pdfGenerator';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({ isOpen, onClose }) => {
  const { 
    household, 
    updateHousehold, 
    seniorMode, 
    toggleSeniorMode, 
    language, 
    setLanguage, 
    selectedPersonaId, 
    selectPersona,
    dailyPlan,
    aqiData 
  } = useApp();

  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('saans_gemini_key') || '');
  if (!isOpen) return null;
  const isHi = language === 'hi';

  const handleSaveGeminiKey = (val: string) => {
    setGeminiKey(val);
    localStorage.setItem('saans_gemini_key', val.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#08332c]" />
            <h3 className="font-bold text-base text-slate-900">
              {isHi ? 'दृश्य और अलर्ट अनुकूलित करें' : 'Customize view & alerts'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-2">
              {isHi ? 'परिवार प्रोफ़ाइल प्रीसेट चुनें' : 'Select Household Persona'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PERSONA_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectPersona(p.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                    selectedPersonaId === p.id 
                      ? 'border-[#08332c] bg-[#edf4ee] font-bold text-[#08332c]' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate">{p.avatar} {p.personaName}</span>
                  {selectedPersonaId === p.id && <Check className="w-3.5 h-3.5 text-[#08332c]" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700">
                {isHi ? 'स्मॉग अलर्ट थ्रेशोल्ड' : 'Smog Notification Alert Threshold'}
              </label>
              <span className="font-extrabold text-[#08332c]">
                AQI ≥ {household.alertThreshold}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="400"
              step="25"
              value={household.alertThreshold}
              onChange={(e) => updateHousehold({ alertThreshold: Number(e.target.value) })}
              className="w-full accent-[#08332c] cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block mt-1">
              {isHi ? 'इस स्तर से ऊपर AQI होने पर तत्काल चेतावनी मिलेगी।' : 'Alert triggered when outdoor AQI crosses this level.'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-slate-600" />
                <span className="font-bold text-slate-800">
                  Google Gemini API Key (Sponsor Tech)
                </span>
              </div>
              <span className="text-[10px] text-teal-700 font-bold">
                {geminiKey ? 'Active' : 'Using Local RAG'}
              </span>
            </div>
            <input
              type="password"
              placeholder="Paste Gemini API key to enable live generation"
              value={geminiKey}
              onChange={(e) => handleSaveGeminiKey(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#08332c]"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Accessibility className="w-4 h-4 text-slate-600" />
              <div>
                <span className="font-bold text-slate-800 block">
                  {isHi ? 'वरिष्ठ नागरिक मोड (बड़ा फॉन्ट)' : 'Senior Mode (Large Text & High Contrast)'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isHi ? 'आसान पठनीयता' : 'Simplified language and larger typography'}
                </span>
              </div>
            </div>

            <button
              onClick={toggleSeniorMode}
              className={`px-3 py-1 rounded-full font-bold text-xs transition ${
                seniorMode ? 'bg-[#08332c] text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {seniorMode ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-slate-600" />
              <span className="font-bold text-slate-800">
                {isHi ? 'भाषा (Language)' : 'Language'}
              </span>
            </div>

            <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 font-semibold text-xs ${language === 'en' ? 'bg-[#08332c] text-white' : 'text-slate-600'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 font-semibold text-xs ${language === 'hi' ? 'bg-[#08332c] text-white' : 'text-slate-600'}`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => exportPlanAsPdf(dailyPlan, household, aqiData, language)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isHi ? 'PDF डाउनलोड करें' : 'Download PDF Plan'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#08332c] text-white font-bold rounded-xl text-xs hover:bg-[#104b40] transition"
          >
            {isHi ? 'पूर्ण' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
