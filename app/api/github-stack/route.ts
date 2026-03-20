import { NextResponse } from 'next/server';

// In-memory cache
let cache: { data: GitHubStackResponse; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface RepoInfo {
  name: string;
  language: string | null;
  pushed_at: string;
  default_branch: string;
}

interface StackItem {
  name: string;
  skill: number;
  repos: string[];
}

interface StackCategory {
  category: string;
  items: StackItem[];
}

interface GitHubStackResponse {
  lastUpdated: string;
  reposAnalyzed: number;
  stack: StackCategory[];
}

// Dependency → display name mapping
const FRONTEND_DEPS: Record<string, string> = {
  next: 'Next.js',
  react: 'React',
  'react-dom': 'React',
  tailwindcss: 'Tailwind CSS',
  'framer-motion': 'Framer Motion',
};

const BACKEND_DEPS: Record<string, string> = {
  '@supabase/supabase-js': 'Supabase',
  express: 'Express.js',
  prisma: 'Prisma',
  '@prisma/client': 'Prisma',
  '@anthropic-ai/sdk': 'Claude AI API',
  openai: 'OpenAI API',
  firebase: 'Firebase',
  mongodb: 'MongoDB',
  mongoose: 'MongoDB',
  pg: 'PostgreSQL',
  mysql2: 'MySQL',
  sequelize: 'Sequelize',
};

const TOOL_DEPS: Record<string, string> = {
  eslint: 'ESLint',
  vitest: 'Vitest',
  jest: 'Jest',
  '@vitejs/plugin-react': 'Vite',
  vite: 'Vite',
};

type DepType = 'main' | 'dev';

interface TechEntry {
  repos: string[];
  depTypes: DepType[];
  latestPush: string;
}

const headers: Record<string, string> = {
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'portfolio-stack-analyzer',
};

async function fetchJSON(url: string) {
  const token = process.env.GITHUB_TOKEN;
  const h = { ...headers };
  if (token) h['Authorization'] = `token ${token}`;

  const res = await fetch(url, { headers: h });
  if (!res.ok) return null;
  return res.json();
}

async function fetchPackageJSON(
  repo: string,
  defaultBranch: string
): Promise<Record<string, unknown> | null> {
  const url = `https://raw.githubusercontent.com/GregoryGSPinto/${repo}/${defaultBranch}/package.json`;
  const data = await fetchJSON(url);
  if (data) return data as Record<string, unknown>;

  // Try alternate branch
  const alt = defaultBranch === 'main' ? 'master' : 'main';
  const altUrl = `https://raw.githubusercontent.com/GregoryGSPinto/${repo}/${alt}/package.json`;
  return (await fetchJSON(altUrl)) as Record<string, unknown> | null;
}

async function checkFileExists(
  repo: string,
  defaultBranch: string,
  file: string
): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const h = { ...headers };
  if (token) h['Authorization'] = `token ${token}`;

  const url = `https://raw.githubusercontent.com/GregoryGSPinto/${repo}/${defaultBranch}/${file}`;
  const res = await fetch(url, { method: 'HEAD', headers: h });
  return res.ok;
}

function addTech(
  map: Map<string, TechEntry>,
  category: string,
  techName: string,
  repoName: string,
  depType: DepType,
  pushedAt: string
) {
  const key = `${category}::${techName}`;
  const entry = map.get(key) || { repos: [], depTypes: [], latestPush: '' };
  if (!entry.repos.includes(repoName)) {
    entry.repos.push(repoName);
    entry.depTypes.push(depType);
  }
  if (pushedAt > entry.latestPush) entry.latestPush = pushedAt;
  map.set(key, entry);
}

function processDeps(
  deps: Record<string, string> | undefined,
  depType: DepType,
  repoName: string,
  pushedAt: string,
  techMap: Map<string, TechEntry>
) {
  if (!deps) return;

  for (const dep of Object.keys(deps)) {
    // Check frontend
    if (FRONTEND_DEPS[dep]) {
      addTech(techMap, 'Frontend', FRONTEND_DEPS[dep], repoName, depType, pushedAt);
    }
    // Check radix/shadcn
    if (dep.startsWith('@radix-ui/')) {
      addTech(techMap, 'Frontend', 'Shadcn/UI', repoName, depType, pushedAt);
    }
    // Check backend
    if (BACKEND_DEPS[dep]) {
      addTech(techMap, 'Backend & Data', BACKEND_DEPS[dep], repoName, depType, pushedAt);
    }
    // Check tools
    if (TOOL_DEPS[dep]) {
      addTech(techMap, 'Tools & Deploy', TOOL_DEPS[dep], repoName, depType, pushedAt);
    }
    // Check for test scripts indicator
    if (dep === 'vitest' || dep === 'jest' || dep === '@testing-library/react') {
      addTech(techMap, 'Tools & Deploy', 'Testing', repoName, depType, pushedAt);
    }
  }
}

function calculateSkill(entry: TechEntry, latestRepoPush: string): number {
  let score = 50;

  for (const dt of entry.depTypes) {
    score += dt === 'main' ? 10 : 5;
  }

  // Bonus for appearing in 3+ repos
  if (entry.repos.length >= 3) score += 10;

  // Bonus if in most recently pushed repo
  if (entry.latestPush === latestRepoPush) score += 5;

  return Math.min(95, Math.max(55, score));
}

export async function GET() {
  // Return cache if valid
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    // Step 1: Fetch all public repos
    const repos = (await fetchJSON(
      'https://api.github.com/users/GregoryGSPinto/repos?per_page=100&sort=pushed'
    )) as RepoInfo[] | null;

    if (!repos || !Array.isArray(repos)) {
      return NextResponse.json(
        { error: 'Failed to fetch repos' },
        { status: 502 }
      );
    }

    // Filter out empty/fork repos, keep public with code
    const validRepos = repos.filter(
      (r: RepoInfo) => r.name && r.language !== null
    );

    const latestRepoPush =
      validRepos.length > 0 ? validRepos[0].pushed_at : '';

    const techMap = new Map<string, TechEntry>();

    // Step 2: Analyze each repo
    await Promise.all(
      validRepos.map(async (repo: RepoInfo) => {
        const { name, language, pushed_at, default_branch } = repo;

        // Language detection
        if (language === 'TypeScript') {
          addTech(techMap, 'Languages', 'TypeScript', name, 'main', pushed_at);
        }
        if (language === 'JavaScript') {
          addTech(techMap, 'Languages', 'JavaScript', name, 'main', pushed_at);
        }
        if (language === 'Python') {
          addTech(techMap, 'Languages', 'Python', name, 'main', pushed_at);
        }
        if (language === 'HTML' || language === 'CSS') {
          addTech(techMap, 'Frontend', 'HTML / CSS', name, 'main', pushed_at);
        }

        // Git & GitHub for every repo
        addTech(techMap, 'Tools & Deploy', 'Git & GitHub', name, 'main', pushed_at);

        // Fetch package.json
        const pkg = await fetchPackageJSON(name, default_branch || 'main');
        if (pkg) {
          processDeps(
            pkg.dependencies as Record<string, string> | undefined,
            'main',
            name,
            pushed_at,
            techMap
          );
          processDeps(
            pkg.devDependencies as Record<string, string> | undefined,
            'dev',
            name,
            pushed_at,
            techMap
          );

          // Check for test scripts
          const scripts = pkg.scripts as Record<string, string> | undefined;
          if (scripts && (scripts.test || scripts['test:unit'] || scripts['test:e2e'])) {
            addTech(techMap, 'Tools & Deploy', 'Testing', name, 'main', pushed_at);
          }
        }

        // Check for tsconfig.json → TypeScript
        if (language !== 'TypeScript') {
          const hasTsConfig = await checkFileExists(
            name,
            default_branch || 'main',
            'tsconfig.json'
          );
          if (hasTsConfig) {
            addTech(techMap, 'Languages', 'TypeScript', name, 'main', pushed_at);
          }
        }

        // Check for vercel.json or .vercel
        const hasVercel = await checkFileExists(
          name,
          default_branch || 'main',
          'vercel.json'
        );
        if (hasVercel) {
          addTech(techMap, 'Tools & Deploy', 'Vercel', name, 'main', pushed_at);
        }

        // Check for docker
        const hasDocker = await checkFileExists(
          name,
          default_branch || 'main',
          'docker-compose.yml'
        );
        if (hasDocker) {
          addTech(techMap, 'Tools & Deploy', 'Docker', name, 'main', pushed_at);
        }
      })
    );

    // Also detect Vercel from Next.js projects (all Next.js projects deploy to Vercel)
    const nextEntry = techMap.get('Frontend::Next.js');
    if (nextEntry) {
      for (const repo of nextEntry.repos) {
        const pushed = validRepos.find((r: RepoInfo) => r.name === repo)?.pushed_at || '';
        addTech(techMap, 'Tools & Deploy', 'Vercel', repo, 'main', pushed);
      }
    }

    // Step 3: Build categorized output
    const categoryOrder = ['Frontend', 'Languages', 'Backend & Data', 'Tools & Deploy'];
    const stack: StackCategory[] = [];

    for (const category of categoryOrder) {
      const items: StackItem[] = [];

      for (const [key, entry] of techMap.entries()) {
        const [cat, name] = key.split('::');
        if (cat !== category) continue;

        const skill = calculateSkill(entry, latestRepoPush);
        if (skill >= 55) {
          items.push({ name, skill, repos: entry.repos });
        }
      }

      // Sort by skill descending
      items.sort((a, b) => b.skill - a.skill);

      // Keep top items per category (max 6)
      if (items.length > 0) {
        stack.push({ category, items: items.slice(0, 6) });
      }
    }

    const response: GitHubStackResponse = {
      lastUpdated: new Date().toISOString(),
      reposAnalyzed: validRepos.length,
      stack,
    };

    // Update cache
    cache = { data: response, timestamp: Date.now() };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: 'Failed to analyze GitHub repos' },
      { status: 500 }
    );
  }
}
