'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import SectionLabel from '@/components/SectionLabel';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const { t: root } = useLang();
  const t = root.contact;

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="05" label={t.label} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light mb-4 whitespace-pre-line"
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

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 sm:grid-cols-2 mb-10"
            >
              {t.trustPoints.map((item: string) => (
                <div
                  key={item}
                  className="rounded-2xl border p-4 text-sm"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    background: 'var(--card-bg)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ContactForm />
            </motion.div>
          </motion.div>

          {/* Right: Social Links */}
          <div className="lg:pt-20">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
