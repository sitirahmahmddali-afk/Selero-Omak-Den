import React from 'react';
import { Heart, CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'heart' | 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'heart' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-[#1E1915]/95 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-xl border border-[#DECFA9]/30 backdrop-blur-md flex items-center gap-2">
        {type === 'heart' && <Heart className="w-4 h-4 text-[#B33927] fill-[#B33927]" />}
        {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        {type === 'info' && <AlertCircle className="w-4 h-4 text-amber-400" />}
        <span>{message}</span>
      </div>
    </div>
  );
};
