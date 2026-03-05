export interface Skill {
  name: string;
  items: string[];
  level: number;
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
      { name: 'React', items: ['Hooks', 'Server Components', 'Suspense'], level: 95 },
      { name: 'Next.js', items: ['App Router', 'SSR', 'ISR'], level: 95 },
      { name: 'TypeScript', items: ['Generics', 'Type Guards', 'Utility Types'], level: 95 },
      { name: 'TailwindCSS', items: ['Design Tokens', 'Custom Plugins', 'JIT'], level: 95 },
      { name: 'Framer Motion', items: ['Layout Animations', 'Gestures', 'SVG'], level: 90 },
    ],
  },
  {
    id: 'backend',
    label: { pt: 'Backend', en: 'Backend' },
    skills: [
      { name: 'Node.js', items: ['Streams', 'Worker Threads', 'Clustering'], level: 85 },
      { name: 'Express', items: ['Middleware', 'REST APIs', 'Auth'], level: 85 },
      { name: 'Supabase', items: ['RLS', 'Edge Functions', 'Realtime'], level: 80 },
      { name: 'MySQL', items: ['Query Optimization', 'Indexing', 'Transactions'], level: 85 },
      { name: 'PostgreSQL', items: ['CTEs', 'JSONB', 'Extensions'], level: 85 },
    ],
  },
  {
    id: 'architecture',
    label: { pt: 'Arquitetura', en: 'Architecture' },
    skills: [
      { name: 'DDD', items: ['Bounded Contexts', 'Aggregates', 'Value Objects'], level: 90 },
      { name: 'CQRS', items: ['Command/Query Split', 'Event Bus', 'Projections'], level: 90 },
      { name: 'Event Sourcing', items: ['Event Store', 'Snapshots', 'Replay'], level: 85 },
      { name: 'Clean Architecture', items: ['Hexagonal', 'Ports & Adapters', 'Use Cases'], level: 90 },
      { name: 'Microservices', items: ['Service Mesh', 'API Gateway', 'Saga Pattern'], level: 85 },
    ],
  },
  {
    id: 'ai-ml',
    label: { pt: 'IA & ML', en: 'AI & ML' },
    skills: [
      { name: 'LLMs', items: ['Fine-tuning', 'Embeddings', 'Tokenization'], level: 75 },
      { name: 'RAG', items: ['Vector DBs', 'Chunking', 'Retrieval'], level: 80 },
      { name: 'ML Pipelines', items: ['Feature Engineering', 'Training', 'Evaluation'], level: 70 },
      { name: 'Prompt Engineering', items: ['Chain-of-Thought', 'Few-Shot', 'System Prompts'], level: 85 },
      { name: 'Claude/OpenAI API', items: ['Function Calling', 'Streaming', 'Agents'], level: 80 },
    ],
  },
  {
    id: 'devops',
    label: { pt: 'DevOps', en: 'DevOps' },
    skills: [
      { name: 'Docker', items: ['Multi-stage', 'Compose', 'Networking'], level: 75 },
      { name: 'Azure', items: ['App Service', 'Functions', 'DevOps'], level: 70 },
      { name: 'Vercel', items: ['Edge Config', 'Analytics', 'Deployments'], level: 80 },
      { name: 'GitHub Actions', items: ['CI/CD', 'Matrix Builds', 'Caching'], level: 75 },
      { name: 'CI/CD', items: ['Pipelines', 'Blue-Green', 'Canary'], level: 70 },
    ],
  },
  {
    id: 'ux-design',
    label: { pt: 'UX/Design', en: 'UX/Design' },
    skills: [
      { name: 'Figma', items: ['Auto Layout', 'Components', 'Variables'], level: 80 },
      { name: 'Design Systems', items: ['Tokens', 'Component Library', 'Documentation'], level: 85 },
      { name: 'Accessibility', items: ['WCAG 2.1', 'Screen Readers', 'ARIA'], level: 80 },
      { name: 'Responsive Design', items: ['Mobile-First', 'Fluid Typography', 'Container Queries'], level: 85 },
    ],
  },
];

export function getCategoryAverage(category: SkillCategory): number {
  const sum = category.skills.reduce((acc, s) => acc + s.level, 0);
  return Math.round(sum / category.skills.length);
}
