'use client';

import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { techStack } from '@/lib/data';
import { useIntersectionObserver, useGitHubStack } from '@/lib/hooks';
import SectionLabel from './SectionLabel';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function SkillBar({ name, level, isVisible }: { name: string; level: number; isVisible: boolean }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span
        className="font-mono text-[12px] sm:text-[13px] shrink-0"
        style={{ minWidth: '100px', color: 'var(--text-secondary)' }}
      >
        {name}
      </span>
      <div className="flex-1 h-[3px] rounded-full" style={{ background: 'var(--skill-bar-bg)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: isVisible ? `${level}%` : '0%',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
      <span
        className="font-mono text-[11px] shrink-0 w-8 text-right"
        style={{ color: 'var(--accent)' }}
      >
        {level}
      </span>
    </div>
  );
}

function SkillBarSkeleton() {
  return (
    <div className="flex items-center gap-3 sm:gap-4 animate-pulse">
      <div
        className="h-3 rounded shrink-0"
        style={{ width: '100px', background: 'var(--skill-bar-bg)' }}
      />
      <div className="flex-1 h-[3px] rounded-full" style={{ background: 'var(--skill-bar-bg)' }} />
      <div
        className="h-3 rounded shrink-0"
        style={{ width: '32px', background: 'var(--skill-bar-bg)' }}
      />
    </div>
  );
}

function timeAgo(dateStr: string, lang: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return lang === 'pt' ? 'agora' : 'just now';
  if (mins < 60) return `${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export default function TechStack() {
  const { t: root, lang } = useLang();
  const t = root.stack;
  const [ref, isVisible] = useIntersectionObserver(0.2);
  const { data: ghData, loading, error } = useGitHubStack();

  // Use dynamic data if available, else static fallback
  const useDynamic = !loading && !error && ghData && ghData.stack.length > 0;

  // Static fallback categories
  const staticCategories = Object.entries(techStack) as [
    keyof typeof techStack,
    (typeof techStack)[keyof typeof techStack],
  ][];

  return (
    <section id="stack" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12" ref={ref}>
        <SectionLabel number="06" label={t.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-12 md:mb-20 whitespace-pre-line"
          style={{
            fontSize: 'clamp(28px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          {t.title}
        </motion.h2>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <div
                  className="h-3 w-24 rounded mb-6 md:mb-8 animate-pulse"
                  style={{ background: 'var(--skill-bar-bg)' }}
                />
                <div className="flex flex-col gap-5">
                  {[0, 1, 2, 3].map((j) => (
                    <SkillBarSkeleton key={j} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic stack from GitHub */}
        {!loading && useDynamic && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
          >
            {ghData.stack.map((cat) => (
              <motion.div
                key={cat.category}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3
                  className="font-mono text-[11px] uppercase tracking-[3px] mb-6 md:mb-8"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {cat.category}
                </h3>
                <div className="flex flex-col gap-5">
                  {cat.items.map((item) => (
                    <SkillBar
                      key={item.name}
                      name={item.name}
                      level={item.skill}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Static fallback */}
        {!loading && !useDynamic && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
          >
            {staticCategories.map(([key, category]) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3
                  className="font-mono text-[11px] uppercase tracking-[3px] mb-6 md:mb-8"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {category.label[lang]}
                </h3>
                <div className="flex flex-col gap-5">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Dynamic source footer */}
        {useDynamic && ghData && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-mono text-[10px] mt-12 text-center"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {root.stack.dynamicFooter.replace('{count}', String(ghData.reposAnalyzed))}
            {' \u00B7 '}
            {root.stack.lastUpdated.replace('{time}', timeAgo(ghData.lastUpdated, lang))}
          </motion.p>
        )}
      </div>
    </section>
  );
}
