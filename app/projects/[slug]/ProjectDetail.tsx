'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CaseStudyJsonLd } from '@/components/seo/JsonLd';
import { useLang } from '@/context/LangContext';
import { absoluteUrl } from '@/lib/site';
import { getRelatedProjects, type Project } from '@/lib/data/projects';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const numericPart = parseInt(value, 10);
    const suffix = value.replace(/^\d+/, '');

    if (Number.isNaN(numericPart)) {
      ref.current.textContent = value;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, numericPart, {
            duration: 2,
            ease: 'easeOut',
            onUpdate: (current) => {
              if (ref.current) ref.current.textContent = Math.round(current) + suffix;
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
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200"
        style={{ color: 'var(--text-primary)' }}
        aria-expanded={open}
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
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 font-body text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const { lang } = useLang();
  const relatedProjects = getRelatedProjects(project);
  const sections = [
    {
      key: 'challenge',
      label: lang === 'pt' ? 'Problema' : 'Problem',
      content: project.challenge?.[lang],
    },
    {
      key: 'approach',
      label: lang === 'pt' ? 'Solucao' : 'Solution',
      content: project.approach?.[lang],
    },
    {
      key: 'architecture',
      label: lang === 'pt' ? 'Arquitetura' : 'Architecture',
      content: project.architecture?.[lang],
    },
    {
      key: 'results',
      label: lang === 'pt' ? 'Resultado' : 'Outcome',
      content: project.results?.[lang],
    },
  ];

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <CaseStudyJsonLd
        name={`${project.title} case study`}
        description={project.description.en}
        url={absoluteUrl(`/projects/${project.slug}`)}
        keywords={project.stack}
      />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
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

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/projects"
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
            {project.categoryLabel[lang]}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-body text-xl md:text-2xl mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.subtitle[lang]}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="font-body text-base md:text-lg leading-relaxed max-w-3xl mb-10"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {project.description[lang]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.27, duration: 0.6 }}
            className="grid gap-4 md:grid-cols-2 mb-10"
          >
            <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border-subtle)', background: 'var(--card-bg)' }}>
              <p className="font-mono text-[11px] uppercase tracking-[2px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {lang === 'pt' ? 'Contexto' : 'Context'}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.context[lang]}
              </p>
            </div>
            <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border-subtle)', background: 'var(--card-bg)' }}>
              <p className="font-mono text-[11px] uppercase tracking-[2px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {lang === 'pt' ? 'Papel exercido' : 'Role'}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.role[lang]}
              </p>
            </div>
          </motion.div>

          {project.image ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="relative w-full aspect-video rounded-xl overflow-hidden mb-10"
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1000px"
              />
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                {lang === 'pt' ? 'Ver Projeto' : 'View Project'}
              </a>
            ) : null}
            {project.timeline ? (
              <span
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3"
                style={{ color: 'var(--text-ghost)' }}
              >
                {project.timeline[lang]}
              </span>
            ) : null}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 md:grid-cols-4">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={metric.label[lang]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AnimatedMetric value={metric.value} label={metric.label[lang]} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-6">
          {sections.map(
            (section, index) =>
              section.content ? (
                <SectionBlock key={section.key} label={section.label} title={section.label} index={index}>
                  <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {section.content}
                  </p>
                </SectionBlock>
              ) : null,
          )}
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-6">
          <SectionBlock
            label={lang === 'pt' ? 'Provas do case' : 'Case proof'}
            title={lang === 'pt' ? 'O que torna este case confiavel' : 'What makes this case credible'}
            index={0}
          >
            <div className="grid gap-4 md:grid-cols-3">
              {project.highlights.map((highlight, index) => (
                <motion.article
                  key={highlight.title[lang]}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={sectionVariants}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
                >
                  <h4 className="font-display text-lg mb-3" style={{ color: 'var(--text-primary)' }}>
                    {highlight.title[lang]}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {highlight.description[lang]}
                  </p>
                </motion.article>
              ))}
            </div>
          </SectionBlock>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-6">
          <SectionBlock
            label="Trade-offs"
            title={lang === 'pt' ? 'Decisoes e concessoes' : 'Decisions and trade-offs'}
            index={0}
          >
            <div className="space-y-4">
              {project.tradeoffs.map((tradeoff) => (
                <div
                  key={tradeoff.title[lang]}
                  className="rounded-xl p-5"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
                >
                  <h4 className="font-display text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                    {tradeoff.title[lang]}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {tradeoff.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </SectionBlock>
        </div>
      </section>

      {project.decisions && project.decisions.length > 0 ? (
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-5xl px-6">
            <SectionBlock
              label={lang === 'pt' ? 'Decisoes tecnicas' : 'Technical decisions'}
              title={lang === 'pt' ? 'Decisoes tecnicas' : 'Technical decisions'}
              index={0}
            >
              <div className="space-y-3">
                {project.decisions.map((decision, index) => (
                  <AccordionCard
                    key={decision.title[lang]}
                    title={decision.title[lang]}
                    description={decision.description[lang]}
                    index={index}
                  />
                ))}
              </div>
            </SectionBlock>
          </div>
        </section>
      ) : null}

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-6">
          <SectionBlock
            label="Stack"
            title={lang === 'pt' ? 'Stack principal' : 'Primary stack'}
            index={0}
          >
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-3 py-1.5 font-mono text-[11px]"
                  style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', color: 'var(--accent)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </SectionBlock>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-6">
          <SectionBlock
            label={lang === 'pt' ? 'Links externos' : 'External links'}
            title={lang === 'pt' ? 'Onde explorar o projeto' : 'Where to explore the project'}
            index={0}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl p-5 transition-colors duration-200 hover:border-[var(--border-hover)]"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
                >
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[2px]" style={{ color: 'var(--accent)' }}>
                    {lang === 'pt' ? 'Deploy publico' : 'Public deployment'}
                  </p>
                  <h4 className="mb-2 font-display text-lg" style={{ color: 'var(--text-primary)' }}>
                    {lang === 'pt' ? 'Ver Projeto' : 'View Project'}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {project.links.live}
                  </p>
                </a>
              ) : null}
            </div>
          </SectionBlock>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-5xl px-6">
            <SectionBlock
              label={lang === 'pt' ? 'Continuidade' : 'Continue exploring'}
              title={lang === 'pt' ? 'Outros cases conectados' : 'Related case studies'}
              index={0}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.slug}
                    href={`/projects/${relatedProject.slug}`}
                    className="rounded-2xl p-5 transition-colors duration-200 hover:border-[var(--border-hover)]"
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
                  >
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[2px]" style={{ color: 'var(--accent)' }}>
                      {relatedProject.categoryLabel[lang]}
                    </p>
                    <h4 className="mb-2 font-display text-xl" style={{ color: 'var(--text-primary)' }}>
                      {relatedProject.title}
                    </h4>
                    <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {relatedProject.outcomeSummary[lang]}
                    </p>
                    <span className="font-mono text-[11px] uppercase tracking-[2px]" style={{ color: 'var(--accent)' }}>
                      {lang === 'pt' ? 'Abrir case' : 'Open case'}
                    </span>
                  </Link>
                ))}
              </div>
            </SectionBlock>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'pt'
              ? 'Se este case faz sentido para o tipo de operacao ou produto que voce quer estruturar, a proxima conversa ja pode comecar em nivel de arquitetura.'
              : 'If this case matches the kind of operation or product you want to structure, the next conversation can already start at the architecture level.'}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/projects"
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
              {lang === 'pt' ? 'Ver todos os projetos' : 'View all projects'}
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg-primary)',
              }}
            >
              {lang === 'pt' ? 'Conversar sobre arquitetura' : 'Discuss architecture'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
