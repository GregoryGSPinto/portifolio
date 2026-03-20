'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { projectCategories, type CategoryFilter } from '@/lib/data/projects';

interface FilterTabsProps {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

export default function FilterTabs({ active, onChange }: FilterTabsProps) {
  const { lang } = useLang();

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: 'var(--card-bg)' }}>
      {projectCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className="relative font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-colors duration-200"
          style={{
            color: active === cat.id ? 'var(--bg-primary)' : 'var(--text-tertiary)',
          }}
        >
          {active === cat.id && (
            <motion.div
              layoutId="filter-tab-indicator"
              className="absolute inset-0 rounded-lg"
              style={{ background: 'var(--accent)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label[lang]}</span>
        </button>
      ))}
    </div>
  );
}
