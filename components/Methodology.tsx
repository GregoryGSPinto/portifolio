'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { methodologySteps } from '@/lib/data';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Methodology() {
  const { language } = useLanguage();
  const t = translations[language].methodology;

  return (
    <section id="methodology" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="03" label={t.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-6 whitespace-pre-line"
          style={{
            fontSize: 'clamp(28px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-body text-[15px] leading-[1.8] mb-12 md:mb-20 max-w-[640px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t.desc}
        </motion.p>

        {/* Desktop: Horizontal Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="hidden md:block relative"
        >
          {/* Connecting line */}
          <div
            className="absolute top-[5px] left-0 right-0 h-px"
            style={{ background: 'var(--accent)', opacity: 0.15 }}
          />

          <div className="grid grid-cols-5 gap-4 lg:gap-6">
            {methodologySteps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-default"
              >
                {/* Dot */}
                <div
                  className="w-[10px] h-[10px] rounded-full mb-6 transition-all duration-300 group-hover:scale-125"
                  style={{
                    border: '2px solid var(--border-hover)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 0 16px var(--accent-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                {/* Number */}
                <span
                  className="font-mono text-[10px] block mb-2"
                  style={{ color: 'var(--accent)' }}
                >
                  {step.number}
                </span>

                {/* Title */}
                <h3
                  className="font-body text-[16px] font-semibold mb-3 transition-colors duration-300 group-hover:text-accent"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title[language]}
                </h3>

                {/* Description */}
                <p
                  className="font-body text-[13px] leading-[1.7] mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {step.desc[language]}
                </p>

                {/* Deliverables tag */}
                <span
                  className="inline-block font-mono text-[10px] px-3 py-1.5 rounded-sm mt-1"
                  style={{
                    background: 'var(--tag-bg)',
                    border: '1px solid var(--tag-border)',
                    color: 'var(--accent)',
                  }}
                >
                  {step.deliverables[language]}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: Vertical Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="md:hidden relative"
        >
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 left-[4px] w-px"
            style={{ background: 'var(--accent)', opacity: 0.15 }}
          />

          <div className="flex flex-col gap-8">
            {methodologySteps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[20px_1fr] gap-4"
              >
                {/* Dot */}
                <div className="flex justify-center pt-1">
                  <div
                    className="w-[9px] h-[9px] rounded-full shrink-0"
                    style={{
                      border: '2px solid var(--border-hover)',
                      background: 'var(--accent)',
                      boxShadow: '0 0 8px var(--accent-glow)',
                    }}
                  />
                </div>

                {/* Content */}
                <div>
                  <span
                    className="font-mono text-[10px] block mb-1"
                    style={{ color: 'var(--accent)' }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="font-body text-[15px] font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {step.title[language]}
                  </h3>
                  <p
                    className="font-body text-[13px] leading-[1.7] mb-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {step.desc[language]}
                  </p>
                  <span
                    className="inline-block font-mono text-[10px] px-3 py-1.5 rounded-sm"
                    style={{
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--tag-border)',
                      color: 'var(--accent)',
                    }}
                  >
                    {step.deliverables[language]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
