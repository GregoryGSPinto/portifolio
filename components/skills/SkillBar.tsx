'use client';

import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  level: number;
  items: string[];
  index: number;
}

export default function SkillBar({ name, level, items, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="font-mono text-[13px] font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {name}
        </span>
        <motion.span
          className="font-mono text-[12px] tabular-nums"
          style={{ color: 'var(--accent)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
        >
          {level}%
        </motion.span>
      </div>

      <div
        className="relative h-[6px] rounded-full overflow-hidden"
        style={{ background: 'var(--skill-bar-bg)' }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
          }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 1.2,
            delay: index * 0.1 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2">
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
