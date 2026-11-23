import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HealthCondition, FamilyMember } from '../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const { addFamilyMember, t, language } = useApp();
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(28);
  const [role, setRole] = useState<FamilyMember['relationship']>('Other');
  const [condition, setCondition] = useState<HealthCondition>('none');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addFamilyMember({
      name: name.trim(),
      age: Number(age),
      relationship: role,
      condition,
      customNotes: notes.trim()
    });

    onClose();
  };

  const isHi = language === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#08332c]" />
            <h3 className="font-bold text-base text-slate-900">
              {isHi ? 'नया पारिवारिक सदस्य जोड़ें' : 'Add a family member'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">{t.name}</label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav, Ramesh Ji, Savitri"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#f4f7f4] border border-slate-200 rounded-xl outline-none focus:border-teal-600 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">{t.age}</label>
              <input
                type="number"
                min="0"
                max="115"
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f4f7f4] border border-slate-200 rounded-xl outline-none focus:border-teal-600 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">{t.role}</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#f4f7f4] border border-slate-200 rounded-xl outline-none focus:border-teal-600 text-slate-800"
              >
                <option value="Self">Self</option>
                <option value="Parent">Parent / Spouse</option>
                <option value="Child">Child</option>
                <option value="Senior">Senior</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">{t.condition}</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#f4f7f4] border border-slate-200 rounded-xl outline-none focus:border-teal-600 text-slate-800"
            >
              {Object.entries(t.conditionsList).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isHi ? 'दवा / स्वास्थ्य नोट' : 'Medication or routine notes'}
            </label>
            <input
              type="text"
              placeholder="e.g. Uses rescue inhaler, morning walk habit"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#f4f7f4] border border-slate-200 rounded-xl outline-none focus:border-teal-600 text-slate-800"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#08332c] text-white font-bold rounded-xl hover:bg-[#104b40] transition"
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};
