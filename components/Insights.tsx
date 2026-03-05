'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import SectionLabel from './SectionLabel';

interface PostTeaser {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

interface InsightsProps {
  posts?: {
    pt: PostTeaser[];
    en: PostTeaser[];
  };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Insights({ posts }: InsightsProps) {
  const { t: root, lang } = useLang();
  const t = root.insights;
  const items = posts?.[lang as 'pt' | 'en'] ?? [];

  return (
    <section id="insights" className="py-20 md:py-28 lg:py-40 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <SectionLabel number="09" label={t.label} />

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mb-10 md:mb-16 whitespace-pre-line"
          style={{
            fontSize: 'clamp(28px, 5vw, 64px)',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          {t.title}
        </motion.h2>

        {items.length > 0 ? (
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid gap-4 md:gap-6 md:grid-cols-3"
            >
              {items.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-lg p-5 sm:p-6 h-full transition-colors duration-200"
                    style={{
                      border: '1px solid var(--insight-border)',
                      background: 'var(--insight-bg)',
                    }}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded"
                          style={{
                            color: 'var(--text-tertiary)',
                            background: 'var(--tag-bg, rgba(128,128,128,0.1))',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      className="font-display font-medium text-base sm:text-lg mb-2 leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {post.title}
                    </h3>

                    <p
                      className="font-mono text-[12px] leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {post.description}
                    </p>

                    <div
                      className="flex items-center justify-between font-mono text-[11px]"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                      <span>{post.readingTime.replace('min read', t.minRead)}</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-center"
            >
              <Link
                href="/blog"
                className="inline-block font-mono text-[12px] tracking-wider uppercase px-6 py-3 rounded-lg transition-colors duration-200"
                style={{
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--insight-border)',
                }}
              >
                {t.viewAll} &rarr;
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center rounded-lg px-5 py-12 sm:px-12 sm:py-20"
            style={{
              border: '1px solid var(--insight-border)',
              background: 'var(--insight-bg)',
            }}
          >
            <span
              className="font-display text-3xl sm:text-4xl block mb-6"
              style={{ color: 'var(--insight-symbol)' }}
            >
              &#10022;
            </span>
            <p
              className="font-mono text-[13px]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {t.placeholder}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
