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

export default function AIExperience() {
  const { language } = useLanguage();
  const t = translations[language].ai;

  const handleOpenChatbot = () => {
    window.dispatchEvent(new Event('open-chatbot'));
  };

  return (
    <section id="ai" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="05" label={t.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-8 whitespace-pre-line"
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
          className="font-body text-[15px] leading-[1.8] mb-16 max-w-[640px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t.desc}
        </motion.p>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16"
          style={{ background: 'var(--pillar-gap-bg)' }}
        >
          {t.cards.map((card) => (
            <motion.div
              key={card.number}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="p-8 md:py-10 md:px-8 cursor-default transition-colors duration-300 group"
              style={{ background: 'var(--bg-primary)' }}
            >
              <span
                className="font-display text-[40px] font-light block mb-4 transition-colors duration-300 group-hover:text-accent"
                style={{ color: 'var(--pillar-number)' }}
              >
                {card.number}
              </span>
              <h3
                className="font-body text-[17px] font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {card.title}
              </h3>
              <p
                className="font-body text-[13px] leading-relaxed mb-5"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {card.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-sm"
                    style={{
                      background: 'var(--tag-bg)',
                      border: '1px solid var(--tag-border)',
                      color: 'var(--accent)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:px-10 md:py-7 rounded-lg"
          style={{
            border: '1px solid var(--border-hover)',
            background: 'var(--card-bg)',
          }}
        >
          <p
            className="font-body text-[14px] text-center sm:text-left"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t.cta}
          </p>
          <button
            onClick={handleOpenChatbot}
            className="shrink-0 font-mono text-[12px] uppercase tracking-[2px] px-7 py-3 rounded-sm transition-all duration-300 hover:opacity-90"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg-primary)',
            }}
          >
            {t.ctaButton}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
