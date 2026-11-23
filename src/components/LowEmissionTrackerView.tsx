import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  TrendingUp, 
  PlusCircle, 
  Award, 
  Flame, 
  Leaf, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACTIVITY_TEMPLATES, ActivityTemplate } from '../services/trackerService';

export const LowEmissionTrackerView: React.FC = () => {
  const { 
    emissionLogs, 
    addEmissionLog, 
    badges, 
    streakDays, 
    t, 
    language, 
    seniorMode 
  } = useApp();

  const isHi = language === 'hi';
  const [isLogging, setIsLogging] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ActivityTemplate>(ACTIVITY_TEMPLATES[0]);
  const [customMultiplier, setCustomMultiplier] = useState<number>(1);
  const [customNote, setCustomNote] = useState('');

  const totalCo2Saved = Number(emissionLogs.reduce((acc, l) => acc + l.co2SavedKg, 0).toFixed(1));
  const totalPmSaved = Math.round(emissionLogs.reduce((acc, l) => acc + l.pmSavedGrams, 0));

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const co2 = Number((selectedTemplate.defaultCo2 * customMultiplier).toFixed(1));
    const pm = Math.round(selectedTemplate.defaultPm * customMultiplier);

    addEmissionLog({
      type: selectedTemplate.type,
      title: selectedTemplate.label,
      titleHi: selectedTemplate.labelHi,
      co2SavedKg: co2,
      pmSavedGrams: pm,
      details: customNote.trim() || `Saved ${co2} kg CO2 & ${pm}g fine PM with ${selectedTemplate.label}`,
      detailsHi: customNote.trim() || `${selectedTemplate.labelHi} द्वारा ${co2} किग्रा CO2 और ${pm} ग्राम जहरीले कण रोके`
    });

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsLogging(false);
    setCustomNote('');
    setCustomMultiplier(1);
  };

  return (
    <div className={`space-y-6 max-w-7xl mx-auto ${seniorMode ? 'text-lg' : 'text-sm'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className={`${seniorMode ? 'text-3xl font-black' : 'text-2xl font-bold'} text-slate-900 flex items-center gap-2`}>
            <TrendingUp className="w-6 h-6 text-teal-600" />
            <span>{t.trackerTitle}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {t.trackerSubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsLogging(true)}
          className="px-4 py-2 bg-[#08332c] hover:bg-[#104b40] text-white rounded-xl font-semibold text-xs shadow-md flex items-center gap-2 self-start sm:self-auto transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.logActivity}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">
              {t.totalCo2Saved}
            </span>
            <div className="text-4xl font-black">{totalCo2Saved} <span className="text-xl font-semibold">kg</span></div>
            <p className="text-xs text-emerald-100 opacity-90 pt-1">
              {isHi ? 'वाहनों और जीवाश्म ईंधन से बचाई गई कार्बन' : 'Equivalent to planting 3 mature urban neem trees'}
            </p>
          </div>
          <Leaf className="w-24 h-24 absolute -right-4 -bottom-4 text-white/10 pointer-events-none" />
        </div>

        <div className="bg-gradient-to-br from-cyan-700 to-blue-800 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-200">
              {t.totalPmSaved}
            </span>
            <div className="text-4xl font-black">{totalPmSaved} <span className="text-xl font-semibold">grams</span></div>
            <p className="text-xs text-cyan-100 opacity-90 pt-1">
              {isHi ? 'फेफड़ों में जाने से बचाए गए जहरीले सूक्ष्म कण' : 'Direct particulate kept out of family & neighborhood lungs'}
            </p>
          </div>
          <ShieldCheck className="w-24 h-24 absolute -right-4 -bottom-4 text-white/10 pointer-events-none" />
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-200">
              {t.currentStreak}
            </span>
            <div className="text-4xl font-black">{streakDays} <span className="text-xl font-semibold">Days 🔥</span></div>
            <p className="text-xs text-amber-100 opacity-90 pt-1">
              {isHi ? 'लगातार स्वच्छ आदतें बनाए रखने के लिए शाबाश!' : 'Maintain for 7 days to unlock Winter Habit Champion badge!'}
            </p>
          </div>
          <Flame className="w-24 h-24 absolute -right-4 -bottom-4 text-white/10 pointer-events-none" />
        </div>
      </div>

      {isLogging && (
        <form onSubmit={handleLogSubmit} className="bg-white rounded-3xl p-6 border-2 border-teal-500/50 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>{isHi ? 'आज की पर्यावरण अनुकूल आदत दर्ज करें' : 'Log a Clean Habit or Low-Emission Commute'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsLogging(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {ACTIVITY_TEMPLATES.map(tpl => {
              const isSelected = selectedTemplate.type === tpl.type;
              return (
                <button
                  type="button"
                  key={tpl.type}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-[#08332c] bg-[#edf4ee] ring-2 ring-[#08332c]/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{tpl.icon}</span>
                  <span className="font-semibold text-xs text-slate-800">
                    {isHi ? tpl.labelHi : tpl.label}
                  </span>
                  <span className="text-[10px] text-teal-700 font-bold mt-1">
                    +{tpl.defaultCo2} kg CO2
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {selectedTemplate.unitPrompt} (Multiplier)
              </label>
              <input
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={customMultiplier}
                onChange={e => setCustomMultiplier(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isHi ? 'टिप्पणी (वैकल्पिक)' : 'Trip / Habit Note (Optional)'}
              </label>
              <input
                type="text"
                placeholder="e.g. Switched car commute to Metro Yellow Line"
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              />
            </div>
          </div>

          <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200 flex items-center justify-between text-xs">
            <span className="text-teal-900 font-medium">
              {isHi ? 'इस गतिविधि से अनुमानित बचत:' : 'Estimated Impact of this action:'}
            </span>
            <span className="font-bold text-teal-800">
              +{Number((selectedTemplate.defaultCo2 * customMultiplier).toFixed(1))} kg CO₂ & +{Math.round(selectedTemplate.defaultPm * customMultiplier)}g PM2.5
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsLogging(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-medium"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#08332c] text-white rounded-xl text-xs font-semibold shadow hover:bg-[#104b40]"
            >
              {isHi ? 'दर्ज करें और अंक पाएं 🎉' : 'Record Action & Earn Points 🎉'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{t.badgesTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {badges.map(b => (
            <div 
              key={b.id}
              className={`bg-white rounded-3xl p-4 border shadow-2xs transition space-y-2 relative overflow-hidden ${
                b.unlocked 
                  ? 'border-amber-400 bg-amber-50/20' 
                  : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{b.icon}</span>
                {b.unlocked ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400">
                    {b.progress}/{b.maxProgress}
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs">
                  {isHi ? b.nameHi : b.name}
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  {isHi ? b.descriptionHi : b.description}
                </p>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, (b.progress / b.maxProgress) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">
          {t.recentLogs}
        </h3>

        <div className="divide-y divide-slate-100">
          {emissionLogs.map(log => (
            <div key={log.id} className="py-3 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 text-xs md:text-sm">
                    {isHi ? log.titleHi : log.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {log.date}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {isHi ? log.detailsHi : log.details}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-bold text-emerald-700">
                  -{log.co2SavedKg} kg CO₂
                </div>
                <div className="text-[11px] text-cyan-700 font-semibold">
                  -{log.pmSavedGrams}g PM2.5
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
