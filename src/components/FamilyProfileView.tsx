import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  MapPin, 
  Check, 
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FamilyMember, HealthCondition } from '../types';
import { SUPPORTED_CITIES } from '../services/aqiService';

export const FamilyProfileView: React.FC = () => {
  const { 
    household, 
    updateHousehold, 
    addFamilyMember, 
    removeFamilyMember, 
    t, 
    language, 
    seniorMode 
  } = useApp();

  const isHi = language === 'hi';
  const [isAdding, setIsAdding] = useState(false);

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number>(30);
  const [newRole, setNewRole] = useState<FamilyMember['relationship']>('Other');
  const [newCondition, setNewCondition] = useState<HealthCondition>('none');
  const [newNotes, setNewNotes] = useState('');

  const [headName, setHeadName] = useState(household.headName);
  const [city, setCityState] = useState(household.city);
  const [neighborhood, setNeighborhood] = useState(household.neighborhood || '');
  const [workLocation, setWorkLocation] = useState(household.workLocation || '');
  const [schoolLocation, setSchoolLocation] = useState(household.schoolLocation || '');
  const [hasPurifier, setHasPurifier] = useState(household.indoorPurifierCount > 0);
  const [alertThreshold, setAlertThreshold] = useState(household.alertThreshold || 200);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const handleSaveHousehold = (e: React.FormEvent) => {
    e.preventDefault();
    updateHousehold({
      headName,
      city,
      neighborhood,
      workLocation,
      schoolLocation,
      indoorPurifierCount: hasPurifier ? 1 : 0,
      alertThreshold: Number(alertThreshold)
    });
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addFamilyMember({
      name: newName.trim(),
      age: Number(newAge),
      relationship: newRole,
      condition: newCondition,
      customNotes: newNotes.trim()
    });

    setNewName('');
    setNewAge(30);
    setNewRole('Other');
    setNewCondition('none');
    setNewNotes('');
    setIsAdding(false);
  };

  return (
    <div className={`space-y-6 max-w-7xl mx-auto ${seniorMode ? 'text-lg' : 'text-sm'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className={`${seniorMode ? 'text-3xl font-black' : 'text-2xl font-bold'} text-slate-900 flex items-center gap-2`}>
            <Users className="w-6 h-6 text-teal-600" />
            <span>{t.familyTitle}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {t.familySubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-[#08332c] hover:bg-[#104b40] text-white rounded-xl font-semibold text-xs shadow flex items-center gap-2 self-start sm:self-auto transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isAdding ? (isHi ? 'रद्द करें' : 'Cancel') : t.addMember}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddMember} className="bg-white rounded-3xl p-6 border-2 border-teal-500/40 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-900 text-base">
            {isHi ? 'परिवार में नया सदस्य जोड़ें' : 'Add New Family Member'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.name}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav, Dadaji"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.age}
              </label>
              <input
                type="number"
                min="0"
                max="120"
                required
                value={newAge}
                onChange={e => setNewAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.role}
              </label>
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
              >
                <option value="Self">Self</option>
                <option value="Parent">Parent / Spouse</option>
                <option value="Child">Child</option>
                <option value="Senior">Senior</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.condition}
              </label>
              <select
                value={newCondition}
                onChange={e => setNewCondition(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
              >
                {Object.entries(t.conditionsList).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {isHi ? 'विशिष्ट स्वास्थ्य नोट / दवाएं' : 'Custom Notes / Medication'}
            </label>
            <input
              type="text"
              placeholder="e.g. Uses inhaler, morning walk habit"
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-medium"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#08332c] text-white rounded-xl text-xs font-semibold shadow hover:bg-[#104b40]"
            >
              {isHi ? 'जोड़ें' : 'Save Member'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {household.members.map((member) => {
          const isVulnerable = member.age < 12 || member.age >= 60 || member.condition !== 'none';
          return (
            <div 
              key={member.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    {member.name}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {member.relationship} · {member.age} yrs
                  </span>
                </div>

                <button
                  onClick={() => removeFamilyMember(member.id)}
                  disabled={household.members.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition disabled:opacity-30 disabled:pointer-events-none"
                  title="Remove Member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`px-2.5 py-0.5 rounded-full font-medium ${
                  isVulnerable 
                    ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  {isVulnerable 
                    ? (isHi ? '⚠️ उच्च संवेदनशीलता' : '⚠️ Sensitive / Vulnerable') 
                    : (isHi ? '✅ सामान्य' : '✅ Standard Risk')}
                </span>

                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 capitalize">
                  {t.conditionsList[member.condition] || member.condition}
                </span>
              </div>

              {member.customNotes && (
                <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-100">
                  "{member.customNotes}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600" />
          <span>{isHi ? 'स्थान व घरेलू सेटिंग्स' : 'Hyper-Local Household Locations & Alert Settings'}</span>
        </h3>

        <form onSubmit={handleSaveHousehold} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isHi ? 'परिवार प्रमुख का नाम' : 'Household Head Name'}
              </label>
              <input
                type="text"
                value={headName}
                onChange={e => setHeadName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isHi ? 'शहर' : 'City'}
              </label>
              <select
                value={city}
                onChange={e => setCityState(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              >
                {SUPPORTED_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isHi ? 'इलाका / मोहल्ला' : 'Neighborhood / Sector'}
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                placeholder="e.g. Indirapuram, Gomti Nagar"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isHi ? 'ऑफिस / कार्यस्थल' : 'Workplace / Commute Destination'}
              </label>
              <input
                type="text"
                value={workLocation}
                onChange={e => setWorkLocation(e.target.value)}
                placeholder="e.g. Cyber City Gurugram, BKC Mumbai"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isHi ? 'बच्चों का स्कूल' : 'School / College Location'}
              </label>
              <input
                type="text"
                value={schoolLocation}
                onChange={e => setSchoolLocation(e.target.value)}
                placeholder="e.g. DPS Noida, University Campus"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {isHi ? 'AQI अलर्ट थ्रेशोल्ड' : 'AQI Notification Alert Threshold'}
              </label>
              <input
                type="number"
                min="50"
                max="450"
                step="25"
                value={alertThreshold}
                onChange={e => setAlertThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none text-slate-900"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={hasPurifier}
                onChange={e => setHasPurifier(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>{isHi ? 'घर में HEPA एयर प्यूरीफायर मौजूद है' : 'Household owns a HEPA Air Purifier'}</span>
            </label>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#08332c] text-white rounded-xl font-semibold text-xs shadow flex items-center justify-center gap-2 hover:bg-[#104b40] transition"
            >
              {saveFeedback ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{isHi ? 'सेव हो गया!' : 'Settings Saved!'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t.save}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
