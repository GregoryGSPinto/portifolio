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
    slug: 'blackbelt',
    title: 'BlackBelt',
    subtitle: {
      pt: 'Plataforma de Gestão & Treinamento para Academias',
      en: 'Gym Management & Training Platform',
    },
    challenge: {
      pt: 'Academias de luta dependiam de planilhas, WhatsApp e processos manuais para gerenciar alunos, graduações e conteúdo de treino. Isso gerava perda de informação, inconsistência na progressão dos alunos e zero visibilidade analítica para os gestores.',
      en: 'Martial arts gyms relied on spreadsheets, WhatsApp and manual processes to manage students, belt progressions and training content. This led to information loss, inconsistent student progression tracking and zero analytical visibility for managers.',
    },
    approach: {
      pt: 'Projetei uma plataforma serverless completa com foco em três pilares: biblioteca de vídeo sob demanda para treinos, sistema de progressão gamificado para graduações, e dashboard analítico para gestores. A arquitetura foi pensada para escalar sem custo fixo de infraestrutura.',
      en: 'I designed a complete serverless platform focused on three pillars: on-demand video library for training, gamified progression system for belt gradings, and analytical dashboard for managers. The architecture was designed to scale with zero fixed infrastructure cost.',
    },
    architecture: {
      pt: 'Optei por Next.js com App Router para SSR e SEO, Supabase como BaaS (auth, database, storage), e Vercel Edge Functions para lógica de negócio crítica. O streaming de vídeo usa CDN otimizado com lazy loading progressivo. A autenticação implementa Row Level Security no Supabase para isolamento de dados entre academias.',
      en: 'I chose Next.js with App Router for SSR and SEO, Supabase as BaaS (auth, database, storage), and Vercel Edge Functions for critical business logic. Video streaming uses CDN-optimized delivery with progressive lazy loading. Authentication implements Row Level Security in Supabase for data isolation between gyms.',
    },
    results: {
      pt: 'Plataforma lançada e em uso ativo. Arquitetura 100% serverless com custo operacional próximo de zero na fase inicial. Tempo de carregamento abaixo de 2 segundos em conexões 4G. Sistema preparado para multi-tenancy quando necessário.',
      en: 'Platform launched and in active use. 100% serverless architecture with near-zero operational cost in initial phase. Load time under 2 seconds on 4G connections. System prepared for multi-tenancy when needed.',
    },
    metrics: [
      { value: '100%', label: { pt: 'Serverless', en: 'Serverless' }, context: { pt: 'Zero servidor gerenciado', en: 'Zero managed servers' } },
      { value: '<2s', label: { pt: 'First Paint', en: 'First Paint' }, context: { pt: 'Em conexão 4G', en: 'On 4G connection' } },
      { value: '$0', label: { pt: 'Custo Infra Inicial', en: 'Initial Infra Cost' }, context: { pt: 'Free tier Supabase + Vercel', en: 'Supabase + Vercel free tier' } },
      { value: 'RLS', label: { pt: 'Segurança', en: 'Security' }, context: { pt: 'Row Level Security ativo', en: 'Row Level Security active' } },
    ],
    decisions: [
      { title: { pt: 'Por que Supabase e não Firebase?', en: 'Why Supabase over Firebase?' }, description: { pt: 'PostgreSQL permite queries complexas, Row Level Security nativo, e não tem vendor lock-in. Migração futura para qualquer PostgreSQL é trivial.', en: 'PostgreSQL enables complex queries, native Row Level Security, and no vendor lock-in. Future migration to any PostgreSQL is trivial.' }, icon: '◆' },
      { title: { pt: 'Por que SSR e não SPA?', en: 'Why SSR over SPA?' }, description: { pt: 'SEO era crítico para aquisição orgânica das academias. SSR com Next.js App Router entrega HTML pronto pro Google sem custo adicional de build.', en: 'SEO was critical for organic gym acquisition. SSR with Next.js App Router delivers Google-ready HTML with no additional build cost.' }, icon: '◇' },
      { title: { pt: 'Por que Edge Functions?', en: 'Why Edge Functions?' }, description: { pt: 'Lógica de graduação e validação de acesso não pode rodar no client. Edge Functions executam em <50ms globalmente, mais rápido que Lambda tradicional.', en: 'Belt grading logic and access validation cannot run on client. Edge Functions execute in <50ms globally, faster than traditional Lambda.' }, icon: '⚡' },
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Edge Functions', 'PostgreSQL', 'Tailwind CSS'],
    url: 'https://blackbelt-five.vercel.app/',
    accentColor: '#C9A84C',
    stackDetails: [
      { name: 'Next.js 14', role: { pt: 'Framework frontend + SSR', en: 'Frontend framework + SSR' } },
      { name: 'TypeScript', role: { pt: 'Type safety end-to-end', en: 'End-to-end type safety' } },
      { name: 'Supabase', role: { pt: 'Auth + Database + Storage', en: 'Auth + Database + Storage' } },
      { name: 'Vercel', role: { pt: 'Deploy + Edge + CDN', en: 'Deploy + Edge + CDN' } },
      { name: 'Tailwind CSS', role: { pt: 'Design system e responsividade', en: 'Design system and responsiveness' } },
    ],
    timeline: { pt: 'Jan 2025 — Presente', en: 'Jan 2025 — Present' },
    previewType: 'iframe' as const,
    previewUrl: 'https://blackbelt-five.vercel.app/',
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
    year: '2024',
    highlight: true,
    role: { pt: 'AI Solutions Architect', en: 'AI Solutions Architect' },
    company: { pt: 'Freelance', en: 'Freelance' },
    desc: {
      pt: 'Arquitetura de software orientada a produto. Plataformas como BlackBelt e Aura com DDD, Event Sourcing, AI/ML.',
      en: 'Product-oriented software architecture. Platforms like BlackBelt and Aura with DDD, Event Sourcing, AI/ML.',
    },
  },
];

export const methodologySteps = [
  {
    number: '01',
    title: { pt: 'Descoberta', en: 'Discovery' },
    desc: {
      pt: 'Entendimento profundo do problema, stakeholders, restrições técnicas e métricas de sucesso. Nada é construído antes de entender o porquê.',
      en: 'Deep understanding of the problem, stakeholders, technical constraints and success metrics. Nothing is built before understanding the why.',
    },
    deliverables: {
      pt: 'Brief técnico, requisitos, métricas de sucesso',
      en: 'Technical brief, requirements, success metrics',
    },
    icon: '◎',
  },
  {
    number: '02',
    title: { pt: 'Arquitetura', en: 'Architecture' },
    desc: {
      pt: 'Definição da arquitetura de sistema, escolha de stack, modelagem de dados e ADRs (Architecture Decision Records). Cada decisão é documentada e justificada.',
      en: 'System architecture definition, stack selection, data modeling and ADRs (Architecture Decision Records). Every decision is documented and justified.',
    },
    deliverables: {
      pt: 'System design, ADRs, diagramas',
      en: 'System design, ADRs, diagrams',
    },
    icon: '◇',
  },
  {
    number: '03',
    title: { pt: 'Implementação', en: 'Implementation' },
    desc: {
      pt: 'Desenvolvimento iterativo com sprints curtos, code reviews rigorosos e testes automatizados. TypeScript strict e CI/CD desde o dia 1.',
      en: 'Iterative development with short sprints, rigorous code reviews and automated tests. Strict TypeScript and CI/CD from day 1.',
    },
    deliverables: {
      pt: 'MVP funcional, testes, documentação',
      en: 'Functional MVP, tests, documentation',
    },
    icon: '⬡',
  },
  {
    number: '04',
    title: { pt: 'Deploy & Validação', en: 'Deploy & Validation' },
    desc: {
      pt: 'Deploy automatizado com preview environments. Validação com usuários reais, métricas de performance e ajustes baseados em feedback.',
      en: 'Automated deploy with preview environments. Validation with real users, performance metrics and feedback-based adjustments.',
    },
    deliverables: {
      pt: 'Produção live, métricas baseline',
      en: 'Live production, baseline metrics',
    },
    icon: '▲',
  },
  {
    number: '05',
    title: { pt: 'Monitoramento', en: 'Monitoring' },
    desc: {
      pt: 'Observabilidade contínua, alertas proativos e evolução baseada em dados. O lançamento é só o começo.',
      en: 'Continuous observability, proactive alerts and data-driven evolution. Launch is just the beginning.',
    },
    deliverables: {
      pt: 'Dashboards, alertas, roadmap',
      en: 'Dashboards, alerts, roadmap',
    },
    icon: '◈',
  },
];

export const certifications = [
  {
    name: 'Engenharia de Software',
    issuer: { pt: 'Centro Universitario UniFatecie — Bacharelado', en: 'Centro Universitario UniFatecie — Bachelor' },
    year: '2023 - 2027',
    status: 'in-progress' as const,
  },
  {
    name: 'Analise de Sistemas',
    issuer: { pt: 'UNOPAR — Tecnologo', en: 'UNOPAR — Associate Degree' },
    year: '2024',
    status: 'completed' as const,
  },
  {
    name: 'Logistica',
    issuer: { pt: 'UNOPAR — Tecnologo', en: 'UNOPAR — Associate Degree' },
    year: '2017 - 2021',
    status: 'completed' as const,
  },
  {
    name: 'Sustentabilidade',
    issuer: { pt: 'FGV — Qualificacao Profissional', en: 'FGV — Professional Qualification' },
    year: '2017',
    status: 'completed' as const,
  },
];

export const continuousLearning = [
  { pt: 'Arquiteturas de Agentes IA', en: 'AI Agent Architectures' },
  { pt: 'RAG & Vector Databases', en: 'RAG & Vector Databases' },
  { pt: 'System Design Patterns', en: 'System Design Patterns' },
  { pt: 'Cloud Architecture (AWS/GCP)', en: 'Cloud Architecture (AWS/GCP)' },
  { pt: 'Liderança Técnica & Mentoria', en: 'Technical Leadership & Mentoring' },
];

export const contactLinks = [
  {
    label: 'Email (Outlook)',
    value: 'gregoryguimaraes12@outlook.com',
    href: 'mailto:gregoryguimaraes12@outlook.com',
  },
  {
    label: 'Email (Gmail)',
    value: 'gregoryguimaraes12@gmail.com',
    href: 'mailto:gregoryguimaraes12@gmail.com',
  },
  {
    label: 'WhatsApp',
    value: '+55 31 99679-3625',
    href: 'https://wa.me/5531996793625',
  },
  {
    label: 'Telefone',
    value: '+55 31 99679-3625',
    href: 'tel:+5531996793625',
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
];
