'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/data/i18n';
import { caseStudies } from '@/lib/data';
import { useIsMobile } from '@/lib/hooks';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

type CasesT = typeof translations.pt.cases;

const storyLabels = (c: CasesT) => [
  { key: 'challenge' as const, num: '01', label: c.challengeLabel },
  { key: 'approach' as const, num: '02', label: c.approachLabel },
  { key: 'architecture' as const, num: '03', label: c.architectureLabel },
  { key: 'results' as const, num: '04', label: c.resultsLabel },
];

export default function Cases() {
  const { t, lang } = useLang();
  const c = t.cases;
  const isMobile = useIsMobile();
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = caseStudies[activeCase];
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section id="cases" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="04" label={c.label} />

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
          {c.title}
        </motion.h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 md:mb-16 overflow-x-auto">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => { setActiveCase(i); setIframeLoaded(false); }}
              className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[2px] px-4 sm:px-6 py-3 rounded-sm transition-all duration-300 shrink-0"
              style={{
                background: activeCase === i ? cs.accentColor : 'transparent',
                color: activeCase === i ? 'var(--bg-primary)' : 'var(--text-tertiary)',
                border: `1px solid ${activeCase === i ? cs.accentColor : 'var(--border-subtle)'}`,
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
          >
            {/* Block 1 — Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 mb-16 md:mb-24"
            >
              {/* Left: Info */}
              <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <span
                  className="font-mono text-[11px] tracking-[2px] uppercase block mb-3"
                  style={{ color: currentCase.accentColor }}
                >
                  {currentCase.timeline[lang]}
                </span>

                <h3
                  className="font-display text-[36px] md:text-[48px] font-normal mb-3"
                  style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}
                >
                  {currentCase.title}
                </h3>

                <span
                  className="font-mono text-[11px] sm:text-[12px] tracking-[2px] uppercase block mb-6"
                  style={{ color: currentCase.accentColor }}
                >
                  {currentCase.subtitle[lang]}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] sm:text-[11px] px-3 py-1.5 rounded-sm"
                      style={{
                        background: 'var(--tag-bg)',
                        border: '1px solid var(--tag-border)',
                        color: currentCase.accentColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {currentCase.url && (
                  <a
                    href={currentCase.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[13px] tracking-[1px] transition-opacity hover:opacity-70"
                    style={{ color: currentCase.accentColor }}
                  >
                    {c.viewProject} <span aria-hidden>→</span>
                  </a>
                )}
              </motion.div>

              {/* Right: Metrics */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-px rounded-lg overflow-hidden"
                style={{ background: 'var(--pillar-gap-bg)' }}
              >
                {currentCase.metrics.map((metric) => (
                  <div
                    key={metric.label[lang]}
                    className="flex flex-col items-center justify-center text-center p-4 md:p-6"
                    style={{ background: 'var(--bg-primary)' }}
                  >
                    <span
                      className="font-display text-[24px] md:text-[28px] font-light mb-1"
                      style={{ color: currentCase.accentColor }}
                    >
                      {metric.value}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[2px] mb-1"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {metric.label[lang]}
                    </span>
                    <span
                      className="font-body text-[11px]"
                      style={{ color: 'var(--text-ghost)' }}
                    >
                      {metric.context[lang]}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Block 2 — Storytelling */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mb-16 md:mb-24"
            >
              {storyLabels(c).map((item) => (
                <motion.div
                  key={item.key}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="pr-4"
                >
                  <span
                    className="font-display text-[32px] font-light block mb-2"
                    style={{ color: 'var(--pillar-number)' }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[3px] block mb-3"
                    style={{ color: currentCase.accentColor }}
                  >
                    {item.label}
                  </span>
                  <p
                    className="font-body text-[14px] leading-[1.8]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {currentCase[item.key][lang]}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Block 3 — Technical Decisions */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16 md:mb-24"
            >
              <motion.h4
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[22px] md:text-[24px] font-light mb-8"
                style={{ color: 'var(--text-primary)' }}
              >
                {c.decisionsLabel}
              </motion.h4>

              <div className="flex flex-col gap-2">
                {currentCase.decisions.map((decision) => (
                  <motion.div
                    key={decision.title[lang]}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group p-5 rounded-md transition-all duration-300 hover:bg-card-bg-hover"
                    style={{
                      borderLeft: '2px solid transparent',
                      background: 'var(--card-bg)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = currentCase.accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderLeftColor = 'transparent';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-lg shrink-0 mt-0.5" style={{ color: currentCase.accentColor }}>
                        {decision.icon}
                      </span>
                      <div>
                        <h5
                          className="font-body text-[15px] font-semibold mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {decision.title[lang]}
                        </h5>
                        <p
                          className="font-body text-[13px] leading-[1.7]"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {decision.description[lang]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Block 4 — Stack Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-16 md:mb-24"
            >
              <motion.span
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[11px] uppercase tracking-[3px] block mb-6"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {c.stackLabel}
              </motion.span>

              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-px rounded-lg overflow-hidden"
                style={{ background: 'var(--pillar-gap-bg)' }}
              >
                {currentCase.stackDetails.map((item) => (
                  <div
                    key={item.name}
                    className="flex-1 min-w-[140px] p-4 md:px-6 md:py-4"
                    style={{ background: 'var(--bg-primary)' }}
                  >
                    <span
                      className="font-mono text-[13px] block mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="font-body text-[12px]"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {item.role[lang]}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Block 5 — Live Preview */}
            {currentCase.previewType === 'iframe' && currentCase.previewUrl && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[3px]"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {c.livePreview}
                  </span>
                  <a
                    href={currentCase.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] tracking-[1px] transition-opacity hover:opacity-70"
                    style={{ color: currentCase.accentColor }}
                  >
                    {c.openNewTab} ↗
                  </a>
                </div>

                {/* Mobile: just a button */}
                {isMobile ? (
                  <a
                    href={currentCase.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:opacity-90 rounded-sm"
                    style={{
                      background: currentCase.accentColor,
                      color: 'var(--bg-primary)',
                    }}
                  >
                    {c.viewProject} →
                  </a>
                ) : (
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      border: '1px solid var(--border-subtle)',
                      height: '500px',
                    }}
                  >
                    {/* Loading skeleton */}
                    {!iframeLoaded && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'var(--bg-secondary)' }}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full border-2 animate-spin"
                            style={{
                              borderColor: 'var(--border-subtle)',
                              borderTopColor: currentCase.accentColor,
                            }}
                          />
                          <span className="font-mono text-[11px]" style={{ color: 'var(--text-ghost)' }}>
                            {t.loading}
                          </span>
                        </div>
                      </div>
                    )}
                    <iframe
                      src={currentCase.previewUrl}
                      className="w-full h-full border-0"
                      onLoad={() => setIframeLoaded(true)}
                      title={`${currentCase.title} preview`}
                      loading="lazy"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
