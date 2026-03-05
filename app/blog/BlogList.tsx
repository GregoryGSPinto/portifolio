'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

interface BlogListProps {
  posts: Omit<BlogPost, 'content'>[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !activeTag
                ? 'bg-accent text-bg-primary'
                : 'bg-card-bg text-text-secondary hover:text-text-primary border border-border-subtle'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
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
      )}

      {filtered.length === 0 ? (
        <p className="text-text-tertiary text-center py-12">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="group border border-border-subtle rounded-xl p-6 hover:border-border-hover hover:bg-card-bg transition-all"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary mb-2">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
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

                {post.project && (
                  <span className="inline-block mt-3 text-xs text-accent font-mono">
                    project: {post.project}
                  </span>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
