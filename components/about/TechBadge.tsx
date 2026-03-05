'use client';

import { motion } from 'framer-motion';

interface TechBadgeProps {
  name: string;
  icon: React.ReactNode;
}

export default function TechBadge({ name, icon }: TechBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors duration-200 cursor-default"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'var(--card-bg)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--accent-glow)';
        e.currentTarget.style.borderColor = 'var(--border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--card-bg)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      <span className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent)' }}>
        {icon}
      </span>
      <span
        className="font-mono text-xs tracking-wide"
        style={{ color: 'var(--text-secondary)' }}
      >
        {name}
      </span>
    </motion.div>
  );
}
