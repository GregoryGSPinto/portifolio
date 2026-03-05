'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import Constellation from './Constellation';

export default function Hero() {
  const { t } = useLang();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <Constellation />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, var(--glow-accent), transparent)',
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, var(--gradient-bottom), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {/* Pre-title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[60px] h-px" style={{ background: 'var(--accent)' }} />
            <span
              className="font-mono text-[10px] sm:text-[11px] tracking-[3px] uppercase"
              style={{ color: 'var(--accent)' }}
            >
              {t.hero.preTitle}
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-display font-light leading-[0.92] mb-8"
            style={{
              fontSize: 'clamp(36px, 10vw, 108px)',
              letterSpacing: '-3px',
              color: 'var(--text-primary)',
            }}
          >
            Gregory
            <br />
            Guimarães
          </h1>

          {/* Tagline */}
          <p
            className="font-body text-[15px] md:text-lg max-w-[520px] mb-12 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t.hero.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => handleScrollTo('cases')}
              className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
                borderRadius: '2px',
              }}
            >
              {t.hero.cta1}
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300"
              style={{
                border: '1px solid var(--border-hover)',
                color: 'var(--accent)',
                borderRadius: '2px',
                background: 'transparent',
              }}
            >
              {t.hero.cta2}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
        <span
          className="font-mono text-[10px] tracking-[3px] uppercase"
          style={{
            writingMode: 'vertical-rl',
            color: 'var(--text-ghost)',
          }}
        >
          {t.hero.scroll}
        </span>
        <div
          className="w-px h-16"
          style={{
            background: 'linear-gradient(to bottom, var(--scroll-line), transparent)',
          }}
        />
      </div>
    </section>
  );
}
