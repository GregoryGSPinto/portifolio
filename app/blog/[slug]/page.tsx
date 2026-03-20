import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { MDXContent } from '@/components/blog/MDXRemote';
import { absoluteUrl } from '@/lib/site';
import BlogPostPage from './BlogPostPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function extractToc(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    items.push({
      id: text.toLowerCase().replace(/[^\w]+/g, '-'),
      text,
      level: match[1].length,
    });
  }
  return items;
}

export async function generateStaticParams() {
  const posts = getAllPosts('en');
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: absoluteUrl(`/blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(`/blog/${slug}`),
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');
  if (!post) notFound();

  const allPosts = getAllPosts('en');
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const toc = extractToc(post.content);

  return (
    <BlogPostPage
      post={post}
      slug={slug}
      toc={toc}
      prevPost={prevPost ? { slug: prevPost.slug, title: prevPost.title } : null}
      nextPost={nextPost ? { slug: nextPost.slug, title: nextPost.title } : null}
    >
      <MDXContent source={post.content} />
    </BlogPostPage>
  );
}
