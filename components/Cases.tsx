'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { caseStudies } from '@/lib/data';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Cases() {
  const { language } = useLanguage();
  const t = translations[language].cases;
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = caseStudies[activeCase];

  return (
    <section id="cases" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="03" label={t.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-10 md:mb-16 whitespace-pre-line"
          style={{
            fontSize: 'clamp(28px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          {t.title}
        </motion.h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 md:mb-16 overflow-x-auto">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => setActiveCase(i)}
              className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[2px] px-4 sm:px-6 py-3 rounded-sm transition-all duration-300 shrink-0"
              style={{
                background: activeCase === i ? cs.color : 'transparent',
                color: activeCase === i ? 'var(--bg-primary)' : 'var(--text-tertiary)',
                border: `1px solid ${activeCase === i ? cs.color : 'var(--border-subtle)'}`,
              }}
            >
              {cs.title}
            </button>
          ))}
        </div>

        {/* Case Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16"
          >
            {/* Left: Details */}
            <div>
              <span
                className="font-mono text-[11px] tracking-[2px] uppercase block mb-4"
                style={{ color: currentCase.color }}
              >
                {currentCase.subtitle[language]}
              </span>

              <h3
                className="font-display text-[32px] md:text-[42px] font-normal mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                {currentCase.title}
              </h3>

              <p
                className="font-body text-[15px] leading-[1.8] mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                {currentCase.desc[language]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {currentCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] sm:text-[11px] px-3 py-1.5 rounded-sm"
                    style={{
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--tag-border)',
                      color: currentCase.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              {currentCase.url !== '#' && (
                <a
                  href={currentCase.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] tracking-[1px] transition-opacity hover:opacity-70"
                  style={{ color: currentCase.color }}
                >
                  {t.viewProject}
                </a>
              )}
            </div>

            {/* Right: Metrics */}
            <div
              className="grid grid-cols-2 gap-px rounded-lg overflow-hidden"
              style={{ background: 'var(--pillar-gap-bg)' }}
            >
              {currentCase.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center justify-center text-center p-5 md:p-7"
                  style={{ background: 'var(--bg-primary)' }}
                >
                  <span
                    className="font-display text-2xl md:text-3xl font-light mb-2"
                    style={{ color: currentCase.color }}
                  >
                    {metric.value}
                  </span>
                  <span
                    className="font-mono text-[10px] md:text-[11px] uppercase tracking-[2px]"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
