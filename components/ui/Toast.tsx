
import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right-full duration-300">
      <div className="bg-white border-l-4 border-green-500 shadow-xl rounded-lg p-4 flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="w-6 h-6 text-green-500" />
        <div className="flex-grow">
          <p className="text-sm font-bold text-gray-900">Sucesso!</p>
          <p className="text-xs text-gray-600">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
