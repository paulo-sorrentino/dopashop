'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { ThemeToggle } from './ThemeToggle';
import { 
  ShoppingBag, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Dices,
  Zap,
  TrendingDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsWheelOpen, 
    setIsVaultOpen, 
    isMuted, 
    toggleMute,
    fakeBalance,
    realMoneySaved,
    dopamineLevel
  } = useShop();

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-theme-subtle transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo & Concept */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-amber-400 p-[2px] shadow-md shadow-pink-500/20">
            <div className="w-full h-full bg-theme-page rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                DopaShop
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 dark:text-pink-400 border border-pink-500/30">
                SEOUL 🇰🇷
              </span>
            </div>
            <p className="text-[11px] text-theme-muted hidden md:block">
              Simulador de Compras Terapêuticas & Antiestresse
            </p>
          </div>
        </div>

        {/* Center: Dopamine Meter & Fake Wallet (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Dopamine Bar */}
          <div className="flex items-center gap-3 bg-theme-card border border-theme-subtle px-4 py-2 rounded-xl shadow-xs">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-400" />
            <div className="flex flex-col gap-1 w-28 xl:w-32">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-theme-muted">Dopamina</span>
                <span className="text-pink-500 dark:text-pink-400 font-bold">{dopamineLevel}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dopamineLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Fake Balance */}
          <div className="flex items-center gap-2.5 bg-theme-card border border-theme-subtle px-3.5 py-2 rounded-xl shadow-xs">
            <span className="text-xs text-theme-muted">Saldo Infinito:</span>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {formatBRL(fakeBalance)}
            </span>
          </div>
        </div>

        {/* Mobile Quick Dopamine Pill */}
        <div className="flex lg:hidden items-center gap-1.5 bg-theme-card border border-theme-subtle px-2 py-1 rounded-lg text-[10px] font-bold shadow-xs">
          <Zap className="w-3 h-3 text-amber-500 dark:text-amber-400 fill-amber-400" />
          <span className="text-pink-500 dark:text-pink-400">{dopamineLevel}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Theme Toggle (Light / Dark) */}
          <ThemeToggle />

          {/* Audio toggle (desktop only) */}
          <button 
            onClick={toggleMute}
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            className="hidden sm:flex p-2 sm:p-2.5 rounded-xl bg-theme-card hover:bg-theme-elevated border border-theme-subtle text-theme-body hover:text-theme-heading transition-all cursor-pointer shadow-xs"
            title={isMuted ? 'Ativar Efeitos Sonoros' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-theme-muted" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500 dark:text-pink-400" />}
          </button>

          {/* Wheel Button (Desktop only) */}
          <button
            onClick={() => setIsWheelOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            <Dices className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-spin-slow" />
            <span className="hidden md:inline">Roleta de Cupons</span>
            <span className="md:hidden">Roleta</span>
          </button>

          {/* Real Money Saved Vault Button (Desktop only) */}
          <button
            onClick={() => setIsVaultOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            <TrendingDown className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span className="hidden md:inline">Cofre de Economia</span>
            <span className="md:hidden">Cofre</span>
            {realMoneySaved > 0 && (
              <span className="text-[10px] sm:text-[11px] font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 px-1.5 py-0.5 rounded-md font-bold">
                +{formatBRL(realMoneySaved)}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center min-w-4 h-4 sm:w-5 sm:h-5 px-1 text-[10px] sm:text-xs font-black bg-white text-pink-600 rounded-full animate-bounce shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
