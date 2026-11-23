import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FloatingAssistantPillProps {
  onClick: () => void;
}

export const FloatingAssistantPill: React.FC<FloatingAssistantPillProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-[#08332c] hover:bg-[#104b40] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 border border-[#1b6859]"
    >
      <div className="w-5 h-5 rounded-full bg-[#5eead4] text-[#08332c] flex items-center justify-center">
        <MessageSquare className="w-3 h-3 stroke-[2.5]" />
      </div>
      <span>Ask BreatheWell</span>
    </button>
  );
};
