'use client';

import { motion } from 'framer-motion';

interface SectionLabelProps {
  number: string;
  label: string;
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 mb-12"
    >
      <span
        className="font-mono text-[11px] tracking-[3px] uppercase"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {number}
      </span>
      <div className="w-[40px] h-px" style={{ background: 'var(--scroll-line)' }} />
      <span
        className="font-mono text-[11px] tracking-[3px] uppercase"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
