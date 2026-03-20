'use client';

import { motion } from 'framer-motion';
import type { ExperienceEntry } from '@/lib/data/experience';
import type { Lang } from '@/lib/data/i18n';

interface TimelineEntryProps {
  entry: ExperienceEntry;
  lang: Lang;
  index: number;
  isActive: boolean;
}

const entryVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -30 : 30,
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
};

const entryVariantsMobile = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function TimelineEntry({ entry, lang, index, isActive }: TimelineEntryProps) {
  const isLeft = index % 2 === 0;

  return (
    <>
      {/* Desktop: alternating left/right */}
      <div className="hidden md:block">
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 48px 1fr',
            gap: '0',
          }}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={entryVariants}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left content or spacer */}
          {isLeft ? (
            <div className="text-right pr-8 py-6">
              <EntryContent entry={entry} lang={lang} align="right" />
            </div>
          ) : (
            <div />
          )}

          {/* Center line + dot */}
          <div className="flex flex-col items-center">
            <div
              className="w-3 h-3 rounded-full shrink-0 mt-8 z-10 transition-all duration-500"
              style={{
                background: isActive ? 'var(--accent)' : 'var(--dot-inactive, rgba(255,255,255,0.2))',
                boxShadow: isActive ? '0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow)' : 'none',
                animation: isActive ? 'pulse 2s ease-in-out infinite' : 'none',
              }}
            />
            <div
              className="w-px flex-1 mt-1"
              style={{ background: 'var(--border-subtle)' }}
            />
          </div>

          {/* Right content or spacer */}
          {!isLeft ? (
            <div className="pl-8 py-6">
              <EntryContent entry={entry} lang={lang} align="left" />
            </div>
          ) : (
            <div />
          )}
        </motion.div>
      </div>

      {/* Mobile: all on right side */}
      <div className="block md:hidden">
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '16px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={entryVariantsMobile}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0 mt-2 z-10 transition-all duration-500"
              style={{
                background: isActive ? 'var(--accent)' : 'var(--dot-inactive, rgba(255,255,255,0.2))',
                boxShadow: isActive ? '0 0 16px var(--accent-glow)' : 'none',
                animation: isActive ? 'pulse 2s ease-in-out infinite' : 'none',
              }}
            />
            <div
              className="w-px flex-1 mt-1"
              style={{ background: 'var(--border-subtle)' }}
            />
          </div>
          <div className="pb-8">
            <EntryContent entry={entry} lang={lang} align="left" />
          </div>
        </motion.div>
      </div>
    </>
  );
}

function EntryContent({
  entry,
  lang,
  align,
}: {
  entry: ExperienceEntry;
  lang: Lang;
  align: 'left' | 'right';
}) {
  const textAlign = align === 'right' ? 'text-right' : 'text-left';
  const flexJustify = align === 'right' ? 'justify-end' : 'justify-start';

  return (
    <div className={textAlign}>
      <span
        className="font-mono text-[11px] uppercase tracking-[2px] mb-1 block"
        style={{ color: entry.highlight ? 'var(--accent)' : 'var(--text-tertiary)' }}
      >
        {entry.year} &middot; {entry.period[lang]}
      </span>
      <h3
        className="font-display text-lg md:text-xl font-semibold mb-1"
        style={{ color: 'var(--text-primary)' }}
      >
        {entry.role[lang]}
      </h3>
      <span
        className="font-mono text-[11px] uppercase tracking-[2px] block mb-3"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {entry.company[lang]}
      </span>
      <p
        className="font-body text-[13px] md:text-[14px] leading-[1.7] mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        {entry.desc[lang]}
      </p>
      <div className={`flex flex-wrap gap-2 ${flexJustify}`}>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-[1px] px-2.5 py-1 rounded-sm"
            style={{
              background: 'var(--card-bg, rgba(255,255,255,0.04))',
              color: 'var(--text-tertiary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
