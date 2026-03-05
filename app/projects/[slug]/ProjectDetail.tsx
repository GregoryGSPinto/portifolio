'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import type { Project } from '@/lib/data/projects';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const numericPart = parseInt(value, 10);
    const suffix = value.replace(/^\d+/, '');
    if (isNaN(numericPart)) {
      if (ref.current) ref.current.textContent = value;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, numericPart, {
            duration: 2,
            ease: 'easeOut',
            onUpdate: (v) => {
              if (ref.current) ref.current.textContent = Math.round(v) + suffix;
            },
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      className="text-center p-6 rounded-xl"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
    >
      <span
        ref={ref}
        className="font-mono text-3xl md:text-4xl font-bold block mb-2"
        style={{ color: 'var(--accent)' }}
      >
        0
      </span>
      <span
        className="font-mono text-[11px] uppercase tracking-widest"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {label}
      </span>
    </div>
  );
}

function AccordionCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200"
        style={{ color: 'var(--text-primary)' }}
      >
        <span className="font-display text-base font-semibold pr-4">{title}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-xl"
          style={{ color: 'var(--accent)' }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p
          className="px-5 pb-5 font-body text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

function SectionBlock({
  label,
  title,
  children,
  index,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="mb-16"
    >
      <div className="flex items-center gap-4 mb-6">
        <span
          className="font-mono text-[11px] tracking-[3px] uppercase"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </span>
        <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
      </div>
      <h3
        className="font-display text-2xl md:text-3xl font-bold mb-6"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const { lang } = useLang();

  const sections = [
    {
      key: 'challenge',
      label: lang === 'pt' ? 'O Desafio' : 'The Challenge',
      content: project.challenge?.[lang],
    },
    {
      key: 'approach',
      label: lang === 'pt' ? 'Abordagem' : 'Approach',
      content: project.approach?.[lang],
    },
    {
      key: 'architecture',
      label: lang === 'pt' ? 'Arquitetura' : 'Architecture',
      content: project.architecture?.[lang],
    },
    {
      key: 'results',
      label: lang === 'pt' ? 'Resultados' : 'Results',
      content: project.results?.[lang],
    },
  ];

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30`} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.3,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
        />

        <div className="relative mx-auto max-w-4xl px-6">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#cases"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-12 transition-colors duration-200"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {lang === 'pt' ? 'Voltar' : 'Back'}
            </Link>
          </motion.div>

          {/* Category */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block font-mono text-[10px] uppercase tracking-[3px] px-3 py-1 rounded mb-6"
            style={{
              background: 'var(--tag-bg)',
              border: '1px solid var(--tag-border)',
              color: 'var(--accent)',
            }}
          >
            {project.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-body text-xl md:text-2xl mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.subtitle[lang]}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="font-body text-base md:text-lg leading-relaxed max-w-3xl mb-10"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {project.description[lang]}
          </motion.p>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {lang === 'pt' ? 'Ver Projeto' : 'View Project'}
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {lang === 'pt' ? 'Ver Codigo' : 'View Source'}
              </a>
            )}
            {project.timeline && (
              <span
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3"
                style={{ color: 'var(--text-ghost)' }}
              >
                {project.timeline[lang]}
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 4)}, 1fr)`,
            }}
          >
            {project.metrics.map((metric, i) => (
              <motion.div
                key={metric.label[lang]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <AnimatedMetric
                  value={metric.value}
                  label={metric.label[lang]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-4xl px-6">
          {sections.map(
            (sec, i) =>
              sec.content && (
                <SectionBlock key={sec.key} label={sec.label} title={sec.label} index={i}>
                  <p
                    className="font-body text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {sec.content}
                  </p>
                </SectionBlock>
              ),
          )}
        </div>
      </section>

      {/* Technical Decisions */}
      {project.decisions && project.decisions.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-6">
            <SectionBlock
              label={lang === 'pt' ? 'Decisoes Tecnicas' : 'Technical Decisions'}
              title={lang === 'pt' ? 'Decisoes Tecnicas' : 'Technical Decisions'}
              index={0}
            >
              <div className="space-y-3">
                {project.decisions.map((decision, i) => (
                  <AccordionCard
                    key={decision.title[lang]}
                    title={decision.title[lang]}
                    description={decision.description[lang]}
                    index={i}
                  />
                ))}
              </div>
            </SectionBlock>
          </div>
        </section>
      )}

      {/* Stack */}
      <section className="py-8 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionBlock
            label={lang === 'pt' ? 'Stack' : 'Stack'}
            title={lang === 'pt' ? 'Tecnologias Utilizadas' : 'Technologies Used'}
            index={0}
          >
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="font-mono text-sm px-4 py-2 rounded-lg"
                  style={{
                    background: 'var(--tag-bg)',
                    border: '1px solid var(--tag-border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </SectionBlock>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Link
            href="/#cases"
            className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              border: '1px solid var(--border-hover)',
              color: 'var(--accent)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {lang === 'pt' ? 'Ver Todos os Projetos' : 'View All Projects'}
          </Link>
        </div>
      </section>
    </main>
  );
}
