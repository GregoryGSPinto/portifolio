'use client';

import { useLang } from '@/context/LangContext';

export default function Footer() {
  const { t: root } = useLang();
  const t = root.footer;

  return (
    <footer
      className="px-5 py-10 md:px-12 md:py-12"
      style={{ borderTop: '1px solid var(--footer-border)' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left — copyright */}
        <span
          className="font-mono text-[10px] md:text-[11px] tracking-[2px]"
          style={{ color: 'var(--text-ghost)' }}
        >
          {t.left}
        </span>

        {/* Center — built with */}
        <span
          className="font-mono text-[10px] md:text-[11px] tracking-[1.5px] flex items-center gap-1"
          style={{ color: 'var(--text-ghost)' }}
        >
          {t.built}{' '}
          <span style={{ color: 'var(--accent)' }} aria-label="love">
            &#9829;
          </span>
        </span>

        {/* Right — source code link */}
        <a
          href="https://github.com/gregoryguimaraes"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] md:text-[11px] tracking-[2px] transition-colors duration-300 hover:text-accent"
          style={{ color: 'var(--text-ghost)' }}
        >
          {t.source} &rarr;
        </a>
      </div>
    </footer>
  );
}
