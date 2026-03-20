'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations } from '@/lib/data/i18n';

export type Lang = 'pt' | 'en';
type TranslationTree = typeof translations.pt;

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return path; // fallback: return the key itself
  }, obj);
}

function detectDefaultLang(): Lang {
  if (typeof window === 'undefined') return 'pt';
  const stored = localStorage.getItem('lang');
  if (stored === 'pt' || stored === 'en') return stored;
  const nav = navigator.language || '';
  return nav.startsWith('pt') ? 'pt' : 'en';
}

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: TranslationTree;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectDefaultLang);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  }, []);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}

export function useT(section?: string) {
  const { t, lang, toggleLang } = useLang();
  if (!section) return { t, lang, toggleLang };
  const sectionT = getNestedValue(t as unknown as Record<string, unknown>, section);
  return { t: sectionT, lang, toggleLang };
}
