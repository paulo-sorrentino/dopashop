'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Sparkles, Dices, ShieldCheck, HeartHandshake, Flame, ArrowDown } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setIsWheelOpen, conqueredImpulses } = useShop();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden py-8 sm:py-14 border-b border-theme-subtle bg-gradient-to-b from-slate-200/40 via-theme-page to-theme-page dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 transition-colors duration-300">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-fuchsia-500/10 dark:bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Korean trend tag */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-theme-card border border-pink-500/30 text-pink-600 dark:text-pink-300 text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400 animate-spin-slow shrink-0" />
          <span>Tendência de Seul: Compras Fictícias Antiestresse</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-theme-heading max-w-4xl leading-[1.2]">
          Sinta todo o prazer de gastar{' '}
          <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-500 dark:from-pink-400 dark:via-fuchsia-400 dark:to-amber-300 bg-clip-text text-transparent">
            milhões de reais
          </span>
          , sem gastar nem um centavo.
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-5 text-xs sm:text-base text-theme-muted max-w-2xl leading-relaxed px-2">
          Estudos mostram que <strong>85% da dopamina</strong> vem da busca, do carrinho e do clique de compra. 
          O DopaShop sacia sua vontade de consumir em minutos, salvando seu bolso na vida real.
        </p>

        {/* Pillars / Badges */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-theme-card border border-theme-subtle text-theme-body text-[11px] sm:text-xs shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span>0% Dívidas Reais</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-theme-card border border-theme-subtle text-theme-body text-[11px] sm:text-xs shadow-xs">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400 shrink-0" />
            <span>Dopamina Pura</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-theme-card border border-theme-subtle text-theme-body text-[11px] sm:text-xs shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 dark:text-pink-400 shrink-0" />
            <span>Terapia Antiestresse</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => setIsWheelOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
          >
            <Dices className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 animate-bounce shrink-0" />
            <span>GIRAR ROLETA DE ATÉ 99.9% OFF 🎲</span>
          </button>

          <button
            onClick={scrollToCatalog}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl bg-theme-card hover:bg-theme-elevated border border-theme-subtle text-theme-heading font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            <span>Explorar Desejos</span>
            <ArrowDown className="w-3.5 h-3.5 text-theme-muted" />
          </button>
        </div>

        {/* Quick Social Proof */}
        {conqueredImpulses > 0 && (
          <div className="mt-5 text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/25 animate-pulse">
            ✨ Você já neutralizou {conqueredImpulses} impulso{conqueredImpulses > 1 ? 's' : ''} de compra nesta sessão!
          </div>
        )}

      </div>
    </div>
  );
};
