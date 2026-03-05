'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Insights from '@/components/Insights';

const NoiseTexture = dynamic(() => import('@/components/NoiseTexture'), { ssr: false });
const Projects = dynamic(() => import('@/components/projects/Projects'));
const Skills = dynamic(() => import('@/components/skills/Skills'));
const ExperienceTimeline = dynamic(() => import('@/components/experience/Timeline'));
const Contact = dynamic(() => import('@/components/contact/Contact'));
const AIChatbot = dynamic(() => import('@/components/AIChatbot'), { ssr: false });
const Preloader = dynamic(() => import('@/components/layout/Preloader'), { ssr: false });

const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], staggerChildren: 0.15 },
  },
};

function SectionWrap({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <motion.div
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

interface PostTeaser {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

interface HomePageProps {
  blogPosts: {
    pt: PostTeaser[];
    en: PostTeaser[];
  };
}

export default function HomePage({ blogPosts }: HomePageProps) {
  return (
    <Preloader>
      <NoiseTexture />
      <main id="main-content">
        {/* Hero — full viewport, no wrapper needed */}
        <Hero />

        {/* About — 01 */}
        <SectionWrap>
          <About />
        </SectionWrap>

        {/* Projects — 02 */}
        <SectionWrap>
          <Projects />
        </SectionWrap>

        {/* Skills — 03 */}
        <SectionWrap>
          <Skills />
        </SectionWrap>

        {/* Experience — 04 */}
        <SectionWrap>
          <ExperienceTimeline />
        </SectionWrap>

        {/* Insights — 09 */}
        <SectionWrap>
          <Insights posts={blogPosts} />
        </SectionWrap>

        {/* Contact — 05 */}
        <SectionWrap>
          <Contact />
        </SectionWrap>
      </main>
      <AIChatbot />
    </Preloader>
  );
}
