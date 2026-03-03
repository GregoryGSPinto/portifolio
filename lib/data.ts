export const personalInfo = {
  name: 'Gregory Guimarães',
  firstName: 'Gregory',
  lastName: 'Guimarães',
  role: 'AI Solutions Architect',
  email: 'gregoryguimaraes12@outlook.com',
  phone: '+55 31 99679-3625',
  phoneTel: 'tel:+5531996793625',
  github: 'https://github.com/GregoryGSPinto',
  githubHandle: 'GregoryGSPinto',
  linkedin: 'https://www.linkedin.com/in/mqt-gregory/',
  linkedinHandle: 'mqt-gregory',
  instagram: 'https://www.instagram.com/gregoryguimaraes12/',
  location: 'Goiás, Brazil',
};

export const architectureLayers = [
  {
    name: 'Client',
    color: '#C9A84C',
    tags: ['Next.js', 'React', 'Tailwind', 'PWA'],
  },
  {
    name: 'Edge Layer',
    color: '#8B7E6A',
    tags: ['Vercel Edge', 'CDN', 'Cache', 'SSL'],
  },
  {
    name: 'API Gateway',
    color: '#6B7B8D',
    tags: ['REST', 'WebSocket', 'Auth', 'Rate Limit'],
  },
  {
    name: 'Services',
    color: '#5A6B7C',
    tags: ['Business Logic', 'AI/ML', 'Queue', 'Events'],
  },
  {
    name: 'Data Layer',
    color: '#4A5568',
    tags: ['PostgreSQL', 'Supabase', 'Storage', 'Analytics'],
  },
];

export const caseStudies = [
  {
    id: 'blackbelt',
    subtitle: {
      pt: 'Plataforma de Gestão & Treinamento',
      en: 'Management & Training Platform',
    },
    title: 'BlackBelt',
    desc: {
      pt: 'Ecossistema completo para academias com biblioteca de vídeos, gestão de alunos, sistema de progressão e analytics de performance. Arquitetura serverless com autenticação robusta e CDN otimizado para streaming.',
      en: 'Complete ecosystem for gyms with video library, student management, progression system and performance analytics. Serverless architecture with robust authentication and CDN optimized for streaming.',
    },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Edge Functions'],
    metrics: [
      { value: '100%', label: 'Serverless' },
      { value: '< 2s', label: 'Load Time' },
      { value: '99.9%', label: 'Uptime' },
      { value: '∞', label: 'Escalável' },
    ],
    url: 'https://blackbelt-five.vercel.app/',
    color: '#C9A84C',
  },
  {
    id: 'shift-manager',
    subtitle: {
      pt: 'Simulador de Gestão de Turnos',
      en: 'Shift Management Simulator',
    },
    title: 'Shift Manager',
    desc: {
      pt: 'Sistema inteligente de otimização de escalas com algoritmos de distribuição balanceada, gestão de trocas em tempo real e dashboard analítico para tomada de decisão gerencial.',
      en: 'Intelligent schedule optimization system with balanced distribution algorithms, real-time exchange management and analytical dashboard for managerial decision-making.',
    },
    tags: ['React', 'Node.js', 'Supabase', 'WebSocket', 'Charts'],
    metrics: [
      { value: '40%', label: 'Redução Conflitos' },
      { value: 'Real-time', label: 'Sync' },
      { value: 'Smart', label: 'Algorithm' },
      { value: 'PWA', label: 'Mobile Ready' },
    ],
    url: '#',
    color: '#7B8794',
  },
];

export const techStack = {
  frontend: {
    label: { pt: 'Frontend', en: 'Frontend' },
    skills: [
      { name: 'React/Next.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'HTML/CSS', level: 96 },
    ],
  },
  backend: {
    label: { pt: 'Backend', en: 'Backend' },
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'Python', level: 78 },
      { name: 'REST APIs', level: 88 },
      { name: 'Edge Functions', level: 76 },
    ],
  },
  infra: {
    label: { pt: 'Infra & Data', en: 'Infra & Data' },
    skills: [
      { name: 'Supabase', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Vercel', level: 90 },
      { name: 'Git/CI-CD', level: 86 },
    ],
  },
  leadership: {
    label: { pt: 'Liderança', en: 'Leadership' },
    skills: [
      { name: 'System Design', level: 84 },
      { name: 'Code Review', level: 90 },
      { name: 'Arquitetura', level: 86 },
      { name: 'Mentoria', level: 82 },
    ],
  },
};

export const timelineItems = [
  {
    year: '2025',
    highlight: true,
    role: { pt: 'AI Solutions Architect', en: 'AI Solutions Architect' },
    company: { pt: 'Freelancer / Consultoria', en: 'Freelancer / Consulting' },
    desc: {
      pt: 'Arquitetura de soluções enterprise com IA, liderança de projetos end-to-end e consultoria técnica para startups.',
      en: 'Enterprise AI solution architecture, end-to-end project leadership and technical consulting for startups.',
    },
  },
  {
    year: '2024',
    highlight: false,
    role: { pt: 'Full Stack Developer', en: 'Full Stack Developer' },
    company: { pt: 'Projetos Independentes', en: 'Independent Projects' },
    desc: {
      pt: 'Desenvolvimento de plataformas completas com Next.js, Supabase e deploy automatizado na Vercel.',
      en: 'Full platform development with Next.js, Supabase and automated deploy on Vercel.',
    },
  },
  {
    year: '2023',
    highlight: false,
    role: { pt: 'Frontend Developer', en: 'Frontend Developer' },
    company: { pt: 'Estudos & Projetos', en: 'Studies & Projects' },
    desc: {
      pt: 'Imersão em fundamentos sólidos de HTML, CSS, JavaScript e frameworks modernos com foco em melhores práticas.',
      en: 'Deep dive into solid HTML, CSS, JavaScript fundamentals and modern frameworks focused on best practices.',
    },
  },
];

export const contactLinks = [
  {
    label: 'Email',
    value: 'gregoryguimaraes12@outlook.com',
    href: 'mailto:gregoryguimaraes12@outlook.com',
  },
  {
    label: 'GitHub',
    value: 'GregoryGSPinto',
    href: 'https://github.com/GregoryGSPinto',
  },
  {
    label: 'LinkedIn',
    value: 'mqt-gregory',
    href: 'https://www.linkedin.com/in/mqt-gregory/',
  },
  {
    label: 'Telefone',
    value: '+55 31 99679-3625',
    href: 'tel:+5531996793625',
  },
];
