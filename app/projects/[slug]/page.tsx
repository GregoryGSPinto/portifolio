import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects, getProjectBySlug } from '@/lib/data/projects';
import { absoluteUrl } from '@/lib/site';
import ProjectDetail from './ProjectDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  const ogImageUrl = `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.subtitle.en)}`;

  return {
    title: project.title,
    description: project.description.en,
    keywords: project.stack,
    alternates: {
      canonical: absoluteUrl(`/projects/${slug}`),
    },
    openGraph: {
      title: `${project.title} — ${project.subtitle.en}`,
      description: project.description.en,
      type: 'article',
      url: absoluteUrl(`/projects/${slug}`),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description.en,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
