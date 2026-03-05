'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { experienceEntries } from '@/lib/data/experience';
import SectionLabel from '@/components/SectionLabel';
import TimelineEntry from './TimelineEntry';

export default function ExperienceTimeline() {
  const { t, lang } = useLang();

  return (
    <section id="experience" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="04" label={t.timeline.label} />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-12 md:mb-20 whitespace-pre-line"
          style={{
            fontSize: 'clamp(28px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          {t.timeline.title}
        </motion.h2>

        <div className="relative">
          {/* Vertical center line (desktop only) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'var(--border-subtle)' }}
          />

          {experienceEntries.map((entry, i) => (
            <TimelineEntryWithViewport key={entry.year} entry={entry} lang={lang} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}

function TimelineEntryWithViewport({
  entry,
  lang,
  index,
}: {
  entry: (typeof experienceEntries)[number];
  lang: 'pt' | 'en';
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  return (
    <div ref={ref}>
      <TimelineEntry entry={entry} lang={lang} index={index} isActive={isInView} />
    </div>
  );
}
