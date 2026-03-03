'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { timelineItems } from '@/lib/data';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Timeline() {
  const { language } = useLanguage();
  const t = translations[language].timeline;

  return (
    <section id="journey" className="py-40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="05" label={t.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-20 whitespace-pre-line"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.1,
            color: '#E8E4DE',
          }}
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col"
        >
          {timelineItems.map((item) => (
            <motion.div
              key={item.year}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[80px_1px_1fr] md:grid-cols-[120px_1px_1fr] gap-6 md:gap-10 py-10"
              style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}
            >
              {/* Year */}
              <div className="text-right flex items-start justify-end pt-1">
                <span
                  className="font-display text-2xl md:text-3xl font-light"
                  style={{
                    color: item.highlight ? '#C9A84C' : 'rgba(232, 228, 222, 0.15)',
                  }}
                >
                  {item.year}
                </span>
              </div>

              {/* Vertical line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-[9px] h-[9px] rounded-full shrink-0 mt-2"
                  style={{
                    background: item.highlight ? '#C9A84C' : 'rgba(232, 228, 222, 0.15)',
                    boxShadow: item.highlight ? '0 0 16px rgba(201, 168, 76, 0.4)' : 'none',
                  }}
                />
                <div
                  className="w-px flex-1 mt-2"
                  style={{ background: 'rgba(201, 168, 76, 0.15)' }}
                />
              </div>

              {/* Content */}
              <div>
                <h3
                  className="font-body text-lg font-semibold mb-1"
                  style={{ color: '#E8E4DE' }}
                >
                  {item.role[language]}
                </h3>
                <span
                  className="font-mono text-[11px] uppercase tracking-[2px] block mb-4"
                  style={{ color: 'rgba(232, 228, 222, 0.25)' }}
                >
                  {item.company[language]}
                </span>
                <p
                  className="font-body text-[14px] leading-[1.7]"
                  style={{ color: 'rgba(232, 228, 222, 0.35)' }}
                >
                  {item.desc[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
