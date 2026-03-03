import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Vision from '@/components/Vision';
import Architecture from '@/components/Architecture';
import Methodology from '@/components/Methodology';
import Cases from '@/components/Cases';
import AIExperience from '@/components/AIExperience';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import Certifications from '@/components/Certifications';
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
