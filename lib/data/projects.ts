export type ProjectCategory = 'enterprise' | 'ai-ml' | 'frontend' | 'railway';

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
  {
    slug: 'rail360',
    order: 3,
    title: 'Rail 360',
    subtitle: {
      pt: 'Plataforma digital de passagem de servico para patios ferroviarios',
      en: 'Digital shift handover platform for railway yard operations',
    },
    description: {
      pt: 'Plataforma enterprise que substitui processos manuais de passagem de servico em patios ferroviarios por um sistema digital com audit trail, RBAC e sincronizacao offline.',
      en: 'Enterprise platform replacing paper-based shift handover in railway yards with a digital system featuring audit trails, RBAC, and offline sync.',
    },
    context: {
      pt: 'Operacoes em patios ferroviarios dependiam de formularios em papel e comunicacao verbal, gerando riscos de seguranca e perda de informacao entre turnos.',
      en: 'Railway yard operations relied on paper forms and verbal communication, creating safety risks and information loss between shifts.',
    },
    role: {
      pt: 'Arquiteto e desenvolvedor full-stack. Responsavel por DDD, event sourcing e integracao offline-first.',
      en: 'Full-stack architect and developer. Responsible for DDD, event sourcing, and offline-first integration.',
    },
    metrics: [
      { value: 'DDD', label: { pt: 'Arquitetura', en: 'Architecture' }, context: { pt: 'Domain-Driven Design com CQRS', en: 'Domain-Driven Design with CQRS' } },
      { value: 'Offline', label: { pt: 'Sync Engine', en: 'Sync Engine' }, context: { pt: 'IndexedDB + batch sync 30s', en: 'IndexedDB + 30s batch sync' } },
      { value: 'SHA-256', label: { pt: 'Audit Trail', en: 'Audit Trail' }, context: { pt: 'Hash chain para integridade', en: 'Hash chain for integrity' } },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'MySQL', 'Sequelize', 'Socket.IO', 'JWT', 'DDD', 'CQRS'],
    links: {
      live: 'https://rail360.vercel.app',
      github: 'https://github.com/GregoryGSPinto/rail360',
    },
    featured: true,
    category: 'railway',
    categoryLabel: { pt: 'Industria ferroviaria', en: 'Railway industry' },
    gradient: 'from-teal-500/20 via-emerald-500/10 to-cyan-500/20',
    relatedSlugs: ['t4-platform', 'rail-ecosystem'],
    challenge: {
      pt: 'Digitalizar um processo critico de seguranca com 10 perfis de acesso, operacao 24/7, e funcionamento offline obrigatorio em areas sem sinal.',
      en: 'Digitize a safety-critical process with 10 access roles, 24/7 operation, and mandatory offline support in no-signal areas.',
    },
    approach: {
      pt: 'Modelei o dominio com DDD e event sourcing. IndexedDB como event store local com sync engine de 30s. Hash chain SHA-256 para auditoria.',
      en: 'Modeled the domain with DDD and event sourcing. IndexedDB as local event store with 30s sync engine. SHA-256 hash chain for audit.',
    },
    architecture: {
      pt: 'Frontend React + Vite com PWA. Backend Express + MySQL com Sequelize. Realtime via Socket.IO. RBAC com 10 perfis via JWT.',
      en: 'React + Vite frontend with PWA. Express + MySQL backend with Sequelize. Realtime via Socket.IO. RBAC with 10 roles via JWT.',
    },
    results: {
      pt: 'Sistema completo de passagem de servico digital com zero perda de dados, audit trail imutavel e operacao offline transparente.',
      en: 'Complete digital shift handover system with zero data loss, immutable audit trail, and transparent offline operation.',
    },
    outcomeSummary: {
      pt: 'Demonstrei que processos criticos de seguranca podem ser digitalizados com arquitetura resiliente e offline-first.',
      en: 'Demonstrated that safety-critical processes can be digitized with resilient, offline-first architecture.',
    },
    timeline: { pt: '2025 · Plataforma ferroviaria enterprise', en: '2025 · Enterprise railway platform' },
    highlights: [
      {
        title: { pt: 'Event sourcing pragmatico', en: 'Pragmatic event sourcing' },
        description: {
          pt: 'IndexedDB como event store local com projecoes CQRS, permitindo operacao offline completa e sync transparente.',
          en: 'IndexedDB as local event store with CQRS projections, enabling full offline operation and transparent sync.',
        },
      },
      {
        title: { pt: 'Seguranca auditavel', en: 'Auditable security' },
        description: {
          pt: 'Hash chain SHA-256 garante integridade de cada registro. RBAC granular com 10 perfis distintos.',
          en: 'SHA-256 hash chain ensures record integrity. Granular RBAC with 10 distinct roles.',
        },
      },
    ],
    tradeoffs: [
      {
        title: { pt: 'MySQL sobre PostgreSQL', en: 'MySQL over PostgreSQL' },
        description: {
          pt: 'Escolha alinhada com infraestrutura existente do cliente, mesmo com menos recursos nativos de JSON.',
          en: 'Choice aligned with existing client infrastructure, despite fewer native JSON features.',
        },
      },
    ],
    decisions: [
      {
        title: { pt: 'Event Sourcing com IndexedDB', en: 'Event Sourcing with IndexedDB' },
        description: {
          pt: 'Permitiu offline-first real com audit trail imutavel sem depender de backend para persistencia inicial.',
          en: 'Enabled real offline-first with immutable audit trail without depending on backend for initial persistence.',
        },
      },
    ],
  },
  {
    slug: 'rail-ecosystem',
    order: 4,
    title: 'Rail Ecosystem',
    subtitle: {
      pt: 'Ecossistema de simulacao e capacitacao ferroviaria com 3D',
      en: 'Railway simulation and training ecosystem with 3D',
    },
    description: {
      pt: 'Monorepo com simulador 3D ferroviario, portal de treinamento e biblioteca de componentes compartilhados para capacitacao de operadores.',
      en: 'Monorepo with 3D railway simulator, training portal, and shared component library for operator training.',
    },
    context: {
      pt: 'Treinamento de operadores ferroviarios dependia de materiais estaticos e sessoes presenciais, sem simulacao interativa ou metricas de aprendizado.',
      en: 'Railway operator training relied on static materials and in-person sessions, without interactive simulation or learning metrics.',
    },
    role: {
      pt: 'Arquiteto do monorepo e desenvolvedor do simulador 3D. Responsavel por design system compartilhado e integracao entre apps.',
      en: 'Monorepo architect and 3D simulator developer. Responsible for shared design system and cross-app integration.',
    },
    metrics: [
      { value: '3D', label: { pt: 'Simulador', en: 'Simulator' }, context: { pt: 'Three.js + React Three Fiber', en: 'Three.js + React Three Fiber' } },
      { value: '7', label: { pt: 'Packages', en: 'Packages' }, context: { pt: 'Monorepo pnpm workspaces', en: 'pnpm workspaces monorepo' } },
      { value: 'Shared', label: { pt: 'Design System', en: 'Design System' }, context: { pt: 'Tokens e componentes compartilhados', en: 'Shared tokens and components' } },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Three.js', 'React Three Fiber', 'Zustand', 'pnpm', 'Vitest'],
    links: {
      live: 'https://rail-ecosystem.vercel.app',
      github: 'https://github.com/GregoryGSPinto/rail-ecosystem',
    },
    featured: false,
    category: 'railway',
    categoryLabel: { pt: 'Simulacao ferroviaria', en: 'Railway simulation' },
    gradient: 'from-sky-500/20 via-blue-500/10 to-indigo-500/20',
    relatedSlugs: ['rail360', 't4-platform'],
    challenge: {
      pt: 'Construir um ecossistema coeso de treinamento com simulacao 3D, compartilhando codigo entre apps sem acoplamento.',
      en: 'Build a cohesive training ecosystem with 3D simulation, sharing code across apps without coupling.',
    },
    approach: {
      pt: 'Monorepo com pnpm workspaces. Shared types, design tokens e componentes em packages dedicados. Three.js para simulacao realista.',
      en: 'Monorepo with pnpm workspaces. Shared types, design tokens, and components in dedicated packages. Three.js for realistic simulation.',
    },
    results: {
      pt: 'Ecossistema funcional com simulador 3D interativo, portal de treinamento e arquitetura modular para expansao.',
      en: 'Functional ecosystem with interactive 3D simulator, training portal, and modular architecture for expansion.',
    },
    outcomeSummary: {
      pt: 'Provei que monorepos com shared packages permitem escalar um ecossistema de treinamento sem duplicacao de codigo.',
      en: 'Proved that monorepos with shared packages allow scaling a training ecosystem without code duplication.',
    },
    timeline: { pt: '2025 · Ecossistema de simulacao', en: '2025 · Simulation ecosystem' },
    highlights: [
      {
        title: { pt: 'Simulacao 3D interativa', en: 'Interactive 3D simulation' },
        description: {
          pt: 'Three.js + R3F para renderizacao realista de cenarios ferroviarios com interacao em tempo real.',
          en: 'Three.js + R3F for realistic railway scenario rendering with real-time interaction.',
        },
      },
      {
        title: { pt: 'Monorepo coeso', en: 'Cohesive monorepo' },
        description: {
          pt: 'Packages compartilhados garantem consistencia visual e tipagem entre apps sem acoplamento.',
          en: 'Shared packages ensure visual and typing consistency across apps without coupling.',
        },
      },
    ],
    tradeoffs: [
      {
        title: { pt: 'Three.js sobre engine dedicada', en: 'Three.js over dedicated engine' },
        description: {
          pt: 'Maior flexibilidade e integracao com React, mas exige mais trabalho manual para fisica e otimizacao.',
          en: 'Greater flexibility and React integration, but requires more manual work for physics and optimization.',
        },
      },
    ],
  },
  {
    slug: 't4-platform',
    order: 5,
    title: 'T4 Platform',
    subtitle: {
      pt: 'Super app PWA para operadores ferroviarios',
      en: 'Mobile-first PWA super app for railway operators',
    },
    description: {
      pt: 'PWA mobile-first que consolida ferramentas operacionais para maquinistas: calculadora, escala, ART, contatos, timer e IA offline.',
      en: 'Mobile-first PWA consolidating operational tools for train operators: calculator, schedules, safety forms, contacts, timer, and offline AI.',
    },
    context: {
      pt: 'Maquinistas usavam multiplos aplicativos e documentos em papel para tarefas diarias. Nenhuma ferramenta integrada e offline existia.',
      en: 'Train operators used multiple apps and paper documents for daily tasks. No integrated, offline tool existed.',
    },
    role: {
      pt: 'Arquiteto e desenvolvedor unico. Responsavel por PWA, testes e design mobile-first.',
      en: 'Solo architect and developer. Responsible for PWA, testing, and mobile-first design.',
    },
    metrics: [
      { value: '272', label: { pt: 'Testes', en: 'Tests' }, context: { pt: '87% de cobertura', en: '87% coverage' } },
      { value: 'PWA', label: { pt: 'Instalavel', en: 'Installable' }, context: { pt: 'Service Worker + Workbox', en: 'Service Worker + Workbox' } },
      { value: 'Offline', label: { pt: 'IA Local', en: 'Local AI' }, context: { pt: 'Classificador com 30+ intents', en: 'Classifier with 30+ intents' } },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'PWA', 'Vitest', 'Workbox', 'IndexedDB'],
    links: {
      live: 'https://t4-platform.vercel.app',
      github: 'https://github.com/GregoryGSPinto/t4-platform',
    },
    featured: true,
    category: 'railway',
    categoryLabel: { pt: 'Operacao ferroviaria', en: 'Railway operations' },
    gradient: 'from-emerald-500/20 via-green-500/10 to-lime-500/20',
    relatedSlugs: ['rail360', 't4-deslocamento'],
    challenge: {
      pt: 'Criar um super app que funcione 100% offline em areas sem sinal, com UX otimizada para uso em campo durante operacao ferroviaria.',
      en: 'Build a super app that works 100% offline in no-signal areas, with UX optimized for field use during railway operations.',
    },
    approach: {
      pt: 'PWA com Service Worker e Workbox. IA offline com classificador regex de 30+ intents. IndexedDB para persistencia local.',
      en: 'PWA with Service Worker and Workbox. Offline AI with 30+ intent regex classifier. IndexedDB for local persistence.',
    },
    architecture: {
      pt: 'React 19 + Vite 8. PWA com precache de todos os assets. Dark theme otimizado para uso noturno. 272 testes automatizados.',
      en: 'React 19 + Vite 8. PWA with full asset precaching. Dark theme optimized for nighttime use. 272 automated tests.',
    },
    results: {
      pt: 'Super app funcional instalavel em qualquer dispositivo, operando 100% offline com IA local e cobertura de testes de 87%.',
      en: 'Functional installable super app on any device, operating 100% offline with local AI and 87% test coverage.',
    },
    outcomeSummary: {
      pt: 'Demonstrei que PWAs podem substituir apps nativos em contextos industriais criticos com offline total e alta qualidade.',
      en: 'Demonstrated that PWAs can replace native apps in critical industrial contexts with full offline and high quality.',
    },
    timeline: { pt: '2025 · Super app ferroviario', en: '2025 · Railway super app' },
    highlights: [
      {
        title: { pt: '100% offline', en: '100% offline' },
        description: {
          pt: 'Todas as funcionalidades operam sem conexao. Precache de assets via Workbox e dados em IndexedDB.',
          en: 'All features work without connection. Asset precaching via Workbox and data in IndexedDB.',
        },
      },
      {
        title: { pt: 'Cobertura de testes robusta', en: 'Robust test coverage' },
        description: {
          pt: '272 testes automatizados com 87% de cobertura. CI via GitHub Actions.',
          en: '272 automated tests with 87% coverage. CI via GitHub Actions.',
        },
      },
    ],
    tradeoffs: [
      {
        title: { pt: 'PWA sobre app nativo', en: 'PWA over native app' },
        description: {
          pt: 'Distribuicao universal sem app stores, com trade-off em acesso a APIs nativas de dispositivo.',
          en: 'Universal distribution without app stores, with trade-off in native device API access.',
        },
      },
    ],
  },
  {
    slug: 't4-deslocamento',
    order: 6,
    title: 'T4 Deslocamento',
    subtitle: {
      pt: 'Gestao inteligente de deslocamento pre-jornada',
      en: 'Pre-shift commute management system',
    },
    description: {
      pt: 'Sistema de gestao de deslocamento pre-jornada que coordena motoristas e operadores como um Uber corporativo, com tracking em tempo real e BI integrado.',
      en: 'Pre-shift commute management system coordinating drivers and operators like a corporate Uber, with real-time tracking and integrated BI.',
    },
    context: {
      pt: 'Deslocamento pre-jornada era coordenado manualmente por telefone, gerando atrasos, custos excessivos e falta de rastreabilidade.',
      en: 'Pre-shift commutes were coordinated manually by phone, causing delays, excessive costs, and lack of traceability.',
    },
    role: {
      pt: 'Arquiteto e desenvolvedor full-stack. Responsavel por integracao com mapas, BI e modelagem de rotas.',
      en: 'Full-stack architect and developer. Responsible for maps integration, BI, and route modeling.',
    },
    metrics: [
      { value: 'Maps', label: { pt: 'Azure Maps', en: 'Azure Maps' }, context: { pt: 'Tracking e rotas em tempo real', en: 'Real-time tracking and routes' } },
      { value: 'BI', label: { pt: 'Dashboards', en: 'Dashboards' }, context: { pt: 'Recharts + Power BI', en: 'Recharts + Power BI' } },
      { value: '693', label: { pt: 'Testes', en: 'Tests' }, context: { pt: 'Vitest + Playwright E2E', en: 'Vitest + Playwright E2E' } },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'Prisma', 'MySQL', 'Azure Maps', 'Zustand'],
    links: {
      live: 'https://t4-deslocamento.vercel.app',
      github: 'https://github.com/GregoryGSPinto/t4-deslocamento',
    },
    featured: false,
    category: 'railway',
    categoryLabel: { pt: 'Logistica ferroviaria', en: 'Railway logistics' },
    gradient: 'from-amber-500/20 via-yellow-500/10 to-orange-500/20',
    relatedSlugs: ['t4-platform', 'rail360'],
    challenge: {
      pt: 'Substituir coordenacao manual por telefone por um sistema automatizado com tracking GPS, BI e compliance LGPD.',
      en: 'Replace manual phone coordination with an automated system featuring GPS tracking, BI, and LGPD compliance.',
    },
    approach: {
      pt: 'Frontend React 19 com Azure Maps para visualizacao. Backend Express com Prisma e MySQL. BI integrado com Recharts.',
      en: 'React 19 frontend with Azure Maps for visualization. Express backend with Prisma and MySQL. Integrated BI with Recharts.',
    },
    results: {
      pt: 'Sistema completo de gestao de deslocamento com rastreamento em tempo real, dashboards operacionais e 693 testes automatizados.',
      en: 'Complete commute management system with real-time tracking, operational dashboards, and 693 automated tests.',
    },
    outcomeSummary: {
      pt: 'Transformei um processo manual e fragil em um sistema digital rastreavel e auditavel.',
      en: 'Transformed a manual, fragile process into a traceable and auditable digital system.',
    },
    timeline: { pt: '2025 · Gestao de deslocamento', en: '2025 · Commute management' },
    highlights: [
      {
        title: { pt: 'Tracking em tempo real', en: 'Real-time tracking' },
        description: {
          pt: 'Azure Maps com atualizacao de posicao em tempo real de motoristas e operadores.',
          en: 'Azure Maps with real-time position updates for drivers and operators.',
        },
      },
      {
        title: { pt: 'BI operacional integrado', en: 'Integrated operational BI' },
        description: {
          pt: 'Dashboards com Recharts e integracao Power BI para metricas de custo, tempo e eficiencia.',
          en: 'Dashboards with Recharts and Power BI integration for cost, time, and efficiency metrics.',
        },
      },
    ],
    tradeoffs: [
      {
        title: { pt: 'Azure Maps sobre Google Maps', en: 'Azure Maps over Google Maps' },
        description: {
          pt: 'Integracao com ecossistema Azure existente, com trade-off em comunidade e documentacao mais limitadas.',
          en: 'Integration with existing Azure ecosystem, with trade-off in smaller community and documentation.',
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
  { id: 'railway' as const, label: { pt: 'Ferroviario', en: 'Railway' } },
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
