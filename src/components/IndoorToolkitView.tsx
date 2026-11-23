import React, { useState } from 'react';
import { 
  Home, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Calculator, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Flame, 
  Wrench
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INDOOR_HACKS, calculatePurifierCADR } from '../data/indoorHacks';

export const IndoorToolkitView: React.FC = () => {
  const { completedHacks, toggleHackCompleted, t, language, seniorMode } = useApp();
  const isHi = language === 'hi';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [roomLength, setRoomLength] = useState<number>(14);
  const [roomWidth, setRoomWidth] = useState<number>(12);
  const [ceilingHeight, setCeilingHeight] = useState<number>(9);
  const [calcResult, setCalcResult] = useState(() => calculatePurifierCADR(14, 12, 9));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalcResult(calculatePurifierCADR(roomLength, roomWidth, ceilingHeight));
  };

  const checklistHacks = INDOOR_HACKS.filter(h => h.isChecklistItem);
  const completedCount = checklistHacks.filter(h => completedHacks[h.id]).length;
  const progressPercent = Math.round((completedCount / checklistHacks.length) * 100);

  const categories = [
    { id: 'all', label: isHi ? 'सभी उपाय' : 'All Hacks', icon: Sparkles },
    { id: 'ventilation', label: isHi ? 'खिड़की व वेंटिलेशन' : 'Ventilation Timing', icon: Layers },
    { id: 'purifier', label: isHi ? 'प्यूरीफायर गाइड' : 'Purifiers & CADR', icon: Home },
    { id: 'source_control', label: isHi ? 'धुआं नियंत्रण' : 'Source Control', icon: Flame },
    { id: 'sealing', label: isHi ? 'गैप सीलिंग' : 'Window/Door Sealing', icon: ShieldCheck },
    { id: 'myths', label: isHi ? 'मिथक बनाम सच' : 'Myth Busters', icon: HelpCircle },
    { id: 'diy', label: isHi ? 'DIY कम लागत फिल्टर' : 'DIY Corsi-Rosenthal', icon: Wrench },
  ];

  const filteredHacks = selectedCategory === 'all' 
    ? INDOOR_HACKS 
    : INDOOR_HACKS.filter(h => h.category === selectedCategory);

  return (
    <div className={`space-y-6 max-w-7xl mx-auto ${seniorMode ? 'text-lg' : 'text-sm'}`}>
      <div>
        <h2 className={`${seniorMode ? 'text-3xl font-black' : 'text-2xl font-bold'} text-slate-900 flex items-center gap-2`}>
          <Home className="w-6 h-6 text-teal-600" />
          <span>{t.toolkitTitle}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {t.toolkitSubtitle}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {t.progressCompleted}
            </h3>
            <span className="text-xs text-slate-500">
              {completedCount} of {checklistHacks.length} {isHi ? 'महत्वपूर्ण उपाय पूरे किए गए' : 'essential home defenses activated'}
            </span>
          </div>

          <span className="text-2xl font-black text-[#08332c]">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
          <div 
            className="bg-[#08332c] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#08332c] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-[#08332c] text-white rounded-3xl p-6 border border-[#144f42] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#5eead4]" />
              <span>{t.cadrCalcTitle}</span>
            </h3>
            <p className="text-xs text-[#8ab3a8]">
              {isHi 
                ? 'कमरे के क्षेत्रफल के अनुसार आवश्यक Clean Air Delivery Rate (CADR) की सटीक गणना' 
                : 'Calculate required Clean Air Delivery Rate (CADR m³/h & CFM) for 4.5 Air Changes Per Hour (ACH)'}
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#104b40] text-[#5eead4] border border-[#196557]">
            AHAM Standard
          </span>
        </div>

        <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs text-[#8ab3a8] mb-1">{t.roomLength}</label>
            <input
              type="number"
              min="6"
              max="60"
              value={roomLength}
              onChange={e => setRoomLength(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#0c3d35] border border-[#14564a] rounded-xl text-xs text-white outline-none focus:ring-2 focus:ring-[#5eead4]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8ab3a8] mb-1">{t.roomWidth}</label>
            <input
              type="number"
              min="6"
              max="60"
              value={roomWidth}
              onChange={e => setRoomWidth(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#0c3d35] border border-[#14564a] rounded-xl text-xs text-white outline-none focus:ring-2 focus:ring-[#5eead4]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8ab3a8] mb-1">Ceiling Height (ft)</label>
            <input
              type="number"
              min="7"
              max="16"
              value={ceilingHeight}
              onChange={e => setCeilingHeight(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#0c3d35] border border-[#14564a] rounded-xl text-xs text-white outline-none focus:ring-2 focus:ring-[#5eead4]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#5eead4] text-[#08332c] font-bold rounded-xl text-xs shadow hover:bg-[#4bd1bb] transition"
          >
            {t.calculate}
          </button>
        </form>

        <div className="mt-4 p-4 rounded-2xl bg-[#0c3d35] border border-[#14564a] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <span className="text-[11px] text-[#8ab3a8] uppercase font-semibold">Room Area</span>
            <div className="text-xl font-bold text-white">{calcResult.roomSqFt} sq ft</div>
          </div>
          <div>
            <span className="text-[11px] text-[#8ab3a8] uppercase font-semibold">{t.recommendedCadr} (m³/h)</span>
            <div className="text-xl font-bold text-[#5eead4]">{calcResult.recommendedCadrM3H} m³/h</div>
          </div>
          <div>
            <span className="text-[11px] text-[#8ab3a8] uppercase font-semibold">{t.recommendedCadr} (CFM)</span>
            <div className="text-xl font-bold text-[#5eead4]">{calcResult.recommendedCadrCfm} CFM</div>
          </div>
          <div>
            <span className="text-[11px] text-[#8ab3a8] uppercase font-semibold">Recommended Tier</span>
            <div className="text-xs font-bold text-emerald-300 mt-1">{calcResult.purifierTier}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHacks.map((hack) => {
          const isDone = completedHacks[hack.id] || false;
          return (
            <div
              key={hack.id}
              className={`bg-white rounded-3xl p-5 border shadow-2xs transition space-y-3 flex flex-col justify-between ${
                isDone 
                  ? 'border-emerald-300 bg-[#f4faf5]' 
                  : 'border-slate-200'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    {hack.mythVerdict && (
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase ${
                        hack.mythVerdict === 'BUSTED' 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {hack.mythVerdict}
                      </span>
                    )}
                    <h4 className="font-bold text-slate-900 text-base">
                      {isHi ? hack.titleHi : hack.title}
                    </h4>
                  </div>

                  {hack.isChecklistItem && (
                    <button
                      onClick={() => toggleHackCompleted(hack.id)}
                      className="p-1 text-slate-400 hover:text-emerald-500 transition"
                      title={isDone ? 'Mark as Incomplete' : 'Mark as Done'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHi ? hack.descriptionHi : hack.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isHi ? 'कार्रवाई के कदम:' : 'Action Steps:'}
                  </span>
                  {(isHi ? hack.actionableStepsHi : hack.actionableSteps).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span><strong>Source:</strong> {hack.scientificSource}</span>
                {hack.isChecklistItem && (
                  <button
                    onClick={() => toggleHackCompleted(hack.id)}
                    className={`font-semibold text-xs transition ${
                      isDone ? 'text-emerald-700' : 'text-[#08332c] hover:underline'
                    }`}
                  >
                    {isDone ? (isHi ? '✓ पूरा किया' : '✓ Completed') : (isHi ? 'पूरा करें (+)' : 'Mark Done (+)')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
