'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between gap-4"
      style={{
        padding: '32px 48px',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <span
        className="font-mono text-[11px] tracking-[2px]"
        style={{ color: 'rgba(232, 228, 222, 0.15)' }}
      >
        {t.left}
      </span>
      <span
        className="font-mono text-[11px] tracking-[2px]"
        style={{ color: 'rgba(232, 228, 222, 0.1)' }}
      >
        {t.right}
      </span>
    </footer>
  );
}
