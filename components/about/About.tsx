'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import SectionLabel from '@/components/SectionLabel';
import PhotoFrame from './PhotoFrame';
import AnimatedCounter from './AnimatedCounter';
import TechBadge from './TechBadge';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const metrics = [
  { target: 5, suffix: '+', key: 'years' as const },
  { target: 3, suffix: '', key: 'projects' as const },
  { target: 900, suffix: '+', key: 'tests' as const },
  { target: 95, suffix: '+', key: 'lighthouse' as const },
];

/* Simple SVG icons for tech badges */
function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function IconServer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}
function IconBox() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function IconCloud() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}
function IconCpu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}
function IconPen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

const techBadges: { name: string; icon: React.ReactNode }[] = [
  { name: 'React', icon: <IconCode /> },
  { name: 'Next.js', icon: <IconCode /> },
  { name: 'TypeScript', icon: <IconCode /> },
  { name: 'Node.js', icon: <IconServer /> },
  { name: 'Supabase', icon: <IconServer /> },
  { name: 'Python', icon: <IconCode /> },
  { name: 'TailwindCSS', icon: <IconPen /> },
  { name: 'Docker', icon: <IconBox /> },
  { name: 'Azure', icon: <IconCloud /> },
  { name: 'Vercel', icon: <IconCloud /> },
  { name: 'DDD', icon: <IconLayers /> },
  { name: 'Event Sourcing', icon: <IconLayers /> },
  { name: 'CQRS', icon: <IconLayers /> },
  { name: 'AI/ML', icon: <IconCpu /> },
  { name: 'Figma', icon: <IconPen /> },
];

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="01" label={a.label} />

        {/* Two-column: photo + bio */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 md:gap-16 lg:gap-20 mb-16 md:mb-24 items-center"
        >
          {/* Photo */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-start"
          >
            <PhotoFrame />
          </motion.div>

          {/* Bio */}
          <div className="space-y-6">
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light whitespace-pre-line"
              style={{
                fontSize: 'clamp(28px, 5vw, 64px)',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
              }}
            >
              {a.title}
            </motion.h2>
            {[a.bio1, a.bio2, a.bio3].map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-body text-[15px] leading-[1.8]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Metric Counters */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.key}
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedCounter
                target={m.target}
                suffix={m.suffix}
                label={a.metrics[m.key]}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Badges Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-3 md:grid-cols-5 gap-3"
        >
          {techBadges.map((badge) => (
            <motion.div
              key={badge.name}
              variants={fadeInUp}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <TechBadge name={badge.name} icon={badge.icon} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
