'use client';

import { useLang } from '@/context/LangContext';

export default function Footer() {
  const { t: root } = useLang();
  const t = root.footer;

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
