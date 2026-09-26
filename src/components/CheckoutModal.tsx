'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { soundManager } from '@/lib/soundEffects';
import { 
  X, 
  CreditCard, 
  Zap, 
  Coins, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    finalTotal,
    cartSubtotal,
    discountAmount,
    createOrder,
    setIsTrackerOpen
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'crypto'>('card');
  const [address, setAddress] = useState('Meu Sofá Confortável, Sala de Estar, 100% Zen');
  const [cardHolder, setCardHolder] = useState('Bilionário(a) Imaginário(a)');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    soundManager.playChaChing();

    setTimeout(() => {
      soundManager.playFanfare();

      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch {}

      const methodNames = {
        card: 'Cartão Black Infinito de Crédito',
        pix: 'Pix Cerebral de Dopamina',
        crypto: 'Criptomoeda Cósmica ($DOPA)'
      };

      createOrder(methodNames[paymentMethod]);
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      setIsTrackerOpen(true);
    }, 1500);
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-theme-card border border-theme-subtle rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-32 sm:w-40 h-32 sm:h-40 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-theme-elevated text-theme-muted hover:text-theme-heading transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-[10px] sm:text-xs font-bold w-fit mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Simulador 100% Seguro & Gratuito</span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-black text-theme-heading">Checkout da Dopamina</h2>
        <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">
          Conclua o pagamento fictício para liberar os neurotransmissores de prazer imediato.
        </p>

        <form onSubmit={handleCompletePurchase} className="mt-4 sm:mt-5 space-y-4">
          
          {/* Fictitious Payment Method Selection */}
          <div>
            <label className="text-[11px] sm:text-xs font-bold text-theme-body mb-1.5 block">
              Escolha sua Forma de Pagamento Fictícia:
            </label>

            <div className="grid grid-cols-3 gap-2">
              
              {/* Option 1: Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-pink-500/15 border-pink-500 text-theme-heading shadow-sm'
                    : 'bg-theme-elevated border-theme-subtle text-theme-muted hover:border-slate-400'
                }`}
              >
                <CreditCard className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-2 ${paymentMethod === 'card' ? 'text-pink-600 dark:text-pink-400' : 'text-theme-muted'}`} />
                <div>
                  <div className="text-[11px] sm:text-xs font-bold truncate">Cartão Black</div>
                  <div className="text-[9px] sm:text-[10px] text-theme-muted">Infinito</div>
                </div>
              </button>

              {/* Option 2: Pix */}
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'bg-amber-500/15 border-amber-500 text-theme-heading shadow-sm'
                    : 'bg-theme-elevated border-theme-subtle text-theme-muted hover:border-slate-400'
                }`}
              >
                <Zap className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-2 ${paymentMethod === 'pix' ? 'text-amber-500 dark:text-amber-400' : 'text-theme-muted'}`} />
                <div>
                  <div className="text-[11px] sm:text-xs font-bold truncate">Pix Cerebral</div>
                  <div className="text-[9px] sm:text-[10px] text-theme-muted">Instantâneo</div>
                </div>
              </button>

              {/* Option 3: Crypto */}
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'crypto'
                    ? 'bg-purple-500/15 border-purple-500 text-theme-heading shadow-sm'
                    : 'bg-theme-elevated border-theme-subtle text-theme-muted hover:border-slate-400'
                }`}
              >
                <Coins className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-2 ${paymentMethod === 'crypto' ? 'text-purple-600 dark:text-purple-400' : 'text-theme-muted'}`} />
                <div>
                  <div className="text-[11px] sm:text-xs font-bold truncate">Cripto $DOPA</div>
                  <div className="text-[9px] sm:text-[10px] text-theme-muted">Cósmico</div>
                </div>
              </button>

            </div>
          </div>

          {/* Card Mock Details (Stays ultra-premium black card) */}
          {paymentMethod === 'card' && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-slate-700 text-white shadow-lg space-y-2.5">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-mono tracking-widest text-[10px] sm:text-xs">DOPA INFINITE CARD</span>
                <span className="font-black text-amber-400 text-[10px] sm:text-xs">VIP ELITE</span>
              </div>
              
              <div className="font-mono text-sm sm:text-base tracking-wider text-pink-300">
                •••• •••• •••• 7777
              </div>

              <div className="flex justify-between items-end text-xs">
                <div className="flex-1 mr-2">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 block">TITULAR</span>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="bg-transparent border-b border-slate-700 text-[11px] sm:text-xs font-semibold focus:outline-hidden focus:border-pink-400 w-full text-white"
                  />
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 block">VALIDADE / CVV</span>
                  <span className="font-mono text-slate-200 text-xs">∞ / 777</span>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          <div>
            <label className="text-[11px] sm:text-xs font-bold text-theme-body mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
              <span>Local de Entrega Imaginário:</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-theme-input border border-theme-subtle text-theme-heading placeholder:text-theme-muted focus:outline-hidden focus:border-pink-500 shadow-xs"
              placeholder="Ex: Minha Casa, Meu Sofá"
            />
          </div>

          {/* Summary Box */}
          <div className="p-3 rounded-2xl bg-theme-elevated border border-theme-subtle space-y-1 text-xs">
            <div className="flex justify-between text-theme-muted">
              <span>Valor Fictício das Compras:</span>
              <span className="font-mono text-theme-body">{formatBRL(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-pink-600 dark:text-pink-400 font-semibold">
                <span>Desconto de Dopamina:</span>
                <span className="font-mono">-{formatBRL(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-black pt-1 border-t border-theme-subtle text-xs sm:text-sm">
              <span>Total a Pagar (Real):</span>
              <span className="font-mono">R$ 0,00</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 sm:py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-all cursor-pointer ${
              isProcessing
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-wait'
                : 'bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 hover:from-fuchsia-500 hover:to-amber-400 text-white shadow-pink-600/30 active:scale-98'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                Processando Dopamina Cerebral...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                PAGAR E LIBERAR DOPAMINA ✨
              </span>
            )}
          </button>

          <p className="text-[10px] text-center text-theme-muted">
            🔒 Nenhum dado bancário real é solicitado. Simulador 100% gratuito.
          </p>
        </form>

      </div>
    </div>
  );
};
