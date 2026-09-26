'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { soundManager } from '@/lib/soundEffects';
import { 
  X, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles, 
  Package, 
  Share2, 
  Check, 
  Flame, 
  Trophy 
} from 'lucide-react';

export const SavingsVaultModal: React.FC = () => {
  const { 
    isVaultOpen, 
    setIsVaultOpen, 
    realMoneySaved, 
    conqueredImpulses, 
    orders, 
    setCurrentTrackingOrder, 
    setIsTrackerOpen 
  } = useShop();

  const [copied, setCopied] = useState(false);

  if (!isVaultOpen) return null;

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleShare = () => {
    soundManager.playPop();
    const text = `🎉 Acabei de economizar ${formatBRL(realMoneySaved)} na vida real usando a terapia de compras do DopaShop! Já neutralizei ${conqueredImpulses} impulsos de compra.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackAgain = (order: typeof orders[0]) => {
    setCurrentTrackingOrder(order);
    setIsVaultOpen(false);
    setIsTrackerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-theme-card border border-theme-subtle rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsVaultOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-theme-elevated text-theme-muted hover:text-theme-heading transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-[10px] sm:text-xs font-bold w-fit mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Terapia Financeira Coreana</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-theme-heading">Cofre de Economia Real</h2>
        <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">
          Veja quanto dinheiro você poupou no mundo real ao canalizar o desejo de compra aqui no DopaShop.
        </p>

        {/* Main Stat Card */}
        <div className="mt-4 sm:mt-5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-emerald-500/10 dark:bg-gradient-to-tr dark:from-slate-950 dark:via-emerald-950/40 dark:to-slate-950 border border-emerald-500/30 text-center relative overflow-hidden shadow-md">
          <div className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 dark:text-amber-400" />
            <span>Total Real Salvo da Fatura</span>
          </div>

          <div className="text-2xl sm:text-4xl md:text-5xl font-black text-theme-heading font-mono my-2 tracking-tight break-all">
            {formatBRL(realMoneySaved)}
          </div>

          <p className="text-[11px] sm:text-xs text-theme-muted max-w-md mx-auto">
            Se você tivesse comprado esses itens de verdade na internet, sua fatura estaria deste tamanho. Parabéns pelo autocontrole inteligente!
          </p>

          <div className="mt-3.5 sm:mt-4 flex items-center justify-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar Conquista</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Micro Stats Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 my-4">
          <div className="p-3 sm:p-4 rounded-2xl bg-theme-elevated border border-theme-subtle flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-theme-heading font-mono">{conqueredImpulses}</div>
              <div className="text-[10px] sm:text-xs text-theme-muted">Impulsos Vencidos</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-theme-elevated border border-theme-subtle flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-pink-500/10 text-pink-500 dark:text-pink-400 border border-pink-500/20 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-theme-heading font-mono">100%</div>
              <div className="text-[10px] sm:text-xs text-theme-muted">Dopamina sem Culpa</div>
            </div>
          </div>
        </div>

        {/* Past Orders History */}
        <div className="flex-1">
          <h3 className="text-xs sm:text-sm font-bold text-theme-heading mb-2 sm:mb-3 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 dark:text-pink-400" />
            <span>Histórico de Compras Terapêuticas</span>
          </h3>

          {orders.length === 0 ? (
            <div className="p-4 sm:p-6 text-center rounded-2xl bg-theme-elevated border border-theme-subtle text-theme-muted text-xs">
              Você ainda não finalizou compras fictícias hoje. Escolha um produto e sinta o alívio!
            </div>
          ) : (
            <div className="space-y-2 max-h-48 sm:max-h-56 overflow-y-auto pr-1">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-2.5 sm:p-3.5 rounded-2xl bg-theme-elevated border border-theme-subtle flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-theme-heading truncate">{ord.items.length} produto{ord.items.length > 1 ? 's' : ''}</span>
                      <span className="font-mono text-[9px] sm:text-[10px] text-pink-600 dark:text-pink-400 bg-pink-500/10 px-1 py-0.5 rounded border border-pink-500/20 shrink-0">
                        {ord.trackingCode}
                      </span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-theme-muted mt-0.5 truncate">
                      {ord.createdAt} • {ord.paymentMethod}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                        +{formatBRL(ord.subtotal)}
                      </div>
                      <div className="text-[9px] text-theme-muted">Real: R$ 0,00</div>
                    </div>

                    <button
                      onClick={() => handleTrackAgain(ord)}
                      className="px-2 py-1 rounded-lg bg-theme-card hover:bg-slate-200 dark:hover:bg-slate-700 text-theme-body text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer border border-theme-subtle"
                    >
                      Rastreio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
