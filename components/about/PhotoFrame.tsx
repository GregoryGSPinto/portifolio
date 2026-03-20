'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PhotoFrame() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-center justify-center"
    >
      {/* Dashed border ring */}
      <motion.div
        whileHover={{ rotate: 8, scale: 1.03 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full border-2 border-dashed"
        style={{ borderColor: 'var(--accent)' }}
      />

      {/* Photo circle */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden">
        <Image
          src="/images/gregory-photo.png"
          alt="Gregory Guimaraes"
          width={288}
          height={288}
          priority
          className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
      </div>

      {/* Subtle glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10"
        style={{ background: 'var(--accent)' }}
      />
    </motion.div>
  );
}
