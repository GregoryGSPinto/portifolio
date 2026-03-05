# PORTFOLIO_SEO_PERFORMANCE.md — Fase 3: SEO + Performance + Analytics

> **Objetivo:** Garantir que o portfólio é encontrável, rápido e mensurável.
> **Target:** Lighthouse 95+ em todas as 4 métricas.
> **Commits:** 1 por bloco | Push ao final da fase

---

## Bloco 1 — Metadata Dinâmico + Open Graph

### Root Metadata (app/layout.tsx)

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://gregorypinto.dev'), // domínio futuro
  title: {
    default: 'Gregory Pinto — AI Solutions Architect',
    template: '%s | Gregory Pinto',
  },
  description: 'Solution Architect specializing in enterprise platforms, DDD, Event Sourcing, and AI/ML. Building scalable systems that turn complex operations into data-driven decisions.',
  keywords: [
    'Solution Architect', 'AI Specialist', 'UX Engineer',
    'DDD', 'Event Sourcing', 'CQRS', 'React', 'Next.js', 'TypeScript',
    'Enterprise Architecture', 'Full Stack Developer', 'Machine Learning',
  ],
  authors: [{ name: 'Gregory G. S. Pinto' }],
  creator: 'Gregory G. S. Pinto',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'pt_BR',
    url: 'https://gregorypinto.dev',
    siteName: 'Gregory Pinto — Portfolio',
    title: 'Gregory Pinto — AI Solutions Architect',
    description: 'Enterprise platforms, DDD, Event Sourcing, AI/ML. Building scalable systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gregory Pinto — AI Solutions Architect',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gregory Pinto — AI Solutions Architect',
    description: 'Enterprise platforms, DDD, Event Sourcing, AI/ML.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
  },
}
```

### Project Page Metadata (app/projects/[slug]/page.tsx)

```tsx
// app/projects/[slug]/page.tsx
import type { Metadata } from 'next'
import { projects } from '@/lib/data/projects'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects[params.slug]
  if (!project) return {}

  return {
    title: project.en.title,
    description: project.en.subtitle,
    openGraph: {
      title: `${project.en.title} — Gregory Pinto`,
      description: project.en.subtitle,
      images: [`/images/projects/${params.slug}-og.png`],
      type: 'article',
    },
  }
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}
```

### OG Image Generation (app/api/og/route.tsx)

```tsx
// app/api/og/route.tsx
// Usar @vercel/og (ImageResponse) para gerar OG images dinâmicas
// Template: fundo dark com título grande, subtítulo, logo GG, métricas
// Cada projeto e cada blog post gera sua própria OG image
// Tamanho: 1200x630

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Gregory Pinto'
  const subtitle = searchParams.get('subtitle') ?? 'AI Solutions Architect'

  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(135deg, #0A0A0B 0%, #111113 50%, #0A0A0B 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'system-ui',
      }}>
        <div style={{ color: '#6EE7B7', fontSize: 24, marginBottom: 16 }}>
          GG
        </div>
        <div style={{ color: '#FAFAF9', fontSize: 64, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
          {title}
        </div>
        <div style={{ color: '#A1A1AA', fontSize: 28, lineHeight: 1.4 }}>
          {subtitle}
        </div>
        <div style={{ color: '#71717A', fontSize: 18, marginTop: 'auto' }}>
          gregorypinto.dev
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

### Favicon Dinâmico

```tsx
// app/favicon.ico → manter como fallback
// app/icon.tsx → dynamic favicon que respeita dark/light mode

// Alternativa simples: dois favicons estáticos
// public/favicon.ico (light bg)
// public/favicon-dark.ico (dark bg)
// Swap via script no <head> ou via media query no manifest
```

**Commit:** `seo: dynamic metadata, OG images, twitter cards, dynamic favicon`

---

## Bloco 2 — Structured Data + Sitemap + robots.txt

### JSON-LD Person Schema

```tsx
// components/seo/JsonLd.tsx
export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gregory G. S. Pinto',
    alternateName: 'Gregory Guimarães',
    jobTitle: 'AI Solutions Architect',
    description: 'Solution Architect specializing in enterprise platforms, DDD, Event Sourcing, and AI/ML.',
    url: 'https://gregorypinto.dev',
    image: 'https://gregorypinto.dev/images/gregory-photo.webp',
    sameAs: [
      'https://github.com/GregoryGSPinto',
      'https://linkedin.com/in/mqt-gregory',
    ],
    knowsAbout: [
      'Software Architecture', 'Domain-Driven Design', 'Event Sourcing',
      'CQRS', 'Machine Learning', 'Artificial Intelligence',
      'React', 'Next.js', 'TypeScript', 'Node.js',
    ],
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Minas Gerais',
      addressCountry: 'BR',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Website Schema

```tsx
// components/seo/JsonLd.tsx (adicional)
export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gregory Pinto — Portfolio',
    url: 'https://gregorypinto.dev',
    author: {
      '@type': 'Person',
      name: 'Gregory G. S. Pinto',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Project Schema (para cada project page)

```tsx
// components/seo/JsonLd.tsx
export function ProjectJsonLd({ project }: { project: ProjectData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: 'Gregory G. S. Pinto',
    },
    url: project.links.live,
    codeRepository: project.links.github,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Sitemap (app/sitemap.ts)

```tsx
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { projects } from '@/lib/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gregorypinto.dev'

  const projectPages = Object.keys(projects).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectPages,
    // blog posts (se implementado)
  ]
}
```

### robots.txt (app/robots.ts)

```tsx
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://gregorypinto.dev/sitemap.xml',
  }
}
```

**Commit:** `seo: JSON-LD structured data (Person, Website, Project), sitemap, robots.txt`

---

## Bloco 3 — Analytics + Performance Final

### Vercel Analytics (Recomendado)

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Nota:** Vercel Analytics é a melhor opção para projetos no Vercel — zero config, privacy-friendly, sem impacto de performance. O free tier cobre até 2.500 eventos/mês.

### Google Analytics (Alternativa/Complementar)

```tsx
// components/analytics/GoogleAnalytics.tsx
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function GoogleAnalytics() {
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
```

### Performance Checklist Final

```
Lighthouse Targets:
[ ] Performance: 95+
[ ] Accessibility: 95+
[ ] Best Practices: 95+
[ ] SEO: 95+

Core Web Vitals:
[ ] LCP (Largest Contentful Paint): < 2.5s
[ ] FID (First Input Delay): < 100ms
[ ] CLS (Cumulative Layout Shift): < 0.1
[ ] INP (Interaction to Next Paint): < 200ms
[ ] TTFB (Time to First Byte): < 800ms

Otimizações aplicadas:
[ ] next/image com priority no hero
[ ] next/font com display: swap
[ ] Dynamic imports para componentes pesados
[ ] ISR ou SSG para pages estáticas
[ ] Bundle < 200KB first load JS
[ ] Preconnect para domínios externos
[ ] Service Worker para caching (opcional)
```

### Headers de Performance (next.config.ts)

```ts
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
  },
  headers: async () => [
    {
      source: '/fonts/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
      ],
    },
  ],
  experimental: {
    optimizeCss: true, // se disponível na versão do Next.js
  },
}
```

### Preconnect para Recursos Externos

```tsx
// app/layout.tsx <head>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

### Validação Final

```bash
# Rodar localmente
pnpm build && pnpm start

# Lighthouse CLI
npx lighthouse https://localhost:3000 --view --preset=desktop
npx lighthouse https://localhost:3000 --view --preset=mobile

# Bundle analysis
ANALYZE=true pnpm build

# PageSpeed Insights (após deploy)
# https://pagespeed.web.dev/analysis?url=https://portifolio-pearl.vercel.app
```

**Commit:** `perf: analytics setup, performance headers, final Lighthouse optimization`

---

## Resumo da Fase 3

| Bloco | Commit | Entregáveis |
|-------|--------|-------------|
| 1 | `seo: dynamic metadata, OG images, twitter cards` | Metadata, OG, Favicon |
| 2 | `seo: JSON-LD, sitemap, robots.txt` | Schema, Sitemap, Robots |
| 3 | `perf: analytics, headers, Lighthouse 95+` | Analytics, Performance |

**Ao final:** `git push origin main` com tag `v3.0-seo-performance-complete`
