'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import type { BlogPost } from '@/lib/blog';

interface BlogListProps {
  posts: {
    pt: Omit<BlogPost, 'content'>[];
    en: Omit<BlogPost, 'content'>[];
  };
  tags: {
    pt: string[];
    en: string[];
  };
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const { lang } = useLang();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const currentPosts = posts[lang];
  const currentTags = tags[lang];

  const filtered = activeTag ? currentPosts.filter((post) => post.tags.includes(activeTag)) : currentPosts;

  const [featuredPost, ...otherPosts] = filtered;

  return (
    <>
      <header className="mb-12">
        <p className="font-mono text-[11px] uppercase tracking-[2px] mb-4 text-text-tertiary">
          {lang === 'pt' ? 'Notas de arquitetura e produto' : 'Architecture and product notes'}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold font-display text-text-primary mb-4">
          Blog
        </h1>
        <p className="text-lg max-w-3xl text-text-secondary leading-relaxed">
          {lang === 'pt'
            ? 'Artigos curtos e tecnicos sobre arquitetura, IA aplicada, qualidade de execucao e as decisoes por tras dos projetos.'
            : 'Short technical articles about architecture, applied AI, execution quality, and the decisions behind the projects.'}
        </p>
      </header>

      {currentTags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Blog tags">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !activeTag
                ? 'bg-accent text-bg-primary'
                : 'bg-card-bg text-text-secondary hover:text-text-primary border border-border-subtle'
            }`}
          >
            {lang === 'pt' ? 'Todos' : 'All'}
          </button>
          {currentTags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                tag === activeTag
                  ? 'bg-accent text-bg-primary'
                  : 'bg-card-bg text-text-secondary hover:text-text-primary border border-border-subtle'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-text-tertiary text-center py-12">
          {lang === 'pt' ? 'Nenhum post encontrado.' : 'No posts found.'}
        </p>
      ) : (
        <div className="space-y-6">
          {featuredPost ? (
            <article
              className="rounded-[28px] border p-8 md:p-10"
              style={{ borderColor: 'var(--border-hover)', background: 'linear-gradient(180deg, var(--card-bg), transparent)' }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[2px] mb-4 text-accent">
                {lang === 'pt' ? 'Leitura em destaque' : 'Featured reading'}
              </p>
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary mb-3">
                  <time dateTime={featuredPost.date}>
                    {new Date(featuredPost.date).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-text-ghost">|</span>
                  <span>{featuredPost.readingTime}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-semibold text-text-primary transition-colors mb-4 font-display">
                  {featuredPost.title}
                </h2>
                <p className="text-text-secondary text-base leading-relaxed mb-5 max-w-3xl">
                  {featuredPost.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-bg-tertiary text-text-tertiary border border-border-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ) : null}

          <div className="grid gap-5">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="group border border-border-subtle rounded-2xl p-6 hover:border-border-hover hover:bg-card-bg transition-all"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary mb-2">
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

                  <h2 className="text-xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 font-display">
                    {post.title}
                  </h2>

                  <p className="text-text-secondary text-sm leading-relaxed mb-3">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-bg-tertiary text-text-tertiary border border-border-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {post.project ? (
                    <span className="inline-block mt-3 text-xs text-accent font-mono">
                      {lang === 'pt' ? 'projeto' : 'project'}: {post.project}
                    </span>
                  ) : null}
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
