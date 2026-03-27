'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTilt } from '@/hooks/useTilt';
import { useLang } from '@/context/LangContext';
import type { Project } from '@/lib/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { lang } = useLang();
  const { ref, style, onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useTilt<HTMLDivElement>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      tiltMove(e);
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [tiltMove, ref],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    tiltLeave();
    setIsHovered(false);
  }, [tiltLeave]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={project.featured ? 'md:col-span-2' : ''}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: style.transform,
          transition: style.transition,
        }}
        className="group relative rounded-2xl overflow-hidden h-full"
      >
        {/* Border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-1"
          style={{
            background: 'var(--accent)',
            filter: 'blur(1px)',
            margin: '-1px',
          }}
        />

        <div
          className="relative rounded-2xl overflow-hidden h-full flex flex-col"
          style={{ background: 'var(--bg-secondary)' }}
        >
          {/* Screenshot / gradient placeholder */}
          <div className={`relative h-48 ${project.featured ? 'md:h-64' : ''} overflow-hidden`}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                sizes={project.featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
              />
            ) : (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div
                  className="absolute inset-0"
                  style={{ background: 'var(--card-bg)' }}
                />
              </>
            )}
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Project title overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-mono text-3xl md:text-4xl font-bold opacity-20 group-hover:opacity-30 transition-opacity duration-500 select-none"
                style={{ color: 'var(--accent)' }}
              >
                {project.title}
              </span>
            </div>
          </div>

          {/* Shine overlay following cursor */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-glow), transparent 60%)`,
              }}
            />
          )}

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-[10px] uppercase tracking-[2px] px-2 py-1 rounded"
                style={{
                  background: 'var(--tag-bg)',
                  border: '1px solid var(--tag-border)',
                  color: 'var(--accent)',
                }}
              >
                {project.categoryLabel[lang]}
              </span>
              {project.featured && (
                <span
                  className="font-mono text-[10px] uppercase tracking-[2px] px-2 py-1 rounded"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  {project.spotlight ? (lang === 'pt' ? 'Case premium' : 'Premium case') : (lang === 'pt' ? 'Principal' : 'Featured')}
                </span>
              )}
            </div>

            {/* Title & subtitle */}
            <h3
              className="font-display text-xl md:text-2xl font-bold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            <p
              className="font-body text-sm mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.subtitle[lang]}
            </p>

            <p
              className="font-body text-sm leading-relaxed mb-5"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.spotlight ? project.description[lang] : project.outcomeSummary[lang]}
            </p>

            {/* Metrics row */}
            <div
              className="grid gap-3 mb-5"
              style={{
                gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 4)}, 1fr)`,
              }}
            >
              {project.metrics.map((metric) => (
                <div
                  key={metric.label[lang]}
                  className="text-center py-2 rounded-lg"
                  style={{ background: 'var(--card-bg)' }}
                >
                  <span
                    className="font-mono text-lg font-bold block"
                    style={{ color: 'var(--accent)' }}
                  >
                    {metric.value}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {metric.label[lang]}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-5">
              {project.highlights.slice(0, 2).map((highlight) => (
                <div key={highlight.title[lang]} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{highlight.title[lang]}:</span>{' '}
                    {highlight.description[lang]}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.stack.slice(0, project.featured ? 8 : 5).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: 'var(--tag-bg)',
                    border: '1px solid var(--tag-border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Links */}
            <div className="flex gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Ver Projeto
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                aria-label={lang === 'pt' ? `Abrir case de ${project.title}` : `Open ${project.title} case study`}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] ml-auto"
                style={{
                  border: '1px solid var(--border-hover)',
                  color: 'var(--accent)',
                }}
              >
                {lang === 'pt' ? 'Detalhes' : 'Details'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
