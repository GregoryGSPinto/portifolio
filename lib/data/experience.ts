export interface ExperienceEntry {
  year: string;
  highlight: boolean;
  role: { pt: string; en: string };
  company: { pt: string; en: string };
  period: { pt: string; en: string };
  location: { pt: string; en: string };
  desc: { pt: string; en: string };
  tags: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    year: '2024',
    highlight: true,
    role: { pt: 'AI Solutions Architect', en: 'AI Solutions Architect' },
    company: { pt: 'Freelance', en: 'Freelance' },
    period: { pt: '2024 - Presente', en: '2024 - Present' },
    location: { pt: 'Remoto', en: 'Remote' },
    desc: {
      pt: 'Arquitetura de software orientada a produto. Projetei e construi plataformas com DDD, Event Sourcing e integracao de IA. Foco em dominios operacionais complexos onde decisao tecnica precisa ser auditavel e sustentavel.',
      en: 'Product-oriented software architecture. Designed and built platforms with DDD, Event Sourcing, and AI integration. Focus on complex operational domains where technical decisions must be auditable and sustainable.',
    },
    tags: ['Next.js', 'TypeScript', 'DDD', 'Event Sourcing', 'AI/ML', 'React'],
  },
];
