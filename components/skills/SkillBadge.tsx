'use client';

import { motion } from 'framer-motion';
import type { SkillLevel } from '@/lib/data/skills';
import { skillLevelLabels } from '@/lib/data/skills';

interface SkillBadgeProps {
  name: string;
  level: SkillLevel;
  items: string[];
  lang: 'pt' | 'en';
  index: number;
}

const levelStyles: Record<SkillLevel, { bg: string; text: string; border: string }> = {
  production: {
    bg: 'var(--accent)',
    text: 'var(--bg-primary)',
    border: 'var(--accent)',
  },
  advanced: {
    bg: 'transparent',
    text: 'var(--accent)',
    border: 'var(--accent)',
  },
  intermediate: {
    bg: 'transparent',
    text: 'var(--text-tertiary)',
    border: 'var(--border-subtle)',
  },
  familiar: {
    bg: 'transparent',
    text: 'var(--text-tertiary)',
    border: 'var(--border-subtle)',
  },
};

export default function SkillBadge({ name, level, items, lang, index }: SkillBadgeProps) {
  const style = levelStyles[level];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="font-mono text-[13px] font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {name}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[1px] px-2 py-0.5 rounded-sm"
          style={{
            background: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
          }}
        >
          {skillLevelLabels[level][lang]}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{
              color: 'var(--text-tertiary)',
              background: 'var(--skill-bar-bg)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
