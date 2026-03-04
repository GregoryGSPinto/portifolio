'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { certifications, continuousLearning } from '@/lib/data';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Certifications() {
  const { language } = useLanguage();
  const t = translations[language].certifications;

  return (
    <section id="certifications" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="08" label={t.label} />

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

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
          {/* Left: Certifications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col gap-3"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 md:p-6 rounded-md transition-all duration-300 group"
                style={{
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--card-bg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="font-body text-[16px] font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {cert.name}
                      </h3>
                      <span
                        className="font-mono text-[10px] uppercase tracking-[1px] px-2.5 py-1 rounded-sm shrink-0"
                        style={{
                          background: cert.status === 'in-progress'
                            ? 'rgba(245, 158, 11, 0.1)'
                            : 'rgba(34, 197, 94, 0.1)',
                          color: cert.status === 'in-progress'
                            ? '#f59e0b'
                            : '#22c55e',
                          border: `1px solid ${cert.status === 'in-progress'
                            ? 'rgba(245, 158, 11, 0.2)'
                            : 'rgba(34, 197, 94, 0.2)'}`,
                        }}
                      >
                        {cert.status === 'in-progress' ? t.statusInProgress : t.statusCompleted}
                      </span>
                    </div>
                    <p
                      className="font-body text-[13px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {cert.issuer[language]}
                    </p>
                  </div>
                  <span
                    className="font-mono text-[12px] shrink-0"
                    style={{ color: 'var(--accent)' }}
                  >
                    {cert.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Continuous Learning */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[11px] uppercase tracking-[3px] mb-6"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {t.continuousTitle}
            </motion.h3>

            <div className="flex flex-col">
              {continuousLearning.map((topic) => (
                <motion.div
                  key={topic.en}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 py-2"
                >
                  <div
                    className="w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span
                    className="font-body text-[14px] leading-[1.6]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {topic[language]}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Banner */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[12px] italic mt-8 pt-6"
              style={{
                color: 'var(--text-tertiary)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {t.banner}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
