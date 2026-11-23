import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MemberDetailModalProps {
  memberId: string | null;
  onClose: () => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ memberId, onClose }) => {
  const { household, dailyPlan, language } = useApp();
  if (!memberId) return null;

  const member = household.members.find(m => m.id === memberId);
  const assessment = dailyPlan.memberAssessments.find(a => a.memberId === memberId);
  if (!member || !assessment) return null;

  const isHi = language === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 text-xs">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#edf3ed] text-[#08332c] flex items-center justify-center font-extrabold text-sm">
              {member.name[0]}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">{member.name}</h3>
              <p className="text-slate-500 font-medium">
                {member.relationship} · {member.age} years old
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
          <span className="font-bold text-rose-900">Current Assessed Risk:</span>
          <span className="px-2.5 py-0.5 rounded-full font-black text-xs bg-rose-200 text-rose-900">
            {assessment.riskLevel}
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-slate-800 block mb-0.5">Outdoor Activity / Play:</strong>
            <span className="text-slate-600">
              {isHi ? assessment.recommendations.outdoorActivityHi : assessment.recommendations.outdoorActivity}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-slate-800 block mb-0.5">Mask Specification:</strong>
            <span className="text-teal-700 font-bold block">
              {assessment.recommendations.maskRequired}
            </span>
            <span className="text-slate-500 text-[11px]">
              {isHi ? assessment.recommendations.maskReasonHi : assessment.recommendations.maskReason}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <strong className="text-slate-800 block mb-0.5">Special Precautions:</strong>
            <span className="text-slate-600">
              {isHi ? assessment.recommendations.specialCareHi : assessment.recommendations.specialCare}
            </span>
          </div>

          {member.customNotes && (
            <p className="text-[11px] text-slate-500 italic p-2 bg-amber-50/60 rounded-lg">
              "{member.customNotes}"
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#08332c] text-white font-bold rounded-xl text-xs hover:bg-[#104b40] transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
