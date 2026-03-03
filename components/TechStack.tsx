'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { techStack } from '@/lib/data';
import { useIntersectionObserver } from '@/lib/hooks';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function SkillBar({ name, level, isVisible }: { name: string; level: number; isVisible: boolean }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span
        className="font-mono text-[12px] sm:text-[13px] shrink-0"
        style={{ minWidth: '100px', color: 'var(--text-secondary)' }}
      >
        {name}
      </span>
      <div className="flex-1 h-[3px] rounded-full" style={{ background: 'var(--skill-bar-bg)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: isVisible ? `${level}%` : '0%',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
      <span
        className="font-mono text-[11px] shrink-0 w-8 text-right"
        style={{ color: 'var(--accent)' }}
      >
        {level}
      </span>
    </div>
  );
}

export default function TechStack() {
  const { language } = useLanguage();
  const t = translations[language].stack;
  const [ref, isVisible] = useIntersectionObserver(0.2);

  const categories = Object.entries(techStack) as [keyof typeof techStack, (typeof techStack)[keyof typeof techStack]][];

  return (
    <section id="stack" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12" ref={ref}>
        <SectionLabel number="05" label={t.label} />

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
          {t.title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
        >
          {categories.map(([key, category]) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                className="font-mono text-[11px] uppercase tracking-[3px] mb-6 md:mb-8"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {category.label[language]}
              </h3>
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
