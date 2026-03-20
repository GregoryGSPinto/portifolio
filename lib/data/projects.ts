export type ProjectCategory = 'enterprise' | 'ai-ml' | 'frontend';

type LocalizedText = { pt: string; en: string };

export interface ProjectMetric {
  value: string;
  label: LocalizedText;
  context?: LocalizedText;
}

export interface ProjectDecision {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProjectHighlight {
  title: LocalizedText;
  description: LocalizedText;
}

export interface Project {
  slug: string;
  order: number;
  title: string;
  subtitle: LocalizedText;
  description: LocalizedText;
  context: LocalizedText;
  role: LocalizedText;
  metrics: ProjectMetric[];
  stack: string[];
  links: { live?: string; github?: string };
  featured: boolean;
  spotlight?: boolean;
  category: ProjectCategory;
  categoryLabel: LocalizedText;
  gradient: string;
  image?: string;
  relatedSlugs?: string[];
  challenge?: LocalizedText;
  approach?: LocalizedText;
  architecture?: LocalizedText;
  results?: LocalizedText;
  outcomeSummary: LocalizedText;
  timeline?: LocalizedText;
  highlights: ProjectHighlight[];
  tradeoffs: ProjectHighlight[];
  decisions?: ProjectDecision[];
}

export const projects: Project[] = [
  {
    slug: 'blackbelt-v2',
    order: 1,
    title: 'BlackBelt v2',
    subtitle: {
      pt: 'Plataforma moderna para gestao e experiencia digital em academias',
      en: 'Modern platform for gym management and digital training experience',
    },
    description: {
      pt: 'Plataforma moderna para gestao e experiencia digital em academias e treinamento, com foco em recorrencia, graduacoes e sinais analiticos.',
      en: 'Modern platform for gym management and digital training experience, focused on recurring revenue, belt progress, and analytics.',
    },
    context: {
      pt: 'Academias de luta dependiam de planilhas, WhatsApp e sistemas paralelos para gerenciar alunos, graduacoes e conteudo de treino.',
      en: 'Martial arts gyms relied on spreadsheets, WhatsApp, and fragmented systems to manage students, belt progressions, and training content.',
    },
    role: {
      pt: 'Responsavel por estrategia de produto, arquitetura full-stack e modelagem de dominio.',
      en: 'Owned product strategy, full-stack architecture, and domain modeling.',
    },
    metrics: [
      { value: '100%', label: { pt: 'Serverless', en: 'Serverless' }, context: { pt: 'Zero servidor gerenciado', en: 'Zero managed servers' } },
      { value: '<2s', label: { pt: 'First Paint', en: 'First Paint' }, context: { pt: 'Em conexao 4G', en: 'On 4G connection' } },
      { value: 'RLS', label: { pt: 'Seguranca', en: 'Security' }, context: { pt: 'Row Level Security ativo', en: 'Row Level Security active' } },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'RLS'],
    links: {
      live: 'https://blackbeltv2.vercel.app/',
      github: 'https://github.com/GregoryGSPinto/blackbelt-v2',
    },
    featured: true,
    spotlight: true,
    category: 'frontend',
    categoryLabel: { pt: 'SaaS operacional', en: 'Operational SaaS' },
    gradient: 'from-orange-500/20 via-red-500/10 to-amber-500/20',
    image: '/images/projects/blackbelt-v2.png',
    relatedSlugs: ['aura-v1'],
    challenge: {
      pt: 'Criar um sistema unificado que atendesse rotina academica, progressao de alunos e operacao financeira sem virar um painel generico.',
      en: 'Build a unified system for academy routines, student progression, and finance without turning it into a generic admin panel.',
    },
    approach: {
      pt: 'Estruturei o produto em bounded contexts e usei Supabase para auth, dados e realtime, mantendo velocidade de entrega sem perder governanca.',
      en: 'I structured the product around bounded contexts and used Supabase for auth, data, and realtime while preserving delivery speed and governance.',
    },
    architecture: {
      pt: 'Next.js com App Router, Supabase como backend gerenciado, regras de acesso via RLS e interface responsiva com Tailwind CSS.',
      en: 'Next.js with App Router, Supabase as the managed backend, access rules with RLS, and responsive interface with Tailwind CSS.',
    },
    results: {
      pt: 'Plataforma v2 lancada com arquitetura serverless, custo operacional proximo de zero e experiencia digital moderna para academias.',
      en: 'Platform v2 launched with serverless architecture, near-zero operational cost, and modern digital experience for gyms.',
    },
    outcomeSummary: {
      pt: 'Posicionei o sistema como produto operacional de nicho, com arquitetura suficiente para crescer sem sobreengenharia desnecessaria.',
      en: 'I positioned the system as a niche operational product with enough architecture to scale without unnecessary over-engineering.',
    },
    timeline: { pt: '2025 · SaaS para academias', en: '2025 · Gym SaaS platform' },
    highlights: [
      {
        title: { pt: 'Produto e stack alinhados', en: 'Product and stack aligned' },
        description: {
          pt: 'A arquitetura serverless favoreceu velocidade, custo controlado e deploy simples.',
          en: 'The serverless architecture favored speed, controlled cost, and simple deployment.',
        },
      },
      {
        title: { pt: 'Multi-tenant com disciplina', en: 'Disciplined multi-tenancy' },
        description: {
          pt: 'RLS e contexto de academia ajudaram a manter isolamento de dados sem complexidade excessiva.',
          en: 'RLS and the academy context kept data isolated without excessive complexity.',
        },
      },
    ],
    tradeoffs: [
      {
        title: { pt: 'Supabase sobre backend custom', en: 'Supabase over custom backend' },
        description: {
          pt: 'Acelerou entrega e infra, com menos controle de baixo nivel e mais dependencia da plataforma.',
          en: 'Accelerated delivery and infrastructure with less low-level control and more platform dependency.',
        },
      },
    ],
    decisions: [
      {
        title: { pt: 'Next.js para produto operacional', en: 'Next.js for an operational product' },
        description: {
          pt: 'Permitiu combinar UX, SEO e velocidade de entrega na mesma base.',
          en: 'It made it possible to combine UX, SEO, and delivery speed in one codebase.',
        },
      },
      {
        title: { pt: 'Supabase com RLS', en: 'Supabase with RLS' },
        description: {
          pt: 'Atendeu auth, dados e multi-tenancy com menos friccao operacional.',
          en: 'Handled auth, data, and multi-tenancy with lower operational friction.',
        },
      },
    ],
  },
  {
    slug: 'aura-v1',
    order: 2,
    title: 'Aura v1',
    subtitle: {
      pt: 'Assistente operacional local-first',
      en: 'Local-first operational assistant',
    },
    description: {
      pt: 'Assistente operacional local-first que funciona offline e prioriza privacidade e autonomia do usuario.',
      en: 'Local-first operational assistant that works offline and prioritizes user privacy and autonomy.',
    },
    context: {
      pt: 'Assistentes de IA dependem de conexao e servidores externos. Em contextos operacionais, a disponibilidade e privacidade dos dados sao prioridade.',
      en: 'AI assistants depend on connection and external servers. In operational contexts, data availability and privacy are the priority.',
    },
    role: {
      pt: 'Arquiteto e desenvolvedor, responsavel pelo design local-first e implementacao do assistente.',
      en: 'Architect and developer, responsible for local-first design and assistant implementation.',
    },
    metrics: [
      { value: 'Local', label: { pt: 'Execucao', en: 'Execution' }, context: { pt: 'Sem dependencia de servidor', en: 'No server dependency' } },
      { value: 'Offline', label: { pt: 'Disponivel', en: 'Available' }, context: { pt: 'Funciona sem internet', en: 'Works without internet' } },
    ],
    stack: ['React', 'TypeScript', 'Local-first', 'Vercel'],
    links: {
      live: 'https://aura-assistent.vercel.app/chat',
      github: 'https://github.com/GregoryGSPinto/aura_v1',
    },
    featured: true,
    category: 'ai-ml',
    categoryLabel: { pt: 'IA local-first', en: 'Local-first AI' },
    gradient: 'from-rose-500/20 via-pink-500/10 to-fuchsia-500/20',
    image: '/images/projects/aura-v1.png',
    relatedSlugs: ['blackbelt-v2'],
    challenge: {
      pt: 'Criar um assistente operacional que funcione localmente, sem dependencia de servidores externos ou conexao constante.',
      en: 'Create an operational assistant that runs locally without depending on external servers or constant connectivity.',
    },
    approach: {
      pt: 'Arquitetura local-first com processamento no cliente, persistencia local e sincronizacao oportunista.',
      en: 'Local-first architecture with client-side processing, local persistence, and opportunistic synchronization.',
    },
    results: {
      pt: 'Assistente operacional funcional em modo offline, com privacidade de dados e autonomia completa do usuario.',
      en: 'Functional operational assistant in offline mode, with data privacy and full user autonomy.',
    },
    outcomeSummary: {
      pt: 'Provei que e possivel entregar assistencia inteligente sem sacrificar privacidade ou disponibilidade.',
      en: 'I proved that intelligent assistance can be delivered without sacrificing privacy or availability.',
    },
    timeline: { pt: '2025 · Assistente local-first', en: '2025 · Local-first assistant' },
    highlights: [
      {
        title: { pt: 'Local-first', en: 'Local-first' },
        description: {
          pt: 'Dados e processamento no dispositivo do usuario, sem dependencia externa.',
          en: 'Data and processing on the user device, without external dependency.',
        },
      },
      {
        title: { pt: 'Privacidade por design', en: 'Privacy by design' },
        description: {
          pt: 'Nenhum dado sensivel transita por servidores externos.',
          en: 'No sensitive data passes through external servers.',
        },
      },
    ],
    tradeoffs: [
      {
        title: { pt: 'Local sobre cloud', en: 'Local over cloud' },
        description: {
          pt: 'Ganho de privacidade e disponibilidade, com limitacao em capacidade de modelos maiores.',
          en: 'Gains in privacy and availability, with limitations on larger model capabilities.',
        },
      },
    ],
  },
];

export const projectCategories = [
  { id: 'all' as const, label: { pt: 'Todos', en: 'All' } },
  { id: 'enterprise' as const, label: { pt: 'Enterprise', en: 'Enterprise' } },
  { id: 'ai-ml' as const, label: { pt: 'IA aplicada', en: 'Applied AI' } },
  { id: 'frontend' as const, label: { pt: 'Frontend', en: 'Frontend' } },
];

export type CategoryFilter = (typeof projectCategories)[number]['id'];

function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: CategoryFilter): Project[] {
  if (category === 'all') return sortProjects(projects);
  return sortProjects(projects.filter((project) => project.category === category));
}

export function getLeadProject(): Project | undefined {
  return sortProjects(projects).find((project) => project.spotlight) ?? sortProjects(projects)[0];
}

export function getRelatedProjects(project: Project, limit = 2): Project[] {
  const relatedFromConfig = (project.relatedSlugs ?? [])
    .map((slug) => getProjectBySlug(slug))
    .filter((candidate): candidate is Project => candidate !== undefined && candidate.slug !== project.slug);

  if (relatedFromConfig.length >= limit) {
    return relatedFromConfig.slice(0, limit);
  }

  const fallback = sortProjects(
    projects.filter((candidate) => (
      candidate.slug !== project.slug
      && candidate.category === project.category
      && !relatedFromConfig.some((related) => related.slug === candidate.slug)
    )),
  );

  return [...relatedFromConfig, ...fallback].slice(0, limit);
}
