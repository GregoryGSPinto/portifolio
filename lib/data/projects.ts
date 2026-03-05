export type ProjectCategory = 'enterprise' | 'ai-ml' | 'frontend';

export interface ProjectMetric {
  value: string;
  label: { pt: string; en: string };
}

export interface ProjectDecision {
  title: { pt: string; en: string };
  description: { pt: string; en: string };
}

export interface Project {
  slug: string;
  title: string;
  subtitle: { pt: string; en: string };
  description: { pt: string; en: string };
  metrics: ProjectMetric[];
  stack: string[];
  links: { live?: string; github?: string };
  featured: boolean;
  category: ProjectCategory;
  gradient: string;
  challenge?: { pt: string; en: string };
  approach?: { pt: string; en: string };
  architecture?: { pt: string; en: string };
  results?: { pt: string; en: string };
  decisions?: ProjectDecision[];
  timeline?: { pt: string; en: string };
}

export const projects: Project[] = [
  {
    slug: 'efvm360',
    title: 'EFVM 360',
    subtitle: {
      pt: 'Plataforma Enterprise de Operacoes Ferroviarias',
      en: 'Enterprise Railway Operations Platform',
    },
    description: {
      pt: 'Plataforma de gestao digital para operacoes ferroviarias de carga pesada. Sistema completo com 15 modulos integrados, arquitetura DDD com Event Sourcing e 451 testes automatizados.',
      en: 'Digital management platform for heavy-cargo railway operations. Complete system with 15 integrated modules, DDD architecture with Event Sourcing and 451 automated tests.',
    },
    metrics: [
      { value: '451', label: { pt: 'Testes', en: 'Tests' } },
      { value: '15', label: { pt: 'Modulos', en: 'Modules' } },
      { value: '19', label: { pt: 'API Endpoints', en: 'API Endpoints' } },
      { value: '5', label: { pt: 'Aggregates DDD', en: 'DDD Aggregates' } },
    ],
    stack: ['React 18', 'TypeScript', 'Vite', 'Express', 'MySQL', 'Azure', 'Docker', 'ECharts', 'DDD', 'Event Sourcing'],
    links: {
      live: 'https://efvm360.vercel.app',
      github: 'https://github.com/GregoryGSPinto/efvm360',
    },
    featured: true,
    category: 'enterprise',
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-blue-500/20',
    challenge: {
      pt: 'A operacao ferroviaria de carga pesada envolvia processos manuais fragmentados em planilhas, sem visibilidade em tempo real das operacoes e sem rastreabilidade de decisoes. Era necessario um sistema unificado que suportasse 15 modulos distintos com integridade de dados end-to-end.',
      en: 'Heavy-cargo railway operations involved fragmented manual processes in spreadsheets, with no real-time operational visibility and no decision traceability. A unified system was needed to support 15 distinct modules with end-to-end data integrity.',
    },
    approach: {
      pt: 'Adotei Domain-Driven Design com 5 aggregates bem definidos e Event Sourcing para garantir rastreabilidade completa. A arquitetura modular permitiu desenvolvimento paralelo de modulos independentes com contratos claros via API REST.',
      en: 'I adopted Domain-Driven Design with 5 well-defined aggregates and Event Sourcing to ensure complete traceability. The modular architecture enabled parallel development of independent modules with clear contracts via REST API.',
    },
    architecture: {
      pt: 'Frontend em React 18 com TypeScript e Vite para build rapido. Backend em Express com MySQL e camadas bem definidas (Application, Domain, Infrastructure). Deploy em Azure com Docker containers. Visualizacoes de dados com ECharts.',
      en: 'Frontend in React 18 with TypeScript and Vite for fast builds. Backend in Express with MySQL and well-defined layers (Application, Domain, Infrastructure). Deploy on Azure with Docker containers. Data visualizations with ECharts.',
    },
    results: {
      pt: '451 testes automatizados com cobertura completa dos bounded contexts. 19 endpoints RESTful com documentacao OpenAPI. Sistema em producao suportando operacoes diarias de carga ferroviaria.',
      en: '451 automated tests with complete bounded context coverage. 19 RESTful endpoints with OpenAPI documentation. System in production supporting daily railway cargo operations.',
    },
    decisions: [
      {
        title: { pt: 'DDD com Event Sourcing', en: 'DDD with Event Sourcing' },
        description: {
          pt: 'Escolhi Event Sourcing para manter historico completo de todas as mudancas de estado nas operacoes ferroviarias. Cada evento e imutavel e auditavel, essencial para compliance em operacoes de carga pesada.',
          en: 'Chose Event Sourcing to maintain complete history of all state changes in railway operations. Each event is immutable and auditable, essential for compliance in heavy-cargo operations.',
        },
      },
      {
        title: { pt: 'React 18 + Vite', en: 'React 18 + Vite' },
        description: {
          pt: 'Vite foi escolhido pelo HMR instantaneo e build otimizado. React 18 com Suspense boundaries para loading states consistentes nos 15 modulos.',
          en: 'Vite was chosen for instant HMR and optimized builds. React 18 with Suspense boundaries for consistent loading states across 15 modules.',
        },
      },
      {
        title: { pt: 'MySQL sobre NoSQL', en: 'MySQL over NoSQL' },
        description: {
          pt: 'Dados ferroviarios sao altamente relacionais com integridade referencial critica. MySQL oferece ACID transactions essenciais para consistencia de dados em operacoes de carga.',
          en: 'Railway data is highly relational with critical referential integrity. MySQL offers ACID transactions essential for data consistency in cargo operations.',
        },
      },
    ],
    timeline: { pt: '2024 — 4 meses', en: '2024 — 4 months' },
  },
  {
    slug: 'blackbelt-os',
    title: 'BlackBelt OS',
    subtitle: {
      pt: 'SaaS para Academias de Artes Marciais',
      en: 'Martial Arts Academy SaaS',
    },
    description: {
      pt: 'Sistema operacional completo para academias de artes marciais com IA/ML integrado. 8 engines de Machine Learning, 109 paginas e arquitetura baseada em 7 Bounded Contexts.',
      en: 'Complete operating system for martial arts academies with integrated AI/ML. 8 Machine Learning engines, 109 pages and architecture based on 7 Bounded Contexts.',
    },
    metrics: [
      { value: '473', label: { pt: 'Testes', en: 'Tests' } },
      { value: '8', label: { pt: 'Engines ML', en: 'ML Engines' } },
      { value: '109', label: { pt: 'Paginas', en: 'Pages' } },
      { value: '7', label: { pt: 'Bounded Contexts', en: 'Bounded Contexts' } },
    ],
    stack: ['Next.js 14', 'Supabase', 'TypeScript', 'Event Sourcing', 'DDD', 'AI/ML', 'TailwindCSS'],
    links: {
      live: 'https://blackbelt-five.vercel.app',
      github: 'https://github.com/GregoryGSPinto/blackbelt',
    },
    featured: true,
    category: 'enterprise',
    gradient: 'from-orange-500/20 via-red-500/10 to-purple-500/20',
    challenge: {
      pt: 'Academias de artes marciais gerenciavam alunos, graduacoes, financeiro e treinos em sistemas separados ou planilhas. Era necessario um sistema unificado com inteligencia para prever churn, otimizar treinos e automatizar processos administrativos.',
      en: 'Martial arts academies managed students, belt rankings, finances and training in separate systems or spreadsheets. A unified system was needed with intelligence to predict churn, optimize training and automate administrative processes.',
    },
    approach: {
      pt: 'Arquitetura DDD com 7 Bounded Contexts (Alunos, Graduacoes, Financeiro, Treinos, Analytics, Comunicacao, Admin). 8 engines de ML para predicao de churn, recomendacao de treinos, analise de performance e mais.',
      en: 'DDD architecture with 7 Bounded Contexts (Students, Belt Rankings, Finance, Training, Analytics, Communication, Admin). 8 ML engines for churn prediction, training recommendation, performance analysis and more.',
    },
    architecture: {
      pt: 'Next.js 14 com App Router e Server Components. Supabase para auth, database e realtime. Event Sourcing para historico completo de graduacoes e financeiro. ML engines rodando em edge functions.',
      en: 'Next.js 14 with App Router and Server Components. Supabase for auth, database and realtime. Event Sourcing for complete belt ranking and financial history. ML engines running on edge functions.',
    },
    results: {
      pt: '473 testes cobrindo todos os bounded contexts. 109 paginas implementadas com 8 engines de ML em producao. Sistema completo gerenciando operacoes diarias de academias.',
      en: '473 tests covering all bounded contexts. 109 pages implemented with 8 ML engines in production. Complete system managing daily academy operations.',
    },
    decisions: [
      {
        title: { pt: 'Next.js 14 App Router', en: 'Next.js 14 App Router' },
        description: {
          pt: 'App Router com Server Components para reducao drastica de bundle size. RSC para paginas de listagem e dashboard, client components apenas onde necessario (formularios, charts).',
          en: 'App Router with Server Components for drastic bundle size reduction. RSC for listing pages and dashboard, client components only where needed (forms, charts).',
        },
      },
      {
        title: { pt: 'Supabase como Backend', en: 'Supabase as Backend' },
        description: {
          pt: 'Supabase oferece auth, PostgreSQL, realtime subscriptions e storage em uma unica plataforma. Row Level Security para multi-tenancy nativo entre academias.',
          en: 'Supabase offers auth, PostgreSQL, realtime subscriptions and storage in a single platform. Row Level Security for native multi-tenancy between academies.',
        },
      },
      {
        title: { pt: '8 ML Engines', en: '8 ML Engines' },
        description: {
          pt: 'Cada engine de ML tem um dominio especifico: churn prediction, recomendacao de treinos, analise de performance, clustering de alunos, forecasting financeiro, deteccao de anomalias, NLP para feedback e scoring de graduacao.',
          en: 'Each ML engine has a specific domain: churn prediction, training recommendation, performance analysis, student clustering, financial forecasting, anomaly detection, NLP for feedback and belt scoring.',
        },
      },
    ],
    timeline: { pt: '2024 — 6 meses', en: '2024 — 6 months' },
  },
  {
    slug: 'portfolio',
    title: 'Portfolio',
    subtitle: {
      pt: 'Este website',
      en: 'This website',
    },
    description: {
      pt: 'Portfolio pessoal construido com Next.js 16, React 19, Framer Motion e design system customizado. Bilingue, acessivel e com score Lighthouse 95+.',
      en: 'Personal portfolio built with Next.js 16, React 19, Framer Motion and custom design system. Bilingual, accessible and 95+ Lighthouse score.',
    },
    metrics: [
      { value: '95+', label: { pt: 'Lighthouse', en: 'Lighthouse' } },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion'],
    links: {
      github: 'https://github.com/GregoryGSPinto/portfolio',
    },
    featured: false,
    category: 'frontend',
    gradient: 'from-violet-500/20 via-fuchsia-500/10 to-pink-500/20',
    challenge: {
      pt: 'Criar um portfolio que seja ao mesmo tempo uma vitrine tecnica e uma experiencia premium. Design system consistente, animacoes fluidas, bilingue e 95+ em todas as metricas do Lighthouse.',
      en: 'Create a portfolio that is both a technical showcase and a premium experience. Consistent design system, fluid animations, bilingual and 95+ on all Lighthouse metrics.',
    },
    approach: {
      pt: 'Design system com tokens customizados, tema claro/escuro com zero flash, i18n sem dependencias externas e animacoes com Framer Motion respeitando prefers-reduced-motion.',
      en: 'Design system with custom tokens, light/dark theme with zero flash, i18n without external dependencies and Framer Motion animations respecting prefers-reduced-motion.',
    },
    architecture: {
      pt: 'Next.js 16 App Router com React 19. Tailwind CSS 4 com design tokens via CSS custom properties. Framer Motion para animacoes. Context API para tema e idioma com persistencia em localStorage.',
      en: 'Next.js 16 App Router with React 19. Tailwind CSS 4 with design tokens via CSS custom properties. Framer Motion for animations. Context API for theme and language with localStorage persistence.',
    },
    results: {
      pt: 'Score Lighthouse 95+ em todas as categorias. Tema sem flash, i18n instantaneo, animacoes respeitando acessibilidade.',
      en: '95+ Lighthouse score on all categories. Flash-free theming, instant i18n, accessibility-respecting animations.',
    },
    decisions: [
      {
        title: { pt: 'CSS Custom Properties para Temas', en: 'CSS Custom Properties for Theming' },
        description: {
          pt: 'Usar CSS custom properties ao inves de classes Tailwind para tema permite transicoes suaves e zero-flash com script inline no head.',
          en: 'Using CSS custom properties instead of Tailwind classes for theming enables smooth transitions and zero-flash with inline head script.',
        },
      },
    ],
    timeline: { pt: '2025 — Em andamento', en: '2025 — Ongoing' },
  },
];

export const projectCategories = [
  { id: 'all' as const, label: { pt: 'Todos', en: 'All' } },
  { id: 'enterprise' as const, label: { pt: 'Enterprise', en: 'Enterprise' } },
  { id: 'ai-ml' as const, label: { pt: 'AI/ML', en: 'AI/ML' } },
  { id: 'frontend' as const, label: { pt: 'Frontend', en: 'Frontend' } },
];

export type CategoryFilter = typeof projectCategories[number]['id'];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: CategoryFilter): Project[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}
