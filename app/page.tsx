'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Vision from '@/components/Vision';
import Architecture from '@/components/Architecture';
import Methodology from '@/components/Methodology';

const NoiseTexture = dynamic(() => import('@/components/NoiseTexture'), { ssr: false });
const Projects = dynamic(() => import('@/components/projects/Projects'));
const Skills = dynamic(() => import('@/components/skills/Skills'));
const AIExperience = dynamic(() => import('@/components/AIExperience'));
const TechStack = dynamic(() => import('@/components/TechStack'));
const ExperienceTimeline = dynamic(() => import('@/components/experience/Timeline'));
const Certifications = dynamic(() => import('@/components/Certifications'));
const Insights = dynamic(() => import('@/components/Insights'));
const Contact = dynamic(() => import('@/components/contact/Contact'));
const AIChatbot = dynamic(() => import('@/components/AIChatbot'), { ssr: false });

export default function Home() {
  return (
    <>
      <NoiseTexture />
      <main id="main-content">
        <Hero />
        <About />
        <Vision />
        <Architecture />
        <Methodology />
        <Projects />
        <Skills />
        <AIExperience />
        <TechStack />
        <ExperienceTimeline />
        <Certifications />
        <Insights />
        <Contact />
      </main>
      <AIChatbot />
    </>
  );
}
