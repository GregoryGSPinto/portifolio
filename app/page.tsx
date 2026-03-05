'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Vision from '@/components/Vision';
import Architecture from '@/components/Architecture';
import Methodology from '@/components/Methodology';
import Footer from '@/components/Footer';
import SkipLink from '@/components/SkipLink';

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
      <SkipLink />
      <NoiseTexture />
      <Navigation />
      <main id="main-content">
        <Hero />
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
      <Footer />
      <AIChatbot />
    </>
  );
}
