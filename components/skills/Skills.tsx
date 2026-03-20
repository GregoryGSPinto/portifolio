'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import SectionLabel from '@/components/SectionLabel';
import SkillBadge from './SkillBadge';
import { skillCategories } from '@/lib/data/skills';

export default function Skills() {
  const { t, lang } = useLang();

  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel number="03" label={t.skills.label} />

        <motion.h2
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight mb-16 whitespace-pre-line"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-outfit)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.skills.title}
        </motion.h2>

        <div className="space-y-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: catIdx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="font-mono text-[12px] tracking-[3px] uppercase"
                  style={{ color: 'var(--accent)' }}
                >
                  {category.label[lang]}
                </h3>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {category.skills.length} {lang === 'pt' ? 'skills' : 'skills'}
                </span>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    items={skill.items}
                    lang={lang}
                    index={skillIdx}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
