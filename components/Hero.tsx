'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Constellation from './Constellation';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Constellation Background */}
      <Constellation />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(201, 168, 76, 0.03), transparent)',
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, #0A0A0B, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {/* Pre-title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[60px] h-px bg-accent" />
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent">
              {t.preTitle}
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-display font-light leading-[0.92] mb-8"
            style={{
              fontSize: 'clamp(56px, 7.5vw, 108px)',
              letterSpacing: '-3px',
              color: '#E8E4DE',
            }}
          >
            Gregory
            <br />
            Guimarães
          </h1>

          {/* Tagline */}
          <p
            className="font-body text-base md:text-lg max-w-[520px] mb-12 leading-relaxed"
            style={{ color: 'rgba(232, 228, 222, 0.4)' }}
          >
            {t.tagline}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => handleScrollTo('cases')}
              className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:opacity-90"
              style={{
                background: '#C9A84C',
                color: '#0A0A0B',
                borderRadius: '2px',
              }}
            >
              {t.cta1}
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:bg-accent/10"
              style={{
                border: '1px solid rgba(201, 168, 76, 0.3)',
                color: '#C9A84C',
                borderRadius: '2px',
                background: 'transparent',
              }}
            >
              {t.cta2}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
        <span
          className="font-mono text-[10px] tracking-[3px] uppercase"
          style={{
            writingMode: 'vertical-rl',
            color: 'rgba(232, 228, 222, 0.15)',
          }}
        >
          {t.scroll}
        </span>
        <div
          className="w-px h-16"
          style={{
            background: 'linear-gradient(to bottom, rgba(201, 168, 76, 0.3), transparent)',
          }}
        />
      </div>
    </section>
  );
}
