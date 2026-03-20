'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
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
  const { t: root } = useLang();
  const t = root.contact;

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="10" label={t.label} />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20">
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
                fontSize: 'clamp(28px, 5vw, 64px)',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
              }}
            >
              {t.title}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-[15px] leading-[1.8] mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t.desc}
            </motion.p>

            <motion.a
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              href="mailto:gregoryguimaraes12@outlook.com"
              className="inline-block font-mono text-[12px] uppercase tracking-[2px] px-9 py-3.5 transition-all duration-300 hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
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
                style={{ borderBottom: '1px solid var(--link-border)' }}
              >
                <span
                  className="font-mono text-[11px] uppercase tracking-[3px] transition-colors duration-300 group-hover:text-accent shrink-0"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {link.label}
                </span>
                <span
                  className="font-body text-[13px] md:text-[14px] transition-colors duration-300 group-hover:text-accent text-right break-all sm:break-normal"
                  style={{ color: 'var(--text-secondary)' }}
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
