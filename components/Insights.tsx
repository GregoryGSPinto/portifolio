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
    <section id="insights" className="py-40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="06" label={t.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-16 whitespace-pre-line"
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
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center rounded-lg"
          style={{
            border: '1px solid rgba(201, 168, 76, 0.1)',
            background: 'rgba(201, 168, 76, 0.02)',
            padding: '80px 48px',
          }}
        >
          <span
            className="font-display text-4xl block mb-6"
            style={{ color: 'rgba(201, 168, 76, 0.2)' }}
          >
            ✦
          </span>
          <p
            className="font-mono text-[13px]"
            style={{ color: 'rgba(232, 228, 222, 0.35)' }}
          >
            {t.placeholder}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
