'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Vision() {
  const { t } = useLang();
  const v = t.vision;

  return (
    <section id="vision" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="01" label={v.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-12 md:mb-20 whitespace-pre-line"
          style={{
            fontSize: 'clamp(28px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          {v.title}
        </motion.h2>

        {/* Two-column paragraphs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-16 md:mb-24"
        >
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[15px] leading-[1.8]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {v.p1}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[15px] leading-[1.8]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {v.p2}
          </motion.p>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--pillar-gap-bg)' }}
        >
          {v.pillars.map((pillar) => (
            <motion.div
              key={pillar.number}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="p-8 md:py-12 md:px-9 cursor-default transition-colors duration-300 group"
              style={{ background: 'var(--bg-primary)' }}
            >
              <span
                className="font-display text-5xl font-light block mb-6 transition-colors duration-300 group-hover:text-accent"
                style={{ color: 'var(--pillar-number)' }}
              >
                {pillar.number}
              </span>
              <h3
                className="font-body text-lg font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-body text-[13px] leading-relaxed"
                style={{ color: 'var(--text-tertiary)' }}
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
