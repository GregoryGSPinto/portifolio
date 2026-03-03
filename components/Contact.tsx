'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { contactLinks } from '@/lib/data';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section id="contact" className="py-40 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="07" label={t.label} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light mb-8 whitespace-pre-line"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.1,
                color: '#E8E4DE',
              }}
            >
              {t.title}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[15px] leading-[1.8] mb-10"
              style={{ color: 'rgba(232, 228, 222, 0.4)' }}
            >
              {t.desc}
            </motion.p>

            <motion.a
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              href="mailto:gregoryguimaraes12@outlook.com"
              className="inline-block font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:opacity-90"
              style={{
                background: '#C9A84C',
                color: '#0A0A0B',
                borderRadius: '2px',
              }}
            >
              {t.cta}
            </motion.a>
          </motion.div>

          {/* Right: Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col"
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                href={link.href}
                target={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : '_blank'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between py-5 transition-all duration-300 hover:pl-3 group"
                style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}
              >
                <span
                  className="font-mono text-[11px] uppercase tracking-[3px] transition-colors duration-300 group-hover:text-accent"
                  style={{ color: 'rgba(232, 228, 222, 0.25)' }}
                >
                  {link.label}
                </span>
                <span
                  className="font-body text-[14px] transition-colors duration-300 group-hover:text-accent"
                  style={{ color: 'rgba(232, 228, 222, 0.5)' }}
                >
                  {link.value}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
