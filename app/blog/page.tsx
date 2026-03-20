import type { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { absoluteUrl } from '@/lib/site';
import BlogList from './BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical writing on architecture, product engineering, AI integration, and implementation trade-offs.',
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
  openGraph: {
    title: 'Blog',
    description:
      'Technical writing on architecture, product engineering, AI integration, and implementation trade-offs.',
    url: absoluteUrl('/blog'),
    type: 'website',
  },
};

export default function BlogPage() {
  const ptPosts = getAllPosts('pt');
  const enPosts = getAllPosts('en');
  const ptTags = getAllTags('pt');
  const enTags = getAllTags('en');

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <BlogList
          posts={{ pt: ptPosts, en: enPosts }}
          tags={{ pt: ptTags, en: enTags }}
        />
      </div>
    </main>
  );
}
