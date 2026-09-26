// Módulo de Temas do DopaShop
// Configuração isolada e modular para fácil modificação, teste de variações e novos temas.

export interface ThemeColors {
  // Cores de Fundo
  bgPage: string;
  bgCard: string;
  bgCardHover: string;
  bgElevated: string;
  bgInput: string;
  bgGlass: string;
  heroFrom: string;
  heroVia: string;
  heroTo: string;

  // Bordas
  borderMain: string;
  borderSubtle: string;
  borderHover: string;

  // Tipografia
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDim: string;

  // Acentos (Vibrantes no dark, suaves/desaturados e acolhedores no light)
  accentPink: string;
  accentPinkSoft: string;
  accentPinkBorder: string;

  accentAmber: string;
  accentAmberSoft: string;
  accentAmberBorder: string;

  accentEmerald: string;
  accentEmeraldSoft: string;
  accentEmeraldBorder: string;

  accentCyan: string;
  accentCyanSoft: string;
  accentCyanBorder: string;

  // Modais e UI
  modalOverlay: string;
  modalBg: string;
  cardShadow: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
}

export interface Theme {
  id: string;
  name: string;
  isDark: boolean;
  icon: string;
  description: string;
  colors: ThemeColors;
}

// 1. TEMA ESCURO (Esquema de cores original preservado integralmente)
export const DARK_THEME: Theme = {
  id: 'dark',
  name: 'Modo Noturno (Cyber Seul)',
  isDark: true,
  icon: '🌙',
  description: 'Estética futurista noturna de Seul com neons vibrantes e fundo meia-noite.',
  colors: {
    bgPage: '#090d16',
    bgCard: '#0f172a',
    bgCardHover: '#131d35',
    bgElevated: '#1e293b',
    bgInput: '#070b12',
    bgGlass: 'rgba(15, 23, 42, 0.85)',
    heroFrom: 'rgba(15, 23, 42, 0.6)',
    heroVia: '#090d16',
    heroTo: '#090d16',

    borderMain: 'rgba(51, 65, 85, 0.8)',
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(236, 72, 153, 0.5)',

    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    textDim: '#64748b',

    accentPink: '#ec4899',
    accentPinkSoft: 'rgba(236, 72, 153, 0.15)',
    accentPinkBorder: 'rgba(236, 72, 153, 0.3)',

    accentAmber: '#f59e0b',
    accentAmberSoft: 'rgba(245, 158, 11, 0.15)',
    accentAmberBorder: 'rgba(245, 158, 11, 0.3)',

    accentEmerald: '#10b981',
    accentEmeraldSoft: 'rgba(16, 185, 129, 0.15)',
    accentEmeraldBorder: 'rgba(16, 185, 129, 0.3)',

    accentCyan: '#06b6d4',
    accentCyanSoft: 'rgba(6, 182, 212, 0.15)',
    accentCyanBorder: 'rgba(6, 182, 212, 0.3)',

    modalOverlay: 'rgba(2, 6, 24, 0.85)',
    modalBg: '#0f172a',
    cardShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    scrollbarTrack: '#0b0f19',
    scrollbarThumb: '#273549',
  }
};

// 2. TEMA CLARO (Tons agradáveis, suaves, levemente desaturados e acolhedores)
export const LIGHT_THEME: Theme = {
  id: 'light',
  name: 'Modo Claro (Algodão & Nuvem)',
  isDark: false,
  icon: '☀️',
  description: 'Paleta suave em tons de algodão, pérola e cinza desaturado, sem brilho agressivo.',
  colors: {
    bgPage: '#f5f7fa',
    bgCard: '#ffffff',
    bgCardHover: '#f8fafc',
    bgElevated: '#eef2f6',
    bgInput: '#f1f4f8',
    bgGlass: 'rgba(255, 255, 255, 0.88)',
    heroFrom: '#edf2f7',
    heroVia: '#f5f7fa',
    heroTo: '#f5f7fa',

    borderMain: '#e2e8f0',
    borderSubtle: '#edf1f5',
    borderHover: 'rgba(217, 79, 133, 0.45)',

    textPrimary: '#1e293b',
    textSecondary: '#334155',
    textMuted: '#64748b',
    textDim: '#94a3b8',

    accentPink: '#d94f85',
    accentPinkSoft: 'rgba(217, 79, 133, 0.12)',
    accentPinkBorder: 'rgba(217, 79, 133, 0.28)',

    accentAmber: '#d97706',
    accentAmberSoft: 'rgba(217, 119, 6, 0.12)',
    accentAmberBorder: 'rgba(217, 119, 6, 0.25)',

    accentEmerald: '#059669',
    accentEmeraldSoft: 'rgba(5, 150, 105, 0.12)',
    accentEmeraldBorder: 'rgba(5, 150, 105, 0.25)',

    accentCyan: '#0284c7',
    accentCyanSoft: 'rgba(2, 132, 199, 0.12)',
    accentCyanBorder: 'rgba(2, 132, 199, 0.25)',

    modalOverlay: 'rgba(15, 23, 42, 0.55)',
    modalBg: '#ffffff',
    cardShadow: '0 10px 25px -5px rgba(100, 116, 139, 0.12), 0 8px 10px -6px rgba(100, 116, 139, 0.08)',
    scrollbarTrack: '#eef2f6',
    scrollbarThumb: '#cbd5e1',
  }
};

// Lista de temas disponíveis (permite expansão simples com novos temas no futuro)
export const AVAILABLE_THEMES: Theme[] = [DARK_THEME, LIGHT_THEME];

// Função que aplica as variáveis CSS dinâmicas no documento
export function applyThemeVariables(theme: Theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const { colors } = theme;

  // Configurar atributos e classes de raiz
  root.setAttribute('data-theme', theme.id);
  if (theme.isDark) {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }

  // Variáveis semânticas de tema
  root.style.setProperty('--theme-bg-page', colors.bgPage);
  root.style.setProperty('--theme-bg-card', colors.bgCard);
  root.style.setProperty('--theme-bg-card-hover', colors.bgCardHover);
  root.style.setProperty('--theme-bg-elevated', colors.bgElevated);
  root.style.setProperty('--theme-bg-input', colors.bgInput);
  root.style.setProperty('--theme-bg-glass', colors.bgGlass);
  root.style.setProperty('--theme-hero-from', colors.heroFrom);
  root.style.setProperty('--theme-hero-via', colors.heroVia);
  root.style.setProperty('--theme-hero-to', colors.heroTo);

  root.style.setProperty('--theme-border-main', colors.borderMain);
  root.style.setProperty('--theme-border-subtle', colors.borderSubtle);
  root.style.setProperty('--theme-border-hover', colors.borderHover);

  root.style.setProperty('--theme-text-primary', colors.textPrimary);
  root.style.setProperty('--theme-text-secondary', colors.textSecondary);
  root.style.setProperty('--theme-text-muted', colors.textMuted);
  root.style.setProperty('--theme-text-dim', colors.textDim);

  root.style.setProperty('--theme-accent-pink', colors.accentPink);
  root.style.setProperty('--theme-accent-pink-soft', colors.accentPinkSoft);
  root.style.setProperty('--theme-accent-pink-border', colors.accentPinkBorder);

  root.style.setProperty('--theme-accent-amber', colors.accentAmber);
  root.style.setProperty('--theme-accent-amber-soft', colors.accentAmberSoft);
  root.style.setProperty('--theme-accent-amber-border', colors.accentAmberBorder);

  root.style.setProperty('--theme-accent-emerald', colors.accentEmerald);
  root.style.setProperty('--theme-accent-emerald-soft', colors.accentEmeraldSoft);
  root.style.setProperty('--theme-accent-emerald-border', colors.accentEmeraldBorder);

  root.style.setProperty('--theme-accent-cyan', colors.accentCyan);
  root.style.setProperty('--theme-accent-cyan-soft', colors.accentCyanSoft);
  root.style.setProperty('--theme-accent-cyan-border', colors.accentCyanBorder);

  root.style.setProperty('--theme-modal-overlay', colors.modalOverlay);
  root.style.setProperty('--theme-modal-bg', colors.modalBg);
  root.style.setProperty('--theme-card-shadow', colors.cardShadow);
  root.style.setProperty('--theme-scrollbar-track', colors.scrollbarTrack);
  root.style.setProperty('--theme-scrollbar-thumb', colors.scrollbarThumb);

  // Mapeamento compatível para utilitários padrão
  root.style.setProperty('--background', colors.bgPage);
  root.style.setProperty('--foreground', colors.textPrimary);
}
