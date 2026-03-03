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
  {
    id: 'shift-manager',
    slug: 'shift-manager',
    title: 'Shift Manager',
    subtitle: {
      pt: 'Sistema Inteligente de Gestão de Escalas',
      en: 'Intelligent Shift Management System',
    },
    challenge: {
      pt: 'Gestores de equipes operacionais gastavam horas toda semana montando escalas manualmente, lidando com conflitos de horário, preferências de funcionários e restrições legais de jornada. O resultado era escalas injustas, conflitos frequentes e alta rotatividade.',
      en: 'Operations team managers spent hours every week manually building schedules, dealing with time conflicts, employee preferences and legal working hour restrictions. The result was unfair schedules, frequent conflicts and high turnover.',
    },
    approach: {
      pt: 'Desenvolvi um simulador com algoritmo de distribuição balanceada que considera preferências, histórico de turnos e restrições. O sistema sugere escalas otimizadas e permite ajustes manuais com validação em tempo real. Dashboard analítico mostra métricas de equidade e cobertura.',
      en: 'I developed a simulator with a balanced distribution algorithm that considers preferences, shift history and constraints. The system suggests optimized schedules and allows manual adjustments with real-time validation. Analytical dashboard shows equity and coverage metrics.',
    },
    architecture: {
      pt: 'React SPA com state management via Context API para a lógica de escala. Algoritmo de distribuição implementado em Web Workers para não bloquear a UI. WebSocket para sincronização em tempo real entre gestores. Supabase para persistência e autenticação.',
      en: 'React SPA with Context API state management for scheduling logic. Distribution algorithm implemented in Web Workers to avoid UI blocking. WebSocket for real-time sync between managers. Supabase for persistence and authentication.',
    },
    results: {
      pt: 'Protótipo funcional que demonstra redução de 40% no tempo de criação de escalas em testes simulados. Interface responsiva funciona como PWA em dispositivos móveis dos gestores.',
      en: 'Functional prototype demonstrating 40% reduction in schedule creation time in simulated tests. Responsive interface works as PWA on managers mobile devices.',
    },
    metrics: [
      { value: '40%', label: { pt: 'Redução de Tempo', en: 'Time Reduction' }, context: { pt: 'Na criação de escalas', en: 'In schedule creation' } },
      { value: 'Real-time', label: { pt: 'Sincronização', en: 'Sync' }, context: { pt: 'WebSocket entre gestores', en: 'WebSocket between managers' } },
      { value: 'PWA', label: { pt: 'Mobile Ready', en: 'Mobile Ready' }, context: { pt: 'Funciona offline', en: 'Works offline' } },
      { value: 'Workers', label: { pt: 'Performance', en: 'Performance' }, context: { pt: 'Algoritmo não bloqueia UI', en: 'Algorithm does not block UI' } },
    ],
    decisions: [
      { title: { pt: 'Por que Web Workers?', en: 'Why Web Workers?' }, description: { pt: 'O algoritmo de distribuição processa todas as combinações possíveis. Em equipes com 20+ pessoas, isso leva segundos. Web Workers garantem que a UI continua responsiva durante o cálculo.', en: 'The distribution algorithm processes all possible combinations. For teams with 20+ people, this takes seconds. Web Workers ensure the UI stays responsive during calculation.' }, icon: '⬡' },
      { title: { pt: 'Por que PWA?', en: 'Why PWA?' }, description: { pt: 'Gestores conferem escalas no celular durante o expediente. PWA permite acesso rápido sem instalação de app, com cache offline para consulta mesmo sem internet.', en: 'Managers check schedules on mobile during shifts. PWA enables quick access without app installation, with offline cache for viewing even without internet.' }, icon: '▣' },
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'WebSocket', 'Web Workers', 'PWA', 'Charts.js'],
    url: null,
    accentColor: '#7B8794',
    stackDetails: [
      { name: 'React 18', role: { pt: 'UI reativa e componentizada', en: 'Reactive component-based UI' } },
      { name: 'TypeScript', role: { pt: 'Type safety no algoritmo', en: 'Algorithm type safety' } },
      { name: 'Web Workers', role: { pt: 'Processamento em background', en: 'Background processing' } },
      { name: 'Supabase', role: { pt: 'Persistência + Realtime', en: 'Persistence + Realtime' } },
      { name: 'Charts.js', role: { pt: 'Visualização de dados', en: 'Data visualization' } },
    ],
    timeline: { pt: 'Mar 2024 — Jun 2024', en: 'Mar 2024 — Jun 2024' },
    previewType: 'screenshots' as const,
    screenshots: [],
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
