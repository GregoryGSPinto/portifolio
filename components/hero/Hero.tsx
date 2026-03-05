'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import GradientMesh from './GradientMesh';
import Typewriter from './Typewriter';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0 },
  },
};

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  },
});

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  },
});

function handleScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* t=0.0 — Background fade in */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <GradientMesh />
      </motion.div>

      {/* Bottom gradient for section transition */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, var(--gradient-bottom), transparent)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-12 w-full flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Pre-title label */}
        <motion.span
          className="font-mono text-[10px] sm:text-[11px] tracking-[3px] uppercase mb-6"
          style={{ color: 'var(--accent)' }}
          variants={fadeIn(0.2)}
        >
          {t.hero.preTitle}
        </motion.span>

        {/* t=0.3 — Name with clip-path reveal + blur→clear */}
        <motion.h1
          className="font-display font-bold leading-[0.95] mb-6"
          style={{
            fontSize: 'clamp(40px, 10vw, 108px)',
            letterSpacing: '-2px',
            color: 'var(--text-primary)',
          }}
          variants={fadeUp(0.3)}
        >
          {t.hero.name}
        </motion.h1>

        {/* t=0.6 — Subtitle */}
        <motion.p
          className="font-body text-[15px] md:text-lg max-w-[560px] mb-4 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          variants={fadeUp(0.6)}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* t=0.9 — Typewriter */}
        <motion.div className="h-8 mb-10" variants={fadeIn(0.9)}>
          <Typewriter />
        </motion.div>

        {/* t=1.2 — CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          variants={fadeIn(1.2)}
        >
          <button
            onClick={() => handleScrollTo('projects')}
            className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:brightness-110 cursor-pointer"
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
            className="font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:brightness-125 cursor-pointer"
            style={{
              border: '1px solid var(--border-hover)',
              color: 'var(--accent)',
              borderRadius: '2px',
              background: 'transparent',
            }}
          >
            {t.hero.cta2}
          </button>
        </motion.div>
      </motion.div>

      {/* t=1.8 — Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span
          className="font-mono text-[10px] tracking-[3px] uppercase"
          style={{ color: 'var(--text-ghost)' }}
        >
          {t.hero.scroll}
        </span>
        <motion.svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="hero-scroll-chevron"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="var(--text-ghost)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 9L8 16L15 9"
            stroke="var(--text-ghost)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
