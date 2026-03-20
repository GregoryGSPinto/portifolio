'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import { useLang } from '@/context/LangContext';
import { absoluteUrl } from '@/lib/site';
import type { BlogPost } from '@/lib/blog';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface Props {
  post: Omit<BlogPost, 'content'>;
  slug: string;
  toc: TocItem[];
  children: ReactNode;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
}

export default function BlogPostPage({
  post,
  slug,
  toc,
  children,
  prevPost,
  nextPost,
}: Props) {
  const { lang } = useLang();

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <ArticleJsonLd
        headline={post.title}
        description={post.description}
        url={absoluteUrl(`/blog/${slug}`)}
        datePublished={post.date}
        keywords={post.tags}
      />

      <div className="max-w-6xl mx-auto flex gap-12">
        {toc.length > 0 ? (
          <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-ghost mb-3">
              {lang === 'pt' ? 'Nesta pagina' : 'On this page'}
            </h2>
            <nav className="space-y-1.5">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-sm text-text-tertiary hover:text-accent transition-colors ${
                    item.level === 3 ? 'pl-3' : ''
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </aside>
        ) : null}

        <article className="flex-1 min-w-0 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-text-tertiary hover:text-accent transition-colors mb-8"
          >
            &larr; {lang === 'pt' ? 'Voltar ao blog' : 'Back to blog'}
          </Link>

          <header className="mb-10 rounded-[28px] border p-6 md:p-8" style={{ borderColor: 'var(--border-subtle)', background: 'var(--card-bg)' }}>
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="text-text-ghost">|</span>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-text-primary mb-4">
              {post.title}
            </h1>
            <p className="text-base leading-relaxed text-text-secondary mb-5">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs rounded-full bg-bg-tertiary text-text-tertiary border border-border-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>

            {post.project ? (
              <Link
                href={`/projects/${post.project}`}
                className="inline-flex items-center gap-1 mt-4 text-sm text-accent hover:text-accent-hover transition-colors font-mono"
              >
                {lang === 'pt' ? 'Ver projeto relacionado' : 'View related project'} &rarr;
              </Link>
            ) : null}
          </header>

          <div className="prose-custom">{children}</div>

          {(prevPost || nextPost) ? (
            <nav className="mt-16 pt-8 border-t border-border-subtle flex justify-between gap-4">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group flex-1">
                  <span className="text-xs text-text-ghost uppercase tracking-wider">
                    {lang === 'pt' ? 'Anterior' : 'Previous'}
                  </span>
                  <p className="text-text-secondary group-hover:text-accent transition-colors font-medium mt-1">
                    &larr; {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="group flex-1 text-right">
                  <span className="text-xs text-text-ghost uppercase tracking-wider">
                    {lang === 'pt' ? 'Proximo' : 'Next'}
                  </span>
                  <p className="text-text-secondary group-hover:text-accent transition-colors font-medium mt-1">
                    {nextPost.title} &rarr;
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          ) : null}
        </article>
      </div>
    </main>
  );
}
