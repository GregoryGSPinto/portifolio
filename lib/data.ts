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
    id: 'optima-work-ai',
    slug: 'optima-work-ai',
    title: 'OPTIMA WORK AI',
    subtitle: {
      pt: 'Sistema Inteligente de Gestão de Tripulação Ferroviária com IA Preditiva',
      en: 'Intelligent Railway Crew Management System with Predictive AI',
    },
    challenge: {
      pt: 'Na operação ferroviária de carga pesada da EFVM, falhas na gestão de tripulação causam prejuízos de ~R$180K/hora por trem parado, violações regulatórias de jornada de 12h, e perda de 15-20% em eficiência operacional. O processo atual depende de planilhas, telefonemas e conhecimento tribal para coordenar ~34 tripulações ativas/dia em 5 pátios.',
      en: 'In EFVM heavy-haul railway operations, crew management failures cause losses of ~R$180K/hour per stopped train, 12-hour shift regulatory violations, and 15-20% operational efficiency loss. The current process relies on spreadsheets, phone calls, and tribal knowledge to coordinate ~34 active crews/day across 5 yards.',
    },
    approach: {
      pt: 'Plataforma full-stack com motor de alocação por scoring multi-fator (localização + fadiga + certificação + performance), monitor de jornada 12h em tempo real, previsão de demanda com XGBoost, assistente RAG sobre documentação operacional (ROF), e interface de voz para supervisores em campo.',
      en: 'Full-stack platform with multi-factor scoring allocation engine (location + fatigue + certification + performance), real-time 12h shift monitor, demand forecasting with XGBoost, RAG assistant over operational documentation (ROF), and voice interface for field supervisors.',
    },
    architecture: {
      pt: 'Backend Python com FastAPI (async-first), PostgreSQL + TimescaleDB para dados transacionais e séries temporais, Redis para estado em tempo real e PubSub, Apache Kafka para event streaming entre serviços, Pinecone como vector store para RAG, XGBoost para previsão de demanda com MLflow para versionamento, e infraestrutura AWS (ECS Fargate + RDS Multi-AZ) na região sa-east-1.',
      en: 'Python backend with FastAPI (async-first), PostgreSQL + TimescaleDB for transactional and time-series data, Redis for real-time state and PubSub, Apache Kafka for inter-service event streaming, Pinecone as vector store for RAG, XGBoost for demand forecasting with MLflow versioning, and AWS infrastructure (ECS Fargate + RDS Multi-AZ) in sa-east-1 region.',
    },
    results: {
      pt: 'Arquitetura documentada com diagramas C4, 6 ADRs (Architecture Decision Records), projeção de ROI de R$4.1M/ano, sistema de scoring que elimina trens parados, monitor de 12h que previne violações regulatórias, e pipeline de ML com retreino semanal automatizado e detecção de drift.',
      en: 'Architecture documented with C4 diagrams, 6 ADRs (Architecture Decision Records), projected ROI of R$4.1M/year, scoring system that eliminates unmanned trains, 12h monitor preventing regulatory violations, and ML pipeline with automated weekly retraining and drift detection.',
    },
    metrics: [
      { value: 'R$4.1M', label: { pt: 'ROI Anual', en: 'Annual ROI' }, context: { pt: 'Projeção de economia', en: 'Projected savings' } },
      { value: '0', label: { pt: 'Trens Parados', en: 'Unmanned Trains' }, context: { pt: 'Meta: zero incidentes', en: 'Target: zero incidents' } },
      { value: '5', label: { pt: 'Pátios', en: 'Yards' }, context: { pt: 'Operação multi-pátio', en: 'Multi-yard operation' } },
      { value: '<2min', label: { pt: 'Alocação', en: 'Allocation' }, context: { pt: 'Tempo de decisão IA', en: 'AI decision time' } },
    ],
    decisions: [
      { icon: '◆', title: { pt: 'FastAPI sobre Django/NestJS', en: 'FastAPI over Django/NestJS' }, description: { pt: 'Python async-first para integração nativa com ecossistema ML (XGBoost, LangChain, MLflow). Pydantic para validação strict em operações safety-critical. WebSocket nativo para status de tripulação em tempo real.', en: 'Python async-first for native ML ecosystem integration (XGBoost, LangChain, MLflow). Pydantic for strict validation in safety-critical operations. Native WebSocket for real-time crew status.' } },
      { icon: '◇', title: { pt: 'Kafka + Redis Híbrido', en: 'Hybrid Kafka + Redis' }, description: { pt: 'Kafka para event streaming durável (audit trail regulatório, replay para ML training). Redis PubSub para fanout de baixa latência (<100ms) para dashboards WebSocket. Cada sistema otimizado para seu caso de uso.', en: 'Kafka for durable event streaming (regulatory audit trail, ML training replay). Redis PubSub for low-latency fanout (<100ms) to WebSocket dashboards. Each system optimized for its use case.' } },
      { icon: '⚡', title: { pt: 'XGBoost sobre Deep Learning', en: 'XGBoost over Deep Learning' }, description: { pt: 'Dataset de 15K registros insuficiente para redes neurais. XGBoost com SHAP values fornece interpretabilidade — supervisores precisam entender as previsões em domínio safety-critical. Inferência <10ms sem GPU.', en: 'Dataset of 15K records insufficient for neural networks. XGBoost with SHAP values provides interpretability — supervisors need to understand predictions in safety-critical domain. Inference <10ms without GPU.' } },
      { icon: '⬡', title: { pt: 'PWA + React Native', en: 'PWA + React Native' }, description: { pt: 'PWA com Service Workers para funcionamento offline em pátios com conectividade ruim. Cache local de escalas e tripulações. React Native complementar para features nativas (push, voz always-on).', en: 'PWA with Service Workers for offline operation in yards with poor connectivity. Local cache of schedules and crews. Complementary React Native for native features (push, always-on voice).' } },
    ],
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Kafka', 'XGBoost', 'Claude AI', 'RAG', 'Docker', 'AWS'],
    url: 'https://github.com/gregoryalvess/optima-work-ai',
    accentColor: '#6366F1',
    stackDetails: [
      { name: 'FastAPI', role: { pt: 'API Gateway async', en: 'Async API Gateway' } },
      { name: 'PostgreSQL + TimescaleDB', role: { pt: 'OLTP + Séries Temporais', en: 'OLTP + Time Series' } },
      { name: 'Redis', role: { pt: 'Cache + PubSub real-time', en: 'Cache + Real-time PubSub' } },
      { name: 'Apache Kafka', role: { pt: 'Event streaming durável', en: 'Durable event streaming' } },
      { name: 'XGBoost + MLflow', role: { pt: 'Previsão de demanda + ML Registry', en: 'Demand forecasting + ML Registry' } },
      { name: 'Pinecone + Claude AI', role: { pt: 'RAG sobre docs operacionais', en: 'RAG over operational docs' } },
      { name: 'React + TypeScript', role: { pt: 'Dashboard PWA offline-first', en: 'Offline-first PWA Dashboard' } },
      { name: 'AWS (ECS + RDS)', role: { pt: 'Infraestrutura sa-east-1', en: 'Infrastructure sa-east-1' } },
    ],
    timeline: { pt: '2025 · Sistema Empresarial', en: '2025 · Enterprise System' },
    previewType: 'screenshots' as const,
    screenshots: [],
  },
  {
    id: 'efvm360',
    slug: 'efvm360',
    title: 'EFVM 360',
    subtitle: {
      pt: 'Plataforma Digital de Gestão Operacional 360° para Ferrovia de Carga Pesada',
      en: '360° Digital Operations Management Platform for Heavy-Haul Railway',
    },
    challenge: {
      pt: 'Na operação 24/7 do principal pátio ferroviário da EFVM, trocas de turno dependiam de formulários em papel — gerando perda de dados, comunicação atrasada e pontos cegos de segurança. Inspetores, operadores e gestores não tinham visão unificada do status do pátio, condição de equipamentos ou postura de risco durante transições críticas entre turnos.',
      en: 'In the 24/7 operation of EFVM\'s main railway yard, shift handovers relied on paper forms — causing data loss, delayed communication, and safety blind spots. Inspectors, operators, and managers had no unified view of yard status, equipment condition, or risk posture during critical shift transitions.',
    },
    approach: {
      pt: 'Monorepo enterprise com frontend DDD (5 agregados + CQRS + Event Sourcing), 15 módulos lazy-loaded, assistente IA com voz (AdamBot), arquitetura offline-first com IndexedDB e Service Workers, backend Express com RBAC hierárquico (4 papéis), cadeia de integridade SHA-256 para audit trail, e dashboards BI+ com ECharts.',
      en: 'Enterprise monorepo with DDD frontend (5 aggregates + CQRS + Event Sourcing), 15 lazy-loaded modules, AI assistant with voice (AdamBot), offline-first architecture with IndexedDB and Service Workers, Express backend with hierarchical RBAC (4 roles), SHA-256 integrity chain for audit trail, and BI+ dashboards with ECharts.',
    },
    architecture: {
      pt: 'Frontend React 18 + Vite com camada de domínio pura (DDD), IndexedDB para persistência offline com sync automático, PWA com Workbox. Backend Express + TypeScript com Sequelize ORM sobre MySQL 8.0 (Azure Flexible Server). Autenticação JWT + Azure AD SSO (PKCE). Infraestrutura Azure com Bicep IaC, Key Vault, Application Insights, e deploy blue/green via GitHub Actions.',
      en: 'React 18 + Vite frontend with pure domain layer (DDD), IndexedDB for offline persistence with automatic sync, PWA with Workbox. Express + TypeScript backend with Sequelize ORM over MySQL 8.0 (Azure Flexible Server). JWT + Azure AD SSO (PKCE) authentication. Azure infrastructure with Bicep IaC, Key Vault, Application Insights, and blue/green deploy via GitHub Actions.',
    },
    results: {
      pt: 'Plataforma enterprise completa com 15 módulos operacionais, 19 endpoints de API, 451 testes automatizados (Vitest + Jest + Playwright + k6), documentação enterprise (C4, ADRs, runbook, LGPD, WCAG 2.1 AA), e arquitetura offline-first projetada para ambientes ferroviários com conectividade instável.',
      en: 'Complete enterprise platform with 15 operational modules, 19 API endpoints, 451 automated tests (Vitest + Jest + Playwright + k6), enterprise documentation (C4, ADRs, runbook, LGPD, WCAG 2.1 AA), and offline-first architecture designed for railway environments with unreliable connectivity.',
    },
    metrics: [
      { value: '451', label: { pt: 'Testes', en: 'Tests' }, context: { pt: 'Vitest + Jest + Playwright + k6', en: 'Vitest + Jest + Playwright + k6' } },
      { value: '15', label: { pt: 'Módulos', en: 'Modules' }, context: { pt: 'Páginas lazy-loaded', en: 'Lazy-loaded pages' } },
      { value: '19', label: { pt: 'Endpoints', en: 'Endpoints' }, context: { pt: 'Controllers REST API', en: 'REST API controllers' } },
      { value: '5', label: { pt: 'Agregados DDD', en: 'DDD Aggregates' }, context: { pt: 'Domain-Driven Design', en: 'Domain-Driven Design' } },
    ],
    decisions: [
      { icon: '◆', title: { pt: 'React + Vite sobre Next.js', en: 'React + Vite over Next.js' }, description: { pt: 'Aplicação offline-first para pátios ferroviários sem conectividade estável não se beneficia de SSR. Vite oferece HMR instantâneo no monorepo grande, e a PWA com Service Workers + IndexedDB resolve o problema de disponibilidade sem servidor.', en: 'Offline-first application for railway yards with unstable connectivity doesn\'t benefit from SSR. Vite provides instant HMR in the large monorepo, and the PWA with Service Workers + IndexedDB solves availability without a server.' } },
      { icon: '◇', title: { pt: 'Express + MySQL sobre Serverless', en: 'Express + MySQL over Serverless' }, description: { pt: 'Requisito enterprise de hosting Azure com Azure AD SSO, Key Vault, e Application Insights. MySQL 8.0 com Sequelize para dados relacionais complexos (composições, pátios, escalas) com migrações versionadas e seed data.', en: 'Enterprise Azure hosting requirement with Azure AD SSO, Key Vault, and Application Insights. MySQL 8.0 with Sequelize for complex relational data (compositions, yards, schedules) with versioned migrations and seed data.' } },
      { icon: '⚡', title: { pt: 'DDD + Event Sourcing no Frontend', en: 'DDD + Event Sourcing on Frontend' }, description: { pt: 'Domínio safety-critical exige auditabilidade total — cadeia SHA-256 garante integridade do histórico. Isolamento de lógica de domínio em agregados puros permite testes unitários sem dependência de UI ou infraestrutura.', en: 'Safety-critical domain requires full auditability — SHA-256 chain ensures history integrity. Domain logic isolation in pure aggregates enables unit tests without UI or infrastructure dependencies.' } },
      { icon: '⬡', title: { pt: 'ECharts para Dashboards BI+', en: 'ECharts for BI+ Dashboards' }, description: { pt: 'Visualizações operacionais complexas (matriz de risco 5×5, ocupação de pátio, tendências por linha) exigem biblioteca com suporte a heatmaps, gauges e gráficos compostos. ECharts oferece isso com renderização Canvas performática e bundle tree-shakeable.', en: 'Complex operational visualizations (5×5 risk matrix, yard occupancy, per-track trends) require a library supporting heatmaps, gauges, and composite charts. ECharts provides this with performant Canvas rendering and tree-shakeable bundle.' } },
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Express', 'MySQL', 'Sequelize', 'ECharts', 'Azure', 'Docker', 'DDD', 'PWA', 'JWT'],
    url: 'https://efvm360.vercel.app',
    accentColor: '#F59E0B',
    stackDetails: [
      { name: 'React 18 + Vite', role: { pt: 'Frontend SPA offline-first', en: 'Offline-first SPA Frontend' } },
      { name: 'Express + TypeScript', role: { pt: 'REST API + RBAC hierárquico', en: 'REST API + Hierarchical RBAC' } },
      { name: 'MySQL 8.0 + Sequelize', role: { pt: 'Dados relacionais + migrações', en: 'Relational data + migrations' } },
      { name: 'ECharts', role: { pt: 'Dashboards BI+ operacionais', en: 'Operational BI+ dashboards' } },
      { name: 'Azure (App Service + Key Vault)', role: { pt: 'Infraestrutura enterprise', en: 'Enterprise infrastructure' } },
      { name: 'Docker + GitHub Actions', role: { pt: 'CI/CD + deploy blue/green', en: 'CI/CD + blue/green deploy' } },
      { name: 'Vitest + Jest + Playwright', role: { pt: 'Pirâmide de testes (451)', en: 'Testing pyramid (451)' } },
      { name: 'IndexedDB + Workbox', role: { pt: 'Persistência offline + PWA', en: 'Offline persistence + PWA' } },
    ],
    timeline: { pt: '2025 · Sistema Empresarial', en: '2025 · Enterprise System' },
    previewType: 'iframe' as const,
    previewUrl: 'https://efvm360.vercel.app',
  },
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
    id: 'imc-pro-ai',
    slug: 'imc-pro-ai',
    title: 'IMC Pro AI',
    subtitle: {
      pt: 'Calculadora Inteligente de Massa Corporal com IA',
      en: 'Smart Body Mass Index Calculator with AI',
    },
    challenge: {
      pt: 'Transformar uma calculadora de IMC básica em HTML/CSS/JS em uma aplicação profissional nível portfólio, com design premium, análise inteligente via IA e experiência de usuário sofisticada que demonstrasse domínio completo do stack moderno.',
      en: 'Transform a basic HTML/CSS/JS BMI calculator into a portfolio-grade professional application with premium design, AI-powered intelligent analysis, and a sophisticated user experience demonstrating full mastery of the modern stack.',
    },
    approach: {
      pt: 'Arquitetura modular com Next.js 14 App Router, componentização inteligente (GaugeChart SVG, AnimatedNumber, AIInsight), API Route como proxy seguro para a Anthropic, e sistema de temas com CSS variables para alternância suave entre modo claro e escuro.',
      en: 'Modular architecture with Next.js 14 App Router, smart componentization (SVG GaugeChart, AnimatedNumber, AIInsight), API Route as a secure proxy for Anthropic, and theme system with CSS variables for smooth light/dark mode switching.',
    },
    architecture: {
      pt: 'Frontend React com gauge chart SVG customizado, animações com easing cúbico, 8 faixas de classificação OMS com cores dinâmicas, grid responsivo mobile-first, e integração server-side com Claude AI via API route protegida — chave nunca exposta ao cliente.',
      en: 'React frontend with custom SVG gauge chart, cubic easing animations, 8 WHO classification ranges with dynamic colors, mobile-first responsive grid, and server-side Claude AI integration via protected API route — key never exposed to client.',
    },
    results: {
      pt: 'Aplicação completa deployada na Vercel com build 100% limpo, análise de saúde personalizada via IA, design premium com dois temas, gauge chart interativo e UX profissional que eleva significativamente o nível do portfólio.',
      en: 'Complete application deployed on Vercel with clean build, personalized health analysis via AI, premium design with dual themes, interactive gauge chart, and professional UX that significantly elevates portfolio quality.',
    },
    metrics: [
      { value: '8', label: { pt: 'Faixas OMS', en: 'WHO Ranges' }, context: { pt: 'Classificação completa', en: 'Full classification' } },
      { value: 'IA', label: { pt: 'Claude AI', en: 'Claude AI' }, context: { pt: 'Análise personalizada', en: 'Personalized analysis' } },
      { value: '2', label: { pt: 'Temas', en: 'Themes' }, context: { pt: 'Claro e escuro', en: 'Light and dark' } },
      { value: '100%', label: { pt: 'Responsivo', en: 'Responsive' }, context: { pt: 'Mobile-first', en: 'Mobile-first' } },
    ],
    decisions: [
      { title: { pt: 'IA como Diferencial', en: 'AI as Differentiator' }, description: { pt: 'Integração com Claude AI via API route server-side para análise personalizada de saúde. Proxy seguro que protege a chave da API e permite recomendações contextualizadas baseadas em idade, sexo e nível de atividade.', en: 'Claude AI integration via server-side API route for personalized health analysis. Secure proxy protecting the API key while enabling contextualized recommendations based on age, gender, and activity level.' }, icon: '◆' },
      { title: { pt: 'Design System Dual-Theme', en: 'Dual-Theme Design System' }, description: { pt: 'Sistema de temas claro/escuro implementado com CSS variables e toggle no header. Cada componente — incluindo o gauge SVG — adapta cores automaticamente, garantindo acessibilidade e elegância em ambos os modos.', en: 'Light/dark theme system implemented with CSS variables and header toggle. Every component — including the SVG gauge — adapts colors automatically, ensuring accessibility and elegance in both modes.' }, icon: '◇' },
      { title: { pt: 'Gauge Chart SVG Customizado', en: 'Custom SVG Gauge Chart' }, description: { pt: 'Visualização semicircular com gradiente multicolorido, agulha animada, ticks de referência OMS e valor central dinâmico. Tudo em SVG puro sem dependências externas, com animações performáticas.', en: 'Semicircular visualization with multicolor gradient, animated needle, WHO reference ticks, and dynamic center value. Pure SVG with no external dependencies and performant animations.' }, icon: '⚡' },
    ],
    tags: ['Next.js 14', 'React 18', 'Tailwind CSS', 'Claude AI', 'Anthropic API', 'SVG Charts'],
    url: 'https://imc-pro-ai.vercel.app',
    accentColor: '#2EC4B6',
    stackDetails: [
      { name: 'Next.js 14', role: { pt: 'Framework & App Router', en: 'Framework & App Router' } },
      { name: 'React 18', role: { pt: 'UI & Componentização', en: 'UI & Componentization' } },
      { name: 'Tailwind CSS', role: { pt: 'Estilização responsiva', en: 'Responsive styling' } },
      { name: 'Claude AI', role: { pt: 'Análise inteligente', en: 'Intelligent analysis' } },
      { name: 'Vercel', role: { pt: 'Deploy & hosting', en: 'Deploy & hosting' } },
    ],
    timeline: { pt: '2025 · Projeto Pessoal', en: '2025 · Personal Project' },
    previewType: 'iframe' as const,
    previewUrl: 'https://imc-pro-ai.vercel.app',
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
    name: 'AI & Machine Learning',
    issuer: { pt: 'Em andamento', en: 'In Progress' },
    year: '2025',
    status: 'in-progress' as const,
  },
  {
    name: 'Full Stack Development',
    issuer: { pt: 'Estudos Independentes + Projetos', en: 'Independent Studies + Projects' },
    year: '2024',
    status: 'completed' as const,
  },
  {
    name: 'Frontend Fundamentals',
    issuer: { pt: 'Autodidata + Cursos Online', en: 'Self-taught + Online Courses' },
    year: '2023',
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
