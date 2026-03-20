export type SkillLevel = 'production' | 'advanced' | 'intermediate' | 'familiar';

export const skillLevelLabels: Record<SkillLevel, { pt: string; en: string }> = {
  production: { pt: 'Producao', en: 'Production' },
  advanced: { pt: 'Avancado', en: 'Advanced' },
  intermediate: { pt: 'Intermediario', en: 'Intermediate' },
  familiar: { pt: 'Familiar', en: 'Familiar' },
};

export interface Skill {
  name: string;
  items: string[];
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  label: { pt: string; en: string };
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: { pt: 'Frontend', en: 'Frontend' },
    skills: [
      { name: 'React', items: ['Hooks', 'Server Components', 'Suspense'], level: 'production' },
      { name: 'Next.js', items: ['App Router', 'SSR', 'ISR'], level: 'production' },
      { name: 'TypeScript', items: ['Generics', 'Type Guards', 'Utility Types'], level: 'production' },
      { name: 'TailwindCSS', items: ['Design Tokens', 'Custom Plugins', 'JIT'], level: 'production' },
      { name: 'Framer Motion', items: ['Layout Animations', 'Gestures', 'SVG'], level: 'production' },
    ],
  },
  {
    id: 'backend',
    label: { pt: 'Backend', en: 'Backend' },
    skills: [
      { name: 'Node.js', items: ['Streams', 'Worker Threads', 'Clustering'], level: 'advanced' },
      { name: 'Express', items: ['Middleware', 'REST APIs', 'Auth'], level: 'advanced' },
      { name: 'Supabase', items: ['RLS', 'Edge Functions', 'Realtime'], level: 'advanced' },
      { name: 'MySQL', items: ['Query Optimization', 'Indexing', 'Transactions'], level: 'advanced' },
      { name: 'PostgreSQL', items: ['CTEs', 'JSONB', 'Extensions'], level: 'advanced' },
    ],
  },
  {
    id: 'architecture',
    label: { pt: 'Arquitetura', en: 'Architecture' },
    skills: [
      { name: 'DDD', items: ['Bounded Contexts', 'Aggregates', 'Value Objects'], level: 'production' },
      { name: 'CQRS', items: ['Command/Query Split', 'Event Bus', 'Projections'], level: 'production' },
      { name: 'Event Sourcing', items: ['Event Store', 'Snapshots', 'Replay'], level: 'advanced' },
      { name: 'Clean Architecture', items: ['Hexagonal', 'Ports & Adapters', 'Use Cases'], level: 'production' },
      { name: 'Microservices', items: ['Service Mesh', 'API Gateway', 'Saga Pattern'], level: 'advanced' },
    ],
  },
  {
    id: 'ai-ml',
    label: { pt: 'IA & ML', en: 'AI & ML' },
    skills: [
      { name: 'LLMs', items: ['Fine-tuning', 'Embeddings', 'Tokenization'], level: 'intermediate' },
      { name: 'RAG', items: ['Vector DBs', 'Chunking', 'Retrieval'], level: 'advanced' },
      { name: 'ML Pipelines', items: ['Feature Engineering', 'Training', 'Evaluation'], level: 'intermediate' },
      { name: 'Prompt Engineering', items: ['Chain-of-Thought', 'Few-Shot', 'System Prompts'], level: 'advanced' },
      { name: 'Claude/OpenAI API', items: ['Function Calling', 'Streaming', 'Agents'], level: 'advanced' },
    ],
  },
  {
    id: 'devops',
    label: { pt: 'DevOps', en: 'DevOps' },
    skills: [
      { name: 'Docker', items: ['Multi-stage', 'Compose', 'Networking'], level: 'intermediate' },
      { name: 'Azure', items: ['App Service', 'Functions', 'DevOps'], level: 'intermediate' },
      { name: 'Vercel', items: ['Edge Config', 'Analytics', 'Deployments'], level: 'advanced' },
      { name: 'GitHub Actions', items: ['CI/CD', 'Matrix Builds', 'Caching'], level: 'intermediate' },
      { name: 'CI/CD', items: ['Pipelines', 'Blue-Green', 'Canary'], level: 'intermediate' },
    ],
  },
  {
    id: 'ux-design',
    label: { pt: 'UX/Design', en: 'UX/Design' },
    skills: [
      { name: 'Figma', items: ['Auto Layout', 'Components', 'Variables'], level: 'advanced' },
      { name: 'Design Systems', items: ['Tokens', 'Component Library', 'Documentation'], level: 'advanced' },
      { name: 'Accessibility', items: ['WCAG 2.1', 'Screen Readers', 'ARIA'], level: 'advanced' },
      { name: 'Responsive Design', items: ['Mobile-First', 'Fluid Typography', 'Container Queries'], level: 'advanced' },
    ],
  },
];
