'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, AVAILABLE_THEMES, DARK_THEME, LIGHT_THEME, applyThemeVariables } from '@/theme/themes';
import { soundManager } from '@/lib/soundEffects';

interface ThemeContextType {
  theme: Theme;
  themeId: string;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeById: (id: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DARK_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedThemeId = localStorage.getItem('dopashop_theme');
      if (savedThemeId) {
        const found = AVAILABLE_THEMES.find((t) => t.id === savedThemeId);
        if (found) {
          setCurrentTheme(found);
          applyThemeVariables(found);
          return;
        }
      }
    } catch {
      // localStorage indisponível
    }
    // Padrão: Dark Theme (preserva esquema original)
    applyThemeVariables(DARK_THEME);
  }, []);

  const setThemeById = (id: string) => {
    const found = AVAILABLE_THEMES.find((t) => t.id === id);
    if (!found) return;

    soundManager.playPop();
    setCurrentTheme(found);
    applyThemeVariables(found);

    try {
      localStorage.setItem('dopashop_theme', found.id);
    } catch {}
  };

  const toggleTheme = () => {
    soundManager.playPop();
    const nextTheme = currentTheme.id === 'dark' ? LIGHT_THEME : DARK_THEME;
    setCurrentTheme(nextTheme);
    applyThemeVariables(nextTheme);

    try {
      localStorage.setItem('dopashop_theme', nextTheme.id);
    } catch {}
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeId: currentTheme.id,
        isDark: currentTheme.isDark,
        toggleTheme,
        setThemeById,
        availableThemes: AVAILABLE_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser utilizado dentro de um ThemeProvider');
  }
  return context;
};
