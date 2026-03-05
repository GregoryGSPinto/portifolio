'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Vision from '@/components/Vision';
import Architecture from '@/components/Architecture';
import Methodology from '@/components/Methodology';

const NoiseTexture = dynamic(() => import('@/components/NoiseTexture'), { ssr: false });
const Cases = dynamic(() => import('@/components/Cases'));
const AIExperience = dynamic(() => import('@/components/AIExperience'));
const TechStack = dynamic(() => import('@/components/TechStack'));
const Timeline = dynamic(() => import('@/components/Timeline'));
const Certifications = dynamic(() => import('@/components/Certifications'));
const Insights = dynamic(() => import('@/components/Insights'));
const Contact = dynamic(() => import('@/components/Contact'));
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
        <Cases />
        <AIExperience />
        <TechStack />
        <Timeline />
        <Certifications />
        <Insights />
        <Contact />
      </main>
      <AIChatbot />
    </>
  );
}
