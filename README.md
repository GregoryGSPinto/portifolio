<div align="center">

# Portfolio

**Technical Portfolio Built as a Product — Not a Template**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion 12](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)](https://gregorypinto.dev)

[Live Site](https://gregorypinto.dev) · [Source Architecture](#architecture)

</div>

---

## Philosophy

This portfolio is engineered as a product, not assembled from a template. Every architectural decision — from the i18n strategy to the SEO pipeline to the design token system — was made deliberately and can be traced to a specific rationale.

The goal is not to showcase a theme, but to demonstrate how a single engineer approaches system design: structured component boundaries, client-side state machines for theme and language, edge-rendered OG images, structured data for search engines, and a fully bilingual content layer — all in a codebase that stays navigable.

---

## Architecture

### Rendering Strategy

The application uses **Next.js 16 App Router** with a hybrid rendering approach:

- **Static pages** for the homepage, project listings, and blog index (built at compile time via `getAllPosts`)
- **Dynamic routes** with `[slug]` for blog posts and project detail pages
- **Edge Runtime** for the `/api/og` Open Graph image generator (`@vercel/og`)
- **Server-side API routes** for contact form (Resend) and AI chatbot (Claude API)

### Component Architecture

```
app/                    # App Router — pages, layouts, API routes, metadata
  api/
    chat/               # AI chatbot endpoint (Claude Sonnet API)
    contact/            # Contact form with Resend email + honeypot spam filter
    github-stack/       # Live GitHub repo analyzer — builds tech radar from real repos
    og/                 # Edge-rendered Open Graph images (@vercel/og)
  blog/[slug]/          # MDX blog with gray-matter, rehype-pretty-code, reading-time
  projects/[slug]/      # Case study detail pages with localized content
  feed.xml/             # RSS 2.0 feed (route handler)
  sitemap.ts            # Dynamic sitemap including all projects and blog posts
  robots.ts             # Robots.txt with API/internal route exclusions
components/
  hero/                 # Hero section — GradientMesh, Typewriter, animated entry
  layout/               # Navbar, Footer, ScrollProgress, Preloader, SkipLink
  seo/                  # JSON-LD generators (Person, Website, Article, CaseStudy)
  about/                # About section with AnimatedCounter, PhotoFrame, TechBadge
  projects/             # ProjectCard, FilterTabs, category filtering
  skills/               # Skill badges with proficiency visualization
  experience/           # Timeline with animated entries
  contact/              # ContactForm with validation + SocialLinks
  blog/                 # MDXComponents, MDXRemote for rendering
  AIChatbot.tsx         # Floating AI assistant (Claude-powered, bilingual)
context/
  LangContext.tsx        # i18n provider — PT/EN with browser detection + localStorage
  ThemeContext.tsx        # Theme provider — system/light/dark cycle with FOUC prevention
lib/
  data/                 # Structured data: projects, skills, experience, education, i18n
  blog.ts               # MDX file reader with frontmatter parsing and reading time
  design-tokens.ts      # Full dark/light token system (colors, fonts, animations)
  site.ts               # Site config, canonical URLs, social links
  translations.ts       # Complete PT/EN translation tree (270+ keys)
  hooks.ts              # useScrollPosition, useActiveSection
hooks/
  useTilt.ts            # 3D tilt effect for interactive cards
content/
  blog/                 # MDX articles with bilingual frontmatter
types/
  mdx.d.ts              # MDX type declarations
```

### Tech Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Framework** | Next.js 16 + React 19 | App Router for file-based routing, React Server Components for static generation, streaming for API routes |
| **Styling** | Tailwind CSS 4 + CSS custom properties | Utility-first with a full design token system (`globals.css` — 40+ CSS variables per theme) for runtime theme switching |
| **Animations** | Framer Motion 12 | Declarative layout animations, `AnimatePresence` for page transitions, `whileInView` for scroll reveals, `prefers-reduced-motion` respected |
| **i18n** | Client-side context (PT/EN) | No routing overhead — language toggle is instant; browser language auto-detected; 270+ translation keys; blog frontmatter supports bilingual titles/descriptions |
| **Theme** | 3-state cycle (system/light/dark) | Inline `<script>` prevents FOUC; `theme-transition` class enables smooth CSS transitions after hydration; `prefers-color-scheme` media query fallback for no-JS |
| **Blog/MDX** | `next-mdx-remote` + `rehype-pretty-code` + `remark-gfm` | Server-side MDX compilation; syntax highlighting; GitHub-flavored Markdown; reading time calculation |
| **SEO** | JSON-LD + Open Graph + RSS + Sitemap | 4 schema types (Person, Website, BlogPosting, CreativeWork); dynamic OG images via Edge; RSS 2.0 with per-post tags; programmatic sitemap |
| **Contact** | Resend API + honeypot | Server-side email delivery with graceful fallback when API key is absent; honeypot field for bot filtering |
| **AI Chatbot** | Claude Sonnet API | Floating assistant with bilingual support, suggestion chips, typing indicator; API route with 10-message context window |
| **GitHub Stack API** | Live repo analyzer | `/api/github-stack` fetches all public repos, reads `package.json` files, detects languages and frameworks, builds a categorized tech radar with skill scoring — cached for 1 hour |
| **Fonts** | Outfit (display/body) + DM Mono (monospace) | `display: swap` for performance; CSS variables for consistent usage |
| **Analytics** | Vercel Analytics + Speed Insights | Zero-config, privacy-respecting, no cookie banners required |
| **Images** | AVIF + WebP | `next.config.ts` configured with `formats: ['image/avif', 'image/webp']`; immutable cache headers for fonts; long-lived cache for images |
| **Quality** | ESLint 9 + TypeScript strict + `pnpm check` | Combined quality gate: `typecheck && lint:strict && build` — must pass before deploy |

---

## Features

### Internationalization (PT/EN)
Client-side language context with automatic browser detection. Toggle persisted to `localStorage`. Every UI string, navigation label, project description, and blog title is bilingual. The `<html lang>` attribute updates dynamically.

### Theme System (System / Light / Dark)
Three-state theme cycle with an inline blocking script that reads `localStorage` before first paint — eliminating flash of unstyled content. CSS custom properties (40+ tokens per theme) enable instant switching. A `theme-transition` class is added after hydration to enable smooth color transitions. `prefers-color-scheme` media query provides a fallback for users without JavaScript.

### AI Assistant
Floating chatbot powered by Claude Sonnet, conditionally rendered via `NEXT_PUBLIC_CHATBOT_ENABLED`. Features bilingual conversation, pre-built suggestion chips, typing indicator with bouncing dots, and a 10-message sliding context window. Accessible with proper `aria-label` attributes.

### SEO Pipeline
- **JSON-LD**: Person, Website, BlogPosting, and CreativeWork schemas injected in `<head>`
- **Open Graph**: Dynamic edge-rendered images via `@vercel/og` with customizable title/subtitle
- **Sitemap**: Programmatic generation covering homepage, projects, blog posts, and RSS feed
- **Robots.txt**: Allows all crawlers, blocks `/api/` and `/_next/`
- **RSS 2.0**: Auto-generated feed with per-post categories and proper `Cache-Control` headers
- **Canonical URLs**: Configured with `alternates` for `pt-BR` and `en-US`

### Animations & UX
- **Framer Motion**: Staggered fade-up on hero, `whileInView` scroll reveals for every section, `AnimatePresence` for route/modal transitions
- **Preloader**: SVG path-drawing animation (session-aware — shows once per session, respects `prefers-reduced-motion`)
- **Scroll progress**: Accent-colored progress bar with `role="progressbar"` and ARIA attributes
- **Gradient mesh**: Animated CSS blob backgrounds with `blobDrift` keyframes
- **Typewriter**: Rotating text effect in the hero section
- **Noise texture**: CSS SVG filter overlay for subtle grain
- **Reduced motion**: Full `prefers-reduced-motion: reduce` support — all animations and transitions disabled

### Accessibility
- Skip-to-content link (bilingual)
- `focus-visible` outlines on all interactive elements
- ARIA roles and labels on navigation, progress bar, chatbot, and mobile menu
- Keyboard navigation: Escape closes mobile menu and modals
- Scroll locking when mobile menu is open
- Semantic HTML with proper heading hierarchy

### Performance
- Dynamic imports (`next/dynamic`) for below-fold sections (Projects, Skills, Timeline, Contact, Chatbot)
- `ssr: false` for client-only components (NoiseTexture, AIChatbot)
- Font optimization with `display: swap` and CSS variables
- Image optimization with AVIF/WebP formats
- Immutable cache headers for fonts (`max-age=31536000`)
- RSS and GitHub API responses with `Cache-Control` headers

### Blog Engine
MDX-based blog with `gray-matter` for frontmatter parsing, `next-mdx-remote` for server-side rendering, `rehype-pretty-code` for syntax highlighting, `rehype-slug` for heading anchors, `remark-gfm` for GitHub-flavored Markdown, and `reading-time` for per-post time estimates. Supports bilingual frontmatter (`title.pt`, `title.en`), draft filtering, and tag extraction.

### Case Studies (6 Projects)
Each project is a structured data object with localized fields: challenge, approach, architecture, results, highlights, tradeoffs, and technical decisions. Rendered on dedicated `/projects/[slug]` pages with CaseStudy JSON-LD and dynamic OG images.

---

## Getting Started

```bash
# Clone
git clone https://github.com/GregoryGSPinto/portifolio.git
cd portifolio

# Install dependencies
pnpm install

# Development
pnpm dev

# Quality gate (typecheck + lint + build)
pnpm check

# Production build
pnpm build
pnpm start
```

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `RESEND_API_KEY` | Email delivery for contact form | Optional (graceful fallback) |
| `CONTACT_EMAIL` | Override recipient email | Optional |
| `ANTHROPIC_API_KEY` | Claude API for AI chatbot | Optional |
| `NEXT_PUBLIC_CHATBOT_ENABLED` | Enable floating AI assistant | Optional |
| `GITHUB_TOKEN` | Higher rate limit for GitHub stack API | Optional |

---

## Project Structure

```
portifolio/
├── app/                # Next.js App Router
│   ├── api/            # 4 API routes (chat, contact, github-stack, og)
│   ├── blog/           # Blog listing + [slug] detail pages
│   ├── projects/       # Project listing + [slug] case study pages
│   ├── feed.xml/       # RSS 2.0 route handler
│   ├── sitemap.ts      # Dynamic sitemap
│   ├── robots.ts       # Robots.txt
│   ├── layout.tsx      # Root layout (fonts, providers, SEO, analytics)
│   └── page.tsx        # Homepage (static generation)
├── components/         # ~30 React components across 10 domains
├── content/blog/       # MDX articles
├── context/            # LangContext + ThemeContext providers
├── hooks/              # Custom hooks (useTilt)
├── lib/                # Data layer, blog engine, site config, design tokens
├── public/             # Static assets
└── types/              # TypeScript declarations
```

---

## Author

**Gregory Guimaraes Pinto** — Senior AI Solutions Architect

[GitHub](https://github.com/GregoryGSPinto) · [LinkedIn](https://www.linkedin.com/in/mqt-gregory/) · [gregorypinto.dev](https://gregorypinto.dev)
