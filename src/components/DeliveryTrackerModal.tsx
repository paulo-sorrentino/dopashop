'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { soundManager } from '@/lib/soundEffects';
import { 
  X, 
  Package, 
  Rocket, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Radio, 
  ShieldCheck, 
  TrendingDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatMessage {
  id: string;
  sender: 'driver' | 'user' | 'system';
  text: string;
  time: string;
}

export const DeliveryTrackerModal: React.FC = () => {
  const { 
    isTrackerOpen, 
    setIsTrackerOpen, 
    currentTrackingOrder, 
    setIsVaultOpen, 
    addDopamine 
  } = useShop();

  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'system',
      text: '🛰️ Sinal quântico conectado ao entregador imaginário.',
      time: 'Agora'
    },
    {
      id: 'm2',
      sender: 'driver',
      text: 'Annyeonghaseyo! Aqui é o Jun-seo. Seus desejos já estão na minha garupa!',
      time: 'Agora'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [bubblePops, setBubblePops] = useState(0);

  useEffect(() => {
    if (!isTrackerOpen) {
      setStep(1);
      return;
    }

    const t1 = setTimeout(() => {
      setStep(2);
      soundManager.playWhoosh();
      setMessages((prev) => [
        ...prev,
        {
          id: 'm3',
          sender: 'driver',
          text: 'Liguei o turbo interestelar. O iate de ouro está bem amarrado com elásticos!',
          time: 'Agora'
        }
      ]);
    }, 4500);

    const t2 = setTimeout(() => {
      setStep(3);
      soundManager.playPop();
      setMessages((prev) => [
        ...prev,
        {
          id: 'm4',
          sender: 'driver',
          text: 'Desviei do trânsito na órbita. Já estou entrando na sua atmosfera!',
          time: 'Agora'
        }
      ]);
    }, 9000);

    const t3 = setTimeout(() => {
      setStep(4);
      soundManager.playFanfare();
      addDopamine(20);
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}
      setMessages((prev) => [
        ...prev,
        {
          id: 'm5',
          sender: 'driver',
          text: 'Cheguei! Dopamina pura descarregada no seu cérebro. Zero dívidas criadas!',
          time: 'Agora'
        }
      ]);
    }, 14000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isTrackerOpen, addDopamine]);

  if (!isTrackerOpen || !currentTrackingOrder) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    soundManager.playPop();
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: chatInput,
      time: 'Agora'
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      soundManager.playPop();
      const driverReplies = [
        'Pode deixar, tô voando na velocidade da luz!',
        'Relaxa, o plástico bolha protegeu 100% dos seus produtos!',
        'Excelente escolha! Sua conta bancária real mandou um abraço de agradecimento.',
        'Já tô avistando seu sofá no radar!'
      ];
      const randomReply = driverReplies[Math.floor(Math.random() * driverReplies.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: 'drv_' + Date.now(),
          sender: 'driver',
          text: randomReply,
          time: 'Agora'
        }
      ]);
    }, 1200);
  };

  const handlePopBubble = () => {
    soundManager.playPop();
    setBubblePops((prev) => prev + 1);
    addDopamine(1);
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const stages = [
    {
      step: 1,
      title: 'Embalando Sonhos',
      desc: 'Plástico bolha antiestresse.',
      icon: Package
    },
    {
      step: 2,
      title: 'Decolagem Cósmica',
      desc: 'Jun-seo ativou o turbo.',
      icon: Rocket
    },
    {
      step: 3,
      title: 'Na Sua Órbita',
      desc: 'Velocidade do pensamento.',
      icon: MapPin
    },
    {
      step: 4,
      title: 'Entregue no Cérebro',
      desc: 'Dopamina liberada!',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-theme-card border border-theme-subtle rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsTrackerOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-theme-elevated text-theme-muted hover:text-theme-heading transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-[10px] sm:text-xs font-bold w-fit mb-2">
          <Radio className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse" />
          <span>Radar de Entrega em Tempo Real</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h2 className="text-xl sm:text-2xl font-black text-theme-heading">
            Rastreamento Cósmico
          </h2>
          <span className="font-mono text-[11px] sm:text-xs text-theme-muted bg-theme-elevated px-2 py-0.5 rounded-lg border border-theme-subtle w-fit">
            Código: <strong className="text-pink-600 dark:text-pink-400">{currentTrackingOrder.trackingCode}</strong>
          </span>
        </div>

        {/* Radar & Motoboy Animation View */}
        <div className="my-3.5 sm:my-5 p-3.5 sm:p-4 rounded-2xl bg-theme-elevated border border-theme-subtle relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Animated Radar Pulse */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-500/5 dark:bg-cyan-950/20 shrink-0">
            <div className="absolute inset-0 rounded-full border border-cyan-500/40 animate-ping opacity-25" />
            <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-cyan-500/20 animate-spin-slow" />
            <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />

            {/* Moving Motoboy Icon */}
            <div 
              className="absolute transition-all duration-1000 flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-theme-card border border-pink-500 shadow-md text-base sm:text-lg"
              style={{
                top: step === 4 ? '40%' : `${70 - step * 18}%`,
                left: step === 4 ? '50%' : `${25 + step * 15}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {step === 4 ? '🧠' : '🏍️'}
            </div>
          </div>

          {/* Real-time Telemetry Text */}
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <div className="text-[11px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Status Atual:</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-theme-heading">
              {stages[step - 1].title}
            </h4>
            <p className="text-xs text-theme-muted">
              {stages[step - 1].desc}
            </p>
            <div className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center sm:justify-start gap-1 pt-0.5">
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>Economia: {formatBRL(currentTrackingOrder.subtotal)}</span>
            </div>
          </div>

          {/* Interactive Bubble Wrap */}
          <div className="sm:border-l sm:border-theme-subtle sm:pl-3 flex flex-col items-center justify-center shrink-0">
            <span className="text-[10px] text-theme-muted mb-1">Anti-Stress:</span>
            <button
              onClick={handlePopBubble}
              className="px-2.5 py-1.5 rounded-xl bg-theme-card hover:bg-pink-500/10 border border-theme-subtle hover:border-pink-500 text-xs font-bold text-pink-600 dark:text-pink-300 transition-all active:scale-90 cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>🫧 Estourar!</span>
              <span className="font-mono text-theme-heading text-[10px] bg-theme-elevated px-1 rounded">{bubblePops}</span>
            </button>
          </div>
        </div>

        {/* Timeline Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {stages.map((st) => {
            const isCompleted = step >= st.step;
            const isCurrent = step === st.step;
            const Icon = st.icon;

            return (
              <div
                key={st.step}
                className={`p-2.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-pink-500/15 border-pink-500 text-theme-heading shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-200'
                    : 'bg-theme-elevated border-theme-subtle text-theme-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-pink-600 dark:text-pink-400 animate-bounce' : isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-theme-muted'}`} />
                  <span className="text-[9px] font-mono font-bold">0{st.step}</span>
                </div>
                <div className="text-[11px] font-bold truncate">{st.title}</div>
                <div className="text-[9px] text-theme-muted truncate mt-0.5">{st.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Real-time Chat with the Imaginary Driver */}
        <div className="rounded-2xl bg-theme-elevated border border-theme-subtle overflow-hidden flex flex-col flex-1">
          <div className="p-2.5 bg-theme-card border-b border-theme-subtle flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-theme-heading text-xs">Chat com Jun-seo</span>
            </div>
            <span className="text-[10px] text-theme-muted">Ao Vivo</span>
          </div>

          {/* Messages list */}
          <div className="p-2.5 space-y-2 max-h-36 sm:max-h-44 overflow-y-auto text-xs">
            {messages.map((m) => {
              if (m.sender === 'system') {
                return (
                  <div key={m.id} className="text-center text-[9px] sm:text-[10px] text-cyan-600 dark:text-cyan-400 font-mono py-0.5">
                    {m.text}
                  </div>
                );
              }

              const isDriver = m.sender === 'driver';

              return (
                <div
                  key={m.id}
                  className={`flex ${isDriver ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-2xl ${
                      isDriver
                        ? 'bg-theme-card text-theme-body border border-theme-subtle rounded-tl-xs shadow-xs'
                        : 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-tr-xs'
                    }`}
                  >
                    <p className="leading-snug text-[11px] sm:text-xs">{m.text}</p>
                    <span className="block text-[8px] sm:text-[9px] text-theme-muted mt-0.5 text-right">
                      {m.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-theme-subtle flex gap-1.5">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Falar com motoboy..."
              className="flex-1 px-2.5 py-1 text-xs rounded-xl bg-theme-input border border-theme-subtle text-theme-heading placeholder:text-theme-muted focus:outline-hidden focus:border-pink-500 shadow-xs"
            />
            <button
              type="submit"
              className="p-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Footer actions */}
        <div className="mt-3 pt-2.5 border-t border-theme-subtle flex items-center justify-between gap-2">
          <button
            onClick={() => {
              setIsTrackerOpen(false);
              setIsVaultOpen(true);
            }}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline transition-colors cursor-pointer truncate"
          >
            <TrendingDown className="w-3.5 h-3.5 shrink-0" />
            <span>Ver Cofre</span>
          </button>

          <button
            onClick={() => setIsTrackerOpen(false)}
            className="px-3 py-1.5 rounded-xl bg-theme-elevated hover:bg-slate-200 dark:hover:bg-slate-700 text-theme-heading text-[11px] sm:text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Voltar ao Catálogo
          </button>
        </div>

      </div>
    </div>
  );
};
