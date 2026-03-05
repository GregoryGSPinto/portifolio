import type { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogList from './BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on architecture, AI/ML, and building scalable systems.',
};

export default function BlogPage() {
  const posts = getAllPosts('en');
  const tags = getAllTags('en');

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-3">
            Blog
          </h1>
          <p className="text-lg text-text-secondary">
            Thoughts on architecture, AI, and engineering.
          </p>
        </header>

        <BlogList posts={posts} tags={tags} />
      </div>
    </main>
  );
}
