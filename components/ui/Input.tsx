import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className = '', error, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-3 py-2 border bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5A189A] focus:border-[#5A189A] sm:text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};