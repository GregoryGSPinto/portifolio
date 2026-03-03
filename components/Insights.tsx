'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Insights() {
  const { language } = useLanguage();
  const t = translations[language].insights;

  return (
    <section id="insights" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="09" label={t.label} />

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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center rounded-lg px-5 py-12 sm:px-12 sm:py-20"
          style={{
            border: '1px solid var(--insight-border)',
            background: 'var(--insight-bg)',
          }}
        >
          <span
            className="font-display text-3xl sm:text-4xl block mb-6"
            style={{ color: 'var(--insight-symbol)' }}
          >
            ✦
          </span>
          <p
            className="font-mono text-[13px]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {t.placeholder}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
