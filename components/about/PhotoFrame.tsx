'use client';

import { motion } from 'framer-motion';

export default function PhotoFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
    >
      {/* Dashed border ring */}
      <motion.div
        whileHover={{ rotate: 8, scale: 1.03 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full border-2 border-dashed"
        style={{ borderColor: 'var(--accent)' }}
      />

      {/* Gradient circle with initials */}
      <div
        className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--accent), rgba(110, 231, 183, 0.3))',
        }}
      >
        <span
          className="font-display text-5xl md:text-6xl lg:text-7xl font-light select-none"
          style={{ color: 'var(--bg-primary)' }}
        >
          GG
        </span>
      </div>

      {/* Subtle glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 -z-10"
        style={{ background: 'var(--accent)' }}
      />
    </motion.div>
  );
}
