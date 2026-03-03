export const translations = {
  pt: {
    nav: {
      items: ['Início', 'Visão', 'Arquitetura', 'Cases', 'Stack', 'Trajetória', 'Insights', 'Contato'],
      ids: ['hero', 'vision', 'architecture', 'cases', 'stack', 'journey', 'insights', 'contact'],
    },
    hero: {
      preTitle: 'AI Solutions Architect',
      tagline: 'Arquiteto de soluções inteligentes que transformam operações complexas em sistemas escaláveis e decisões data-driven.',
      cta1: 'Explorar Cases',
      cta2: 'Agendar Conversa',
      scroll: 'SCROLL',
    },
    vision: {
      label: 'Visão Estratégica',
      title: 'Engenharia com\nPropósito Executivo',
      p1: 'Acredito que a tecnologia de verdade não impressiona — ela desaparece. Quando um sistema funciona tão bem que ninguém percebe sua complexidade, aí está a engenharia de excelência.',
      p2: 'Minha abordagem combina arquitetura de sistemas robustos com visão de produto. Cada decisão técnica é fundamentada em impacto de negócio, escalabilidade e experiência do usuário final.',
      pillars: [
        {
          number: '01',
          title: 'Arquitetura Escalável',
          desc: 'Sistemas distribuídos projetados para crescer com o negócio',
        },
        {
          number: '02',
          title: 'Decisões Data-Driven',
          desc: 'Cada feature justificada por métricas e impacto mensurável',
        },
        {
          number: '03',
          title: 'Liderança Técnica',
          desc: 'Mentoria de equipes e definição de roadmap tecnológico',
        },
      ],
    },
    architecture: {
      label: 'System Design',
      title: 'Pensamento\nArquitetural',
      desc: 'Visão macro dos ecossistemas que projeto — da interface ao banco de dados, cada camada tem propósito e responsabilidade clara.',
    },
    cases: {
      label: 'Case Studies',
      title: 'Impacto\nMensurável',
      viewProject: 'Ver Projeto',
      viewCase: 'Ver Case Completo',
      livePreview: 'Preview ao Vivo',
      openNewTab: 'Abrir em nova aba',
      challengeLabel: 'O Desafio',
      approachLabel: 'Abordagem',
      architectureLabel: 'Arquitetura',
      resultsLabel: 'Resultados',
      decisionsLabel: 'Decisões Técnicas',
      stackLabel: 'Stack Detalhado',
      timelineLabel: 'Período',
    },
    stack: {
      label: 'Tech Radar',
      title: 'Arsenal\nTecnológico',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        infra: 'Infra & Data',
        leadership: 'Liderança',
      },
    },
    timeline: {
      label: 'Trajetória',
      title: 'Evolução\nProfissional',
    },
    insights: {
      label: 'Insights',
      title: 'Pensamento\nTécnico',
      placeholder: 'Artigos em desenvolvimento — em breve aqui.',
    },
    contact: {
      label: 'Contato',
      title: 'Vamos\nConversar',
      desc: 'Pronto para transformar ideias em arquiteturas que escalam. Vamos conversar sobre seu próximo projeto.',
      cta: 'Enviar Email',
    },
    footer: {
      left: '© 2025 GREGORY GUIMARÃES',
      right: 'ARCHITECT · ENGINEER · LEADER',
    },
  },
  en: {
    nav: {
      items: ['Home', 'Vision', 'Architecture', 'Cases', 'Stack', 'Journey', 'Insights', 'Contact'],
      ids: ['hero', 'vision', 'architecture', 'cases', 'stack', 'journey', 'insights', 'contact'],
    },
    hero: {
      preTitle: 'AI Solutions Architect',
      tagline: 'Architect of intelligent solutions that transform complex operations into scalable systems and data-driven decisions.',
      cta1: 'Explore Cases',
      cta2: 'Schedule a Call',
      scroll: 'SCROLL',
    },
    vision: {
      label: 'Strategic Vision',
      title: 'Engineering with\nExecutive Purpose',
      p1: "I believe real technology doesn't impress — it disappears. When a system works so well that nobody notices its complexity, that's engineering excellence.",
      p2: 'My approach combines robust system architecture with product vision. Every technical decision is grounded in business impact, scalability, and end-user experience.',
      pillars: [
        {
          number: '01',
          title: 'Scalable Architecture',
          desc: 'Distributed systems designed to grow with the business',
        },
        {
          number: '02',
          title: 'Data-Driven Decisions',
          desc: 'Every feature justified by metrics and measurable impact',
        },
        {
          number: '03',
          title: 'Technical Leadership',
          desc: 'Team mentorship and technology roadmap definition',
        },
      ],
    },
    architecture: {
      label: 'System Design',
      title: 'Architectural\nThinking',
      desc: 'Macro view of the ecosystems I design — from interface to database, each layer has clear purpose and responsibility.',
    },
    cases: {
      label: 'Case Studies',
      title: 'Measurable\nImpact',
      viewProject: 'View Project',
      viewCase: 'View Full Case',
      livePreview: 'Live Preview',
      openNewTab: 'Open in new tab',
      challengeLabel: 'The Challenge',
      approachLabel: 'Approach',
      architectureLabel: 'Architecture',
      resultsLabel: 'Results',
      decisionsLabel: 'Technical Decisions',
      stackLabel: 'Detailed Stack',
      timelineLabel: 'Timeline',
    },
    stack: {
      label: 'Tech Radar',
      title: 'Technical\nArsenal',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        infra: 'Infra & Data',
        leadership: 'Leadership',
      },
    },
    timeline: {
      label: 'Journey',
      title: 'Professional\nEvolution',
    },
    insights: {
      label: 'Insights',
      title: 'Technical\nThought',
      placeholder: 'Articles in development — coming soon.',
    },
    contact: {
      label: 'Contact',
      title: "Let's\nTalk",
      desc: "Ready to turn ideas into architectures that scale. Let's talk about your next project.",
      cta: 'Send Email',
    },
    footer: {
      left: '© 2025 GREGORY GUIMARÃES',
      right: 'ARCHITECT · ENGINEER · LEADER',
    },
  },
} as const;

export type Language = 'pt' | 'en';
export type Translations = typeof translations;
