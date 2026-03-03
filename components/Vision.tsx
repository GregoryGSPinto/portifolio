'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Vision() {
  const { language } = useLanguage();
  const t = translations[language].vision;

  return (
    <section id="vision" className="py-40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="01" label={t.label} />

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

        {/* Two-column paragraphs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-24"
        >
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[15px] leading-[1.8]"
            style={{ color: 'rgba(232, 228, 222, 0.4)' }}
          >
            {t.p1}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[15px] leading-[1.8]"
            style={{ color: 'rgba(232, 228, 222, 0.4)' }}
          >
            {t.p2}
          </motion.p>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        >
          {t.pillars.map((pillar) => (
            <motion.div
              key={pillar.number}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="p-12 md:py-12 md:px-9 cursor-default transition-colors duration-300 group"
              style={{ background: '#0A0A0B' }}
            >
              <span
                className="font-display text-5xl font-light block mb-6 transition-colors duration-300 group-hover:text-accent"
                style={{ color: 'rgba(201, 168, 76, 0.15)' }}
              >
                {pillar.number}
              </span>
              <h3
                className="font-body text-lg font-bold mb-3"
                style={{ color: '#E8E4DE' }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-body text-[13px] leading-relaxed"
                style={{ color: 'rgba(232, 228, 222, 0.35)' }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
