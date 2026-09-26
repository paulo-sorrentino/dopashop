'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { soundManager } from '@/lib/soundEffects';
import { X, Sparkles, Trophy, ArrowRight, Dices } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Slice {
  code: string;
  label: string;
  color: string;
  discount: number;
}

const SLICES: Slice[] = [
  { code: 'DOPAMINA99', label: '99% OFF', color: '#ec4899', discount: 99 },
  { code: 'FALENCIAZERO', label: '90% OFF', color: '#a855f7', discount: 90 },
  { code: 'QUEROTUDO', label: '95% OFF', color: '#f59e0b', discount: 95 },
  { code: 'BILIONARIO', label: '98% OFF', color: '#3b82f6', discount: 98 },
  { code: 'COREIA100', label: '99.9% OFF', color: '#10b981', discount: 99.9 },
  { code: 'DOPAMINA99', label: 'BÔNUS DOPA', color: '#f43f5e', discount: 99 }
];

export const DopamineWheelModal: React.FC = () => {
  const { isWheelOpen, setIsWheelOpen, applyCoupon, setIsCartOpen } = useShop();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonSlice, setWonSlice] = useState<Slice | null>(null);

  if (!isWheelOpen) return null;

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonSlice(null);

    const randomIndex = Math.floor(Math.random() * SLICES.length);
    const sliceAngle = 360 / SLICES.length;
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const targetAngle = extraSpins + (360 - (randomIndex * sliceAngle + sliceAngle / 2));

    setRotation(targetAngle);

    let tickCount = 0;
    const interval = setInterval(() => {
      soundManager.playTick();
      tickCount++;
      if (tickCount > 25) clearInterval(interval);
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
      const selected = SLICES[randomIndex];
      setWonSlice(selected);
      soundManager.playFanfare();
      
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      applyCoupon(selected.code);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-theme-card border border-theme-subtle rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center text-center overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow behind */}
        <div className="absolute -top-20 -left-20 w-40 sm:w-48 h-40 sm:h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 sm:w-48 h-40 sm:h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsWheelOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-theme-elevated text-theme-muted hover:text-theme-heading transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 text-[11px] sm:text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sorteio de Dopamina Coreana</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-theme-heading">Roleta da Fortuna</h2>
        <p className="text-xs text-theme-muted mt-0.5 max-w-xs">
          Gire para garantir cupons extravagantes e economizar ainda mais na sua mente.
        </p>

        {/* Wheel Container */}
        <div className="relative my-4 sm:my-6 w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center shrink-0">
          {/* Wheel Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-6 h-8 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-transparent border-r-[8px] sm:border-r-[10px] border-r-transparent border-t-[16px] sm:border-t-[20px] border-t-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]" />
          </div>

          {/* Wheel Disc */}
          <div
            className="w-full h-full rounded-full border-4 border-slate-300 dark:border-slate-700 shadow-[0_0_30px_rgba(236,72,153,0.25)] relative overflow-hidden transition-transform ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '3.5s' : '0s',
              transitionTimingFunction: 'cubic-bezier(0.15, 0.9, 0.2, 1)'
            }}
          >
            {/* SVG Wheel segments */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {SLICES.map((slice, index) => {
                const angle = 360 / SLICES.length;
                const startAngle = index * angle;
                const endAngle = (index + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                const midAngle = startAngle + angle / 2;
                const textX = 50 + 32 * Math.cos((Math.PI * midAngle) / 180);
                const textY = 50 + 32 * Math.sin((Math.PI * midAngle) / 180);

                return (
                  <g key={index}>
                    <path d={pathData} fill={slice.color} stroke="#0f172a" strokeWidth="1" />
                    <text
                      x={textX}
                      y={textY}
                      fill="#ffffff"
                      fontSize="5"
                      fontWeight="900"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                    >
                      {slice.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Wheel Center Button */}
          <div className="absolute z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-theme-card border-2 border-amber-400 flex items-center justify-center shadow-lg">
            <Dices className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 dark:text-amber-400 animate-spin-slow" />
          </div>
        </div>

        {/* Winner Announcement */}
        {wonSlice && (
          <div className="w-full mb-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm text-emerald-600 dark:text-emerald-300">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400" />
              <span>PARABÉNS! GANHOU: {wonSlice.label}!</span>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
              Cupom <strong className="font-mono bg-emerald-500/20 px-1 rounded">{wonSlice.code}</strong> aplicado no carrinho!
            </p>
          </div>
        )}

        {/* Spin Button */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wide transition-all shadow-xl cursor-pointer ${
              isSpinning
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 via-pink-500 to-fuchsia-600 hover:from-amber-400 hover:to-fuchsia-500 text-slate-950 shadow-pink-500/20 active:scale-98'
            }`}
          >
            {isSpinning ? 'Girando a Dopamina...' : 'GIRAR AGORA (GRÁTIS) 🎲'}
          </button>

          {wonSlice && (
            <button
              onClick={() => {
                setIsWheelOpen(false);
                setIsCartOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 hover:text-pink-500 transition-colors cursor-pointer"
            >
              <span>Ir para o Carrinho com o Desconto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
