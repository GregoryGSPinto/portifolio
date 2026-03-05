'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
}

export default function SectionHeader({ number, label, title }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 mb-6"
      >
        <span
          className="font-mono text-[11px] tracking-[3px] uppercase"
          style={{ color: 'var(--accent)' }}
        >
          {number}
        </span>
        <div className="w-[40px] h-px" style={{ background: 'var(--border-subtle)' }} />
        <span
          className="font-mono text-[11px] tracking-[3px] uppercase"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {label}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-light whitespace-pre-line"
        style={{
          fontSize: 'clamp(28px, 5vw, 64px)',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
