'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function SkipLink() {
  return (
    <SkipLinkInner />
  );
}

function SkipLinkInner() {
  const { language } = useLanguage();
  const label = translations[language].skipLink;

  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
