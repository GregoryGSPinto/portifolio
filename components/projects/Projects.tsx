'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SectionLabel from '@/components/SectionLabel';
import FilterTabs from './FilterTabs';
import ProjectCard from './ProjectCard';
import { useLang } from '@/context/LangContext';
import { projects, getLeadProject, getProjectsByCategory, type CategoryFilter } from '@/lib/data/projects';

interface ProjectsProps {
  mode?: 'home' | 'page';
}

export default function Projects({ mode = 'home' }: ProjectsProps) {
  const { lang } = useLang();
  const [category, setCategory] = useState<CategoryFilter>('all');
  const filtered = getProjectsByCategory(category);
  const leadProject = category === 'all' ? getLeadProject() : undefined;
  const gridProjects = leadProject ? filtered.filter((project) => project.slug !== leadProject.slug) : filtered;
  const isStandalonePage = mode === 'page';

  return (
    <section
      id="projects"
      className={`relative ${isStandalonePage ? 'pt-32 pb-24 md:pt-40 md:pb-32' : 'py-32 md:py-40'}`}
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel number="02" label={lang === 'pt' ? 'Projetos' : 'Projects'} />

        {isStandalonePage ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-3xl">
              <h1
                className="font-display text-4xl font-bold leading-[1.05] md:text-6xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {lang === 'pt' ? 'Arquitetura, produto e operacao em casos reais' : 'Architecture, product, and operations in real cases'}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'pt'
                  ? 'Uma visao completa dos cases do portfolio, com contexto, papel exercido, escolhas de arquitetura e trade-offs de implementacao.'
                  : 'A complete view of the portfolio case studies, including context, role, architectural choices, and implementation trade-offs.'}
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 self-start rounded-xl px-5 py-3 font-mono text-xs uppercase tracking-[2px] transition-transform duration-300 hover:scale-[1.02]"
              style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              {lang === 'pt' ? 'Conversar sobre arquitetura' : 'Discuss architecture'}
            </Link>
          </motion.div>
        ) : null}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl font-bold leading-[1.1] mb-6 whitespace-pre-line"
          style={{ color: 'var(--text-primary)' }}
        >
          {lang === 'pt' ? 'Cases com\nsubstancia tecnica' : 'Case studies with\ntechnical substance'}
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
            ? 'Cada projeto abaixo explicita contexto, papel exercido, arquitetura escolhida e os trade-offs que sustentam a solucao.'
            : 'Each project below makes the context, role, chosen architecture, and the trade-offs supporting the solution explicit.'}
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
            className="space-y-6"
          >
            {leadProject ? (
              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[3px]"
                    style={{ color: 'var(--accent)' }}
                  >
                    {lang === 'pt' ? 'Case em destaque' : 'Featured case'}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[3px]"
                    style={{ color: 'var(--text-ghost)' }}
                  >
                    {lang === 'pt' ? 'Arquitetura aplicada a operacao complexa' : 'Architecture applied to complex operations'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProjectCard project={leadProject} index={0} />
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gridProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={leadProject ? i + 1 : i} />
              ))}
            </div>
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
