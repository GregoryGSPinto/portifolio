# PORTFOLIO_BLOG.md — Fase 4: Blog com MDX (Opcional)

> **Objetivo:** Posicionar Gregory como thought leader em Architecture, DDD, AI/ML.
> **Tech:** MDX (Markdown com componentes React) integrado ao Next.js App Router.
> **Commits:** 1 por bloco | Push ao final da fase

---

## Bloco 1 — Infraestrutura do Blog

### Setup MDX

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react
pnpm add rehype-pretty-code rehype-slug rehype-autolink-headings
pnpm add remark-gfm
pnpm add gray-matter reading-time
pnpm add -D @types/mdx
```

### next.config.ts (MDX support)

```ts
import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, {
        theme: 'one-dark-pro',
        keepBackground: true,
      }],
    ],
  },
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // ... rest of config
}

export default withMDX(nextConfig)
```

### Estrutura de Arquivos

```
content/
├── blog/
│   ├── ddd-frontend-real-world.mdx
│   ├── event-sourcing-railway-ops.mdx
│   ├── building-ai-assistant-adambot.mdx
│   └── ml-engines-martial-arts.mdx
```

```
app/
├── blog/
│   ├── page.tsx              # Blog index (lista de posts)
│   └── [slug]/
│       └── page.tsx          # Post individual
```

### Utilitários de Blog

```tsx
// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
  project?: string       // slug do projeto relacionado
  lang: 'en' | 'pt'
  published: boolean
  image?: string          // OG image
  content: string
}

export function getAllPosts(lang: 'en' | 'pt' = 'en'): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title?.[lang] || data.title?.en || data.title,
        description: data.description?.[lang] || data.description?.en || data.description,
        date: data.date,
        tags: data.tags || [],
        readingTime: stats.text,
        project: data.project || null,
        lang,
        published: data.published !== false,
        image: data.image || null,
        content,
      }
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    readingTime: stats.text,
    project: data.project || null,
    lang: 'en',
    published: data.published !== false,
    image: data.image || null,
    content,
  }
}
```

### Blog Index Page

```tsx
// app/blog/page.tsx
import { getAllPosts } from '@/lib/blog'

// Layout:
// ┌─────────────────────────────────────────────┐
// │  Blog — Technical Insights                   │
// │                                              │
// │  [All] [Architecture] [AI/ML] [Frontend]     │ ← filter tabs (tags)
// │                                              │
// │  ┌──────────────────────────────────────┐    │
// │  │  DDD in the Frontend: A Real-World   │    │
// │  │  Approach                            │    │
// │  │  5 min read · Mar 2025 · #ddd #react │    │
// │  │  Related: EFVM 360                   │    │
// │  └──────────────────────────────────────┘    │
// │                                              │
// │  ┌──────────────────────────────────────┐    │
// │  │  Event Sourcing for Railway Ops      │    │
// │  │  8 min read · Feb 2025 · #eventsrc   │    │
// │  │  Related: EFVM 360                   │    │
// │  └──────────────────────────────────────┘    │
// └─────────────────────────────────────────────┘
```

### Post Page Layout

```tsx
// app/blog/[slug]/page.tsx
// Layout:
// ┌──────────────────────────────────────────────┐
// │  ← Back to Blog                              │
// │                                              │
// │  DDD in the Frontend: A Real-World Approach  │
// │  March 2025 · 5 min read                     │
// │  [#ddd] [#react] [#architecture]             │
// │                                              │
// │  Related Project: EFVM 360 ↗                 │
// │                                              │
// │  ─────────────────────────────               │
// │                                              │
// │  [MDX CONTENT RENDERED]                      │
// │  - Headings com anchor links                 │
// │  - Code blocks com syntax highlighting       │
// │  - Componentes React inline                  │
// │  - Imagens otimizadas                        │
// │                                              │
// │  ─────────────────────────────               │
// │                                              │
// │  ← Previous Post    Next Post →              │
// │                                              │
// │  Table of Contents (sidebar em desktop)      │
// └──────────────────────────────────────────────┘
```

### MDX Components Customizados

```tsx
// components/blog/MDXComponents.tsx
// Componentes que podem ser usados dentro dos MDX posts:

export const mdxComponents = {
  // Override defaults para styling consistente
  h1: (props) => <h1 className="text-3xl font-bold mt-12 mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-10 mb-3" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold mt-8 mb-2" {...props} />,
  p: (props) => <p className="text-secondary leading-relaxed mb-4" {...props} />,
  a: (props) => <a className="text-accent hover:underline" target="_blank" {...props} />,
  code: (props) => <code className="font-mono bg-tertiary px-1.5 py-0.5 rounded text-sm" {...props} />,
  blockquote: (props) => <blockquote className="border-l-2 border-accent pl-4 italic my-4" {...props} />,

  // Custom components
  Callout: ({ type, children }) => (/* info/warning/tip callout box */),
  ProjectLink: ({ slug }) => (/* card linkando para o projeto */),
  ArchitectureDiagram: ({ src }) => (/* diagrama com zoom */),
  CodeComparison: ({ before, after }) => (/* side-by-side code diff */),
  MetricCard: ({ value, label }) => (/* counter animado */),
}
```

### Metadata por Post

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [post.image || `/api/og?title=${encodeURIComponent(post.title)}`],
    },
  }
}
```

**Commit:** `feat(blog): MDX infrastructure, blog index, post pages, custom components`

---

## Bloco 2 — Conteúdo Inicial + RSS

### Posts Iniciais (Frontmatter Templates)

#### Post 1: DDD no Frontend

```mdx
---
title:
  en: "DDD in the Frontend: A Real-World Approach with React"
  pt: "DDD no Frontend: Abordagem Real com React"
description:
  en: "How I applied Domain-Driven Design principles in a React frontend with Event Sourcing and CQRS — lessons from building EFVM 360."
  pt: "Como apliquei princípios de DDD em um frontend React com Event Sourcing e CQRS — lições do EFVM 360."
date: "2025-03-15"
tags: ["ddd", "react", "architecture", "event-sourcing"]
project: "efvm360"
published: true
---

# DDD in the Frontend: A Real-World Approach

When people talk about Domain-Driven Design, they usually mean backend services...

<Callout type="tip">
This post includes real code from EFVM 360 — a railway operations platform with 451 automated tests.
</Callout>

## Why DDD in the Frontend?

...

<ProjectLink slug="efvm360" />
```

#### Post 2: Event Sourcing para Railway Ops

```mdx
---
title:
  en: "Event Sourcing for Safety-Critical Railway Operations"
  pt: "Event Sourcing para Operações Ferroviárias Safety-Critical"
description:
  en: "Why Event Sourcing with SHA-256 hash chains was the right choice for a railway shift handover system."
  pt: "Por que Event Sourcing com SHA-256 hash chains foi a escolha certa para um sistema de troca de turno ferroviário."
date: "2025-03-01"
tags: ["event-sourcing", "architecture", "safety", "railway"]
project: "efvm360"
published: true
---
```

#### Post 3: Building AdamBot

```mdx
---
title:
  en: "Building an AI Assistant with Voice, Memory and 10 Modules"
  pt: "Construindo um Assistente IA com Voz, Memória e 10 Módulos"
description:
  en: "Architecture decisions behind AdamBot — the AI assistant inside EFVM 360 with STT, TTS, and contextual memory."
  pt: "Decisões arquiteturais por trás do AdamBot — o assistente IA dentro do EFVM 360 com STT, TTS e memória contextual."
date: "2025-02-15"
tags: ["ai", "chatbot", "voice", "architecture"]
project: "efvm360"
published: true
---
```

#### Post 4: ML Engines for Martial Arts

```mdx
---
title:
  en: "8 ML Engines for a Martial Arts SaaS: Architecture & Results"
  pt: "8 ML Engines para um SaaS de Artes Marciais: Arquitetura & Resultados"
description:
  en: "How I built churn prediction, student DNA profiling, and engagement scoring for BlackBelt OS."
  pt: "Como construí predição de churn, DNA de aluno e scoring de engajamento para o BlackBelt OS."
date: "2025-02-01"
tags: ["machine-learning", "ai", "saas", "architecture"]
project: "blackbelt"
published: true
---
```

### RSS Feed

```tsx
// app/feed.xml/route.ts
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const posts = getAllPosts('en')
  const baseUrl = 'https://gregorypinto.dev'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gregory Pinto — Technical Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights on Architecture, DDD, Event Sourcing, AI/ML</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
```

### Blog na Home (Teaser)

```tsx
// components/blog/BlogTeaser.tsx
// Mostra os 3 posts mais recentes na home
// Card compacto: título, data, reading time, tags
// Link "Ver todos os posts →"
// Integra na seção "Insights" que já existe
```

### Tag Filter

```tsx
// app/blog/page.tsx (client component para filter)
// Extrair todas as tags únicas dos posts
// Filter tabs: [All] + tags mais populares
// URL search params: /blog?tag=ddd
// Filtro com animação de layout (framer-motion AnimatePresence)
```

**Commit:** `feat(blog): initial posts (4), RSS feed, blog teaser on home, tag filtering`

---

## Resumo da Fase 4

| Bloco | Commit | Entregáveis |
|-------|--------|-------------|
| 1 | `feat(blog): MDX infra, index, post pages, custom components` | Blog engine completo |
| 2 | `feat(blog): 4 initial posts, RSS, teaser, tag filter` | Conteúdo + RSS |

**Ao final:** `git push origin main` com tag `v4.0-blog-complete`

---

## Sugestões de Posts Futuros

| Título | Tags | Projeto |
|--------|------|---------|
| "Offline-First Architecture with IndexedDB & Service Workers" | offline, pwa, architecture | EFVM 360 |
| "RBAC with Azure AD SSO: Lessons from Enterprise Auth" | security, azure, auth | EFVM 360 |
| "Multi-tenant SaaS with Supabase: Row-Level Security" | saas, supabase, security | BlackBelt |
| "LGPD Compliance in a SaaS: Technical Checklist" | lgpd, privacy, compliance | BlackBelt |
| "Testing Pyramid at Scale: 900+ Tests Across 2 Projects" | testing, quality, ci-cd | Both |
| "Architecture Decision Records: How and Why" | architecture, documentation | Both |
