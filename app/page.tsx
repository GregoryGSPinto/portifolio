import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Vision from '@/components/Vision';
import Architecture from '@/components/Architecture';
import Cases from '@/components/Cases';
import AIExperience from '@/components/AIExperience';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import Insights from '@/components/Insights';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import NoiseTexture from '@/components/NoiseTexture';
import AIChatbot from '@/components/AIChatbot';

export default function Home() {
  return (
    <>
      <NoiseTexture />
      <Navigation />
      <main>
        <Hero />
        <Vision />
        <Architecture />
        <Cases />
        <AIExperience />
        <TechStack />
        <Timeline />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
