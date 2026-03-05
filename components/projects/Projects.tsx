'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';
import FilterTabs from './FilterTabs';
import ProjectCard from './ProjectCard';
import { useLang } from '@/context/LangContext';
import { projects, getProjectsByCategory, type CategoryFilter } from '@/lib/data/projects';

export default function Projects() {
  const { lang } = useLang();
  const [category, setCategory] = useState<CategoryFilter>('all');
  const filtered = getProjectsByCategory(category);

  return (
    <section
      id="cases"
      className="relative py-32 md:py-40"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel
          number="04"
          label={lang === 'pt' ? 'Projetos' : 'Projects'}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl font-bold leading-[1.1] mb-6 whitespace-pre-line"
          style={{ color: 'var(--text-primary)' }}
        >
          {lang === 'pt' ? 'Impacto\nMensuravel' : 'Measurable\nImpact'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-base md:text-lg max-w-2xl mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {lang === 'pt'
            ? 'Projetos reais com arquitetura robusta, testes extensivos e impacto mensuravel.'
            : 'Real projects with robust architecture, extensive testing and measurable impact.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <FilterTabs active={category} onChange={setCategory} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Total projects counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <span
            className="font-mono text-xs uppercase tracking-wider"
            style={{ color: 'var(--text-ghost)' }}
          >
            {projects.length} {lang === 'pt' ? 'projetos' : 'projects'}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
