'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { useTheme } from '@/context/ThemeContext';
import { Sparkles, Brain, Sun, Moon } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsWheelOpen, setIsVaultOpen } = useShop();
  const { isDark, toggleTheme } = useTheme();

  return (
    <footer className="border-t border-theme-subtle bg-theme-card pt-8 sm:pt-12 pb-24 sm:pb-12 text-theme-muted text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Neurobiology info banner */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-theme-elevated border border-theme-subtle flex flex-col md:flex-row items-center gap-4 sm:gap-6 shadow-xs">
          <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 shrink-0">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-theme-heading flex items-center justify-center md:justify-start gap-1.5 sm:gap-2">
              <span>Por que o Fake Shopping funciona? (A Ciência da Dopamina)</span>
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                COMPROVADO
              </span>
            </h4>
            <p className="text-theme-body leading-relaxed text-[11px] sm:text-xs">
              Neurocientistas demonstraram que o pico de dopamina ocorre na <strong>antecipação da recompensa</strong> — a busca pelos produtos, a expectativa do carrinho e o ato simbólico da compra — e não na posse física do objeto. O DopaShop ativa essa via neural de prazer sem gerar a ressaca financeira ou a culpa pós-compra.
            </p>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-theme-subtle text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-theme-heading font-bold text-xs sm:text-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" />
              <span>DopaShop • Terapia de Compras de Seul</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-theme-muted mt-0.5">
              Desenvolvido com carinho para aliviar impulsos e proteger seu bolso. 100% gratuito e seguro.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 text-theme-body hover:text-theme-heading transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
              <span>{isDark ? 'Tema Claro' : 'Tema Escuro'}</span>
            </button>
            <button
              onClick={() => setIsWheelOpen(true)}
              className="text-theme-muted hover:text-amber-500 transition-colors cursor-pointer"
            >
              Roleta de Cupons 🎰
            </button>
            <button
              onClick={() => setIsVaultOpen(true)}
              className="text-theme-muted hover:text-emerald-500 transition-colors cursor-pointer"
            >
              Cofre de Economia 💰
            </button>
            <a
              href="#catalog-section"
              className="text-theme-muted hover:text-pink-500 transition-colors"
            >
              Voltar ao Topo ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
