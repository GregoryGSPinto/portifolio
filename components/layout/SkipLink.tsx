'use client';

import { useLang } from '@/context/LangContext';

export default function SkipLink() {
  return (
    <SkipLinkInner />
  );
}

function SkipLinkInner() {
  const { t } = useLang();
  const label = t.skipLink;

  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
