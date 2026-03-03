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
        style={{ color: 'rgba(232, 228, 222, 0.25)' }}
      >
        {number}
      </span>
      <div className="w-[40px] h-px" style={{ background: 'rgba(201, 168, 76, 0.3)' }} />
      <span
        className="font-mono text-[11px] tracking-[3px] uppercase"
        style={{ color: 'rgba(232, 228, 222, 0.25)' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
