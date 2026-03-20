import type { Metadata } from 'next';
import Projects from '@/components/projects/Projects';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Case studies covering product architecture, operational software, frontend systems, and AI-enabled delivery.',
  alternates: {
    canonical: absoluteUrl('/projects'),
  },
  openGraph: {
    title: 'Projects | Gregory Guimaraes',
    description: 'Case studies covering product architecture, operational software, frontend systems, and AI-enabled delivery.',
    url: absoluteUrl('/projects'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Gregory Guimaraes',
    description: 'Case studies covering product architecture, operational software, frontend systems, and AI-enabled delivery.',
  },
};

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <Projects mode="page" />
    </main>
  );
}
