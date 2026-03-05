import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import type { ReactNode } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface Props {
  post: Omit<BlogPost, 'content'>;
  toc: TocItem[];
  children: ReactNode;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
}

export default function BlogPostPage({ post, toc, children, prevPost, nextPost }: Props) {

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto flex gap-12">
        {/* Table of Contents — desktop */}
        {toc.length > 0 && (
          <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-ghost mb-3">
              On this page
            </h4>
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
        )}

        {/* Post content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-text-tertiary hover:text-accent transition-colors mb-8"
          >
            &larr; Back to blog
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-tertiary mb-3">
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

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-text-primary mb-4">
              {post.title}
            </h1>

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

            {post.project && (
              <Link
                href={`/projects/${post.project}`}
                className="inline-flex items-center gap-1 mt-4 text-sm text-accent hover:text-accent-hover transition-colors font-mono"
              >
                View project &rarr;
              </Link>
            )}
          </header>

          <div className="prose-custom">
            {children}
          </div>

          {/* Prev / Next navigation */}
          {(prevPost || nextPost) && (
            <nav className="mt-16 pt-8 border-t border-border-subtle flex justify-between gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex-1"
                >
                  <span className="text-xs text-text-ghost uppercase tracking-wider">
                    Previous
                  </span>
                  <p className="text-text-secondary group-hover:text-accent transition-colors font-medium mt-1">
                    &larr; {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex-1 text-right"
                >
                  <span className="text-xs text-text-ghost uppercase tracking-wider">
                    Next
                  </span>
                  <p className="text-text-secondary group-hover:text-accent transition-colors font-medium mt-1">
                    {nextPost.title} &rarr;
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </article>
      </div>
    </main>
  );
}
