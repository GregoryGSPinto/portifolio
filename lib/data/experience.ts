export interface ExperienceEntry {
  year: string;
  highlight: boolean;
  role: { pt: string; en: string };
  company: { pt: string; en: string };
  period: { pt: string; en: string };
  desc: { pt: string; en: string };
  tags: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    year: '2025',
    highlight: true,
    role: { pt: 'AI Solutions Architect', en: 'AI Solutions Architect' },
    company: { pt: 'Freelancer / Consultoria', en: 'Freelance / Consulting' },
    period: { pt: 'Jan 2025 - Presente', en: 'Jan 2025 - Present' },
    desc: {
      pt: 'Arquitetura de solucoes enterprise com IA, lideranca de projetos end-to-end e consultoria tecnica para startups. Integracao de LLMs, pipelines RAG e automacao inteligente.',
      en: 'Enterprise AI solution architecture, end-to-end project leadership and technical consulting for startups. LLM integration, RAG pipelines and intelligent automation.',
    },
    tags: ['Claude API', 'RAG', 'Next.js', 'TypeScript', 'System Design'],
  },
  {
    year: '2024',
    highlight: false,
    role: { pt: 'Full Stack Developer', en: 'Full Stack Developer' },
    company: { pt: 'Projetos Independentes', en: 'Independent Projects' },
    period: { pt: 'Jan 2024 - Dez 2024', en: 'Jan 2024 - Dec 2024' },
    desc: {
      pt: 'Desenvolvimento de plataformas completas com Next.js, Supabase e deploy automatizado na Vercel. Foco em arquiteturas escalaveis e experiencia do usuario.',
      en: 'Full platform development with Next.js, Supabase and automated deploy on Vercel. Focus on scalable architectures and user experience.',
    },
    tags: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Vercel'],
  },
  {
    year: '2023',
    highlight: false,
    role: { pt: 'Frontend Developer', en: 'Frontend Developer' },
    company: { pt: 'Estudos & Projetos', en: 'Studies & Projects' },
    period: { pt: 'Jan 2023 - Dez 2023', en: 'Jan 2023 - Dec 2023' },
    desc: {
      pt: 'Imersao em fundamentos solidos de HTML, CSS, JavaScript e frameworks modernos com foco em melhores praticas e acessibilidade.',
      en: 'Deep dive into solid HTML, CSS, JavaScript fundamentals and modern frameworks focused on best practices and accessibility.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  },
];
