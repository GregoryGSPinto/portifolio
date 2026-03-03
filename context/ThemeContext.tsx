'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function getStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem('theme-preference');
  if (stored && ['system', 'light', 'dark'].includes(stored)) {
    return stored as ThemePreference;
  }
  return 'system';
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemTheme() : preference;
}

function applyThemeToDOM(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(getStoredPreference);
  const resolved = resolveTheme(preference);

  // Apply theme class to DOM and enable transitions after mount
  useEffect(() => {
    applyThemeToDOM(resolved);
    // Enable smooth transitions after initial render
    requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-transition');
    });
  }, [resolved]);

  // Listen to system preference changes when in 'system' mode
  useEffect(() => {
    if (preference !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => applyThemeToDOM(resolveTheme('system'));

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [preference]);

  const cycleTheme = useCallback(() => {
    const next: ThemePreference =
      preference === 'system' ? 'light' : preference === 'light' ? 'dark' : 'system';
    setPreference(next);
    localStorage.setItem('theme-preference', next);
    applyThemeToDOM(resolveTheme(next));
  }, [preference]);

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme: resolved, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
