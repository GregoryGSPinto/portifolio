'use client';

import { useLang } from '@/context/LangContext';

export default function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      {t.skipLink}
    </a>
  );
}
