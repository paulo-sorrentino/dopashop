'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Ativar Modo Claro' : 'Ativar Modo Noturno'}
      title={isDark ? 'Mudar para Modo Claro (Algodão Suave)' : 'Mudar para Modo Noturno (Cyber Seul)'}
      className={`relative flex items-center gap-2 p-2 sm:p-2.5 rounded-xl transition-all duration-300 cursor-pointer border ${
        isDark
          ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-amber-300 hover:text-amber-200 shadow-sm'
          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 rotate-0 scale-100 transition-all duration-300 animate-spin-slow" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-600 rotate-0 scale-100 transition-all duration-300" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold">
          {isDark ? 'Modo Claro' : 'Modo Noturno'}
        </span>
      )}
    </button>
  );
};
