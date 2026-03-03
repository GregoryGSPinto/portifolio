'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-8 md:px-12 md:py-8"
      style={{ borderTop: '1px solid var(--footer-border)' }}
    >
      <span
        className="font-mono text-[10px] md:text-[11px] tracking-[2px]"
        style={{ color: 'var(--text-ghost)' }}
      >
        {t.left}
      </span>
      <span
        className="font-mono text-[10px] md:text-[11px] tracking-[2px]"
        style={{ color: 'var(--text-ghost)' }}
      >
        {t.right}
      </span>
    </footer>
  );
}
