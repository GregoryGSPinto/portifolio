# PORTFOLIO_REDESIGN.md — Fase 2: Redesign Premium World-Class

> **Objetivo:** Transformar o portfólio em algo que faz CTOs e recrutadores pararem.
> **Estética:** Editorial luxury meets developer craft. Dark-first, tipografia impactante, motion design cinematográfico.
> **Referências de nível:** brittanychiang.com (elegância), leerob.io (conteúdo), bruno-simon.com (criatividade)
> **Commits:** 1 por bloco | Push ao final da fase

---

## Design System — Fundação

### Direção Estética
**"Architectural Precision"** — O portfólio de um Solution Architect deve parecer arquitetura: estruturado, preciso, com detalhes que revelam craft. Dark mode dominante com acentos luminosos. Tipografia editorial. Espaço generoso. Cada pixel com propósito.

### Paleta de Cores

```tsx
// lib/design-tokens.ts
export const colors = {
  dark: {
    bg: {
      primary: '#0A0A0B',       // Quase preto, com personalidade
      secondary: '#111113',     // Cards, seções alternadas
      tertiary: '#1A1A1F',      // Hover states, elevações
      glass: 'rgba(17,17,19,0.8)', // Glassmorphism
    },
    text: {
      primary: '#FAFAF9',       // Títulos — warm white
      secondary: '#A1A1AA',     // Body text — zinc-400
      tertiary: '#71717A',      // Captions, meta — zinc-500
      accent: '#6EE7B7',        // Destaque principal — emerald-300
    },
    border: {
      subtle: 'rgba(255,255,255,0.06)',
      medium: 'rgba(255,255,255,0.12)',
      accent: '#6EE7B7',
    },
    accent: {
      primary: '#6EE7B7',       // Emerald — sofisticado, tech
      secondary: '#34D399',     // Emerald-400 — hover
      glow: 'rgba(110,231,183,0.15)', // Glow sutil
    },
  },
  light: {
    bg: {
      primary: '#FAFAF9',
      secondary: '#F4F4F5',
      tertiary: '#E4E4E7',
      glass: 'rgba(250,250,249,0.8)',
    },
    text: {
      primary: '#09090B',
      secondary: '#3F3F46',
      tertiary: '#71717A',
      accent: '#059669',
    },
    border: {
      subtle: 'rgba(0,0,0,0.06)',
      medium: 'rgba(0,0,0,0.12)',
      accent: '#059669',
    },
    accent: {
      primary: '#059669',
      secondary: '#047857',
      glow: 'rgba(5,150,105,0.1)',
    },
  },
} as const
```

### Tipografia

```tsx
// app/layout.tsx — Fonts
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

// Display: Satoshi — geométrica, moderna, premium
// Alternativas: General Sans, Clash Display, Cabinet Grotesk
const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Satoshi-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700' },
    { path: '../public/fonts/Satoshi-Black.woff2', weight: '900' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

// Mono: JetBrains Mono — para code snippets e métricas
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

**Download Satoshi (free):** https://www.fontshare.com/fonts/satoshi

### Tailwind Config

```ts
// tailwind.config.ts (extensões relevantes)
{
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'reveal': 'reveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'counter': 'counter 2s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        reveal: { from: { opacity: '0', transform: 'translateY(40px)', filter: 'blur(10px)' }, to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' } },
        glowPulse: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
        gradientShift: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/textures/noise.png')",
      },
    },
  },
}
```

### CSS Variables Globais

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg: 250 250 249;
    --color-text: 9 9 11;
    --color-accent: 5 150 105;
    --section-padding: clamp(4rem, 10vw, 8rem);
    --content-max: 1200px;
    --header-height: 72px;
  }

  .dark {
    --color-bg: 10 10 11;
    --color-text: 250 250 249;
    --color-accent: 110 231 183;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-height);
  }

  body {
    @apply bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] font-sans antialiased;
    /* Noise texture overlay sutil */
    background-image: url('/textures/noise.png');
    background-size: 200px;
    background-blend-mode: overlay;
  }

  /* Selection color */
  ::selection {
    @apply bg-emerald-500/20 text-emerald-300;
  }
}
```

---

## Bloco 1 — Navbar & Global Layout

### Especificação

```
┌─────────────────────────────────────────────────────────────┐
│  GG    Home  Projects  About  Blog  Contact    PT|EN  ◐/☀  │
│  ↑      ↑                                       ↑     ↑    │
│  Logo   Nav links (smooth scroll)          Lang  Theme      │
└─────────────────────────────────────────────────────────────┘
```

### Comportamento
- **Scroll = 0:** Background transparente, logo e links brancos
- **Scroll > 80px:** Background blur + sutil, border-bottom sutil, levemente compacta
- **Mobile:** Hamburger menu → slide-in panel com backdrop blur
- **Active section:** Indicador sutil no link correspondente (dot ou underline animado)
- **Logo "GG":** Monograma tipográfico, hover com glow accent

### Componentes

```
components/
├── layout/
│   ├── Navbar.tsx          # Navbar principal
│   ├── NavLink.tsx         # Link com active state
│   ├── MobileMenu.tsx      # Menu mobile slide-in
│   ├── ThemeToggle.tsx     # Dark/Light switch animado
│   ├── LangToggle.tsx      # PT-BR/EN toggle
│   ├── Footer.tsx          # Footer global
│   └── ScrollProgress.tsx  # Barra de progresso no topo
```

### Detalhes de Implementação

1. **Navbar com scroll detection:**
   ```tsx
   // Usa IntersectionObserver para detectar seção ativa
   // useMotionValueEvent do framer-motion para scroll progress
   // backdrop-filter: blur(12px) saturate(180%) quando scrolled
   ```

2. **Theme Toggle** — Ícone sol/lua com transição morphing (framer-motion `layoutId`)

3. **Lang Toggle** — Pill toggle `[PT · EN]` com indicador sliding

4. **Scroll Progress** — Barra fina (2px) no absolute top, cor accent, width baseado em scroll %

5. **Footer:**
   ```
   ┌──────────────────────────────────────────────┐
   │  Built with Next.js, TypeScript & ♥          │
   │  © 2025 Gregory G. S. Pinto                  │
   │  Source Code ↗                                │
   └──────────────────────────────────────────────┘
   ```

**Commit:** `feat(layout): navbar with scroll behavior, theme/lang toggle, footer, scroll progress`

---

## Bloco 2 — Hero Section (Cinematográfico)

### Layout

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                          (gradient mesh bg)                      │
│                                                                  │
│              ░░ reveal animation ░░                               │
│              Gregory G. S. Pinto                                 │
│                                                                  │
│              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                     │
│              AI Solutions Architect                               │
│                                                                  │
│              ┌─────────────┐  ┌───────────┐                     │
│              │ typewriter: │  │           │                      │
│              │ "Solution   │  │ Typing    │                      │
│              │  Architect" │  │ cursor _  │                      │
│              └─────────────┘  └───────────┘                     │
│                                                                  │
│         [ View My Work ▼ ]    [ Download CV ↓ ]                  │
│                                                                  │
│                          SCROLL ↓                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Animação Sequencial (Stagger)

```
t=0.0s  — Background gradient mesh fade in
t=0.3s  — Nome reveal (clip-path de baixo para cima, com blur→clear)
t=0.6s  — Subtítulo fade in + slide up
t=0.9s  — Typewriter inicia: "Solution Architect" → "AI Specialist" → "UX Engineer" → loop
t=1.2s  — CTAs fade in + slide up
t=1.8s  — Scroll indicator pulsa suave
```

### Background — Gradient Mesh Animado

```tsx
// components/hero/GradientMesh.tsx
// Canvas-based ou CSS-only gradient mesh
// 3-4 blobs de cor que se movem lentamente
// Cores: emerald glow + subtle blue/purple
// Performance: requestAnimationFrame com throttle
// Fallback: CSS gradient estático para reduced-motion
```

**Opção alternativa (mais leve):** Grid de linhas/pontos estilo "architectural blueprint" que faz parallax sutil no scroll.

### Typewriter Effect

```tsx
// components/hero/Typewriter.tsx
// Cicla entre roles com efeito de digitação + delete
// Roles: ["Solution Architect", "AI Specialist", "UX Engineer", "System Designer"]
// Cursor blinking: 530ms interval
// Velocidade de digitação: 80ms/char, delete: 40ms/char
// Pausa entre roles: 2000ms
```

### CTAs

- **"View My Work"** — Smooth scroll para Projects section, estilo: filled accent button com hover glow
- **"Download CV"** — Link para PDF, estilo: ghost/outline button com arrow icon

### Responsivo
- **Mobile:** Stack vertical, nome em 2 linhas se necessário, gradient mesh simplificado
- **Tablet:** Mantém layout mas reduz spacing

**Commit:** `feat(hero): cinematic hero with gradient mesh, typewriter, staggered reveal`

---

## Bloco 3 — About Section

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  01 — About                                                  │
│                                                              │
│  ┌──────────┐                                                │
│  │          │   Gregory G. S. Pinto                          │
│  │  PHOTO   │   AI Solutions Architect · São Paulo, BR       │
│  │          │                                                │
│  │  (hover: │   Arquiteto de soluções que transforma         │
│  │  parallax│   operações complexas em sistemas              │
│  │  tilt)   │   escaláveis e decisões data-driven.           │
│  └──────────┘   Foco em DDD, Event Sourcing e AI/ML          │
│                 para plataformas enterprise.                  │
│                                                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                    │
│  │ 5+   │  │  3   │  │ 900+ │  │ 95+  │                    │
│  │ Anos │  │Projetos│ │Testes│  │Light-│                    │
│  │ Exp  │  │Enterprise│Pass │  │house │                    │
│  └──────┘  └──────┘  └──────┘  └──────┘                    │
│  ↑ counter animation on scroll into view                     │
│                                                              │
│  Tech Stack:                                                 │
│  [React] [Next.js] [TypeScript] [Node] [Supabase]           │
│  [Python] [TailwindCSS] [Docker] [Azure] [Vercel]           │
│  [DDD] [Event Sourcing] [CQRS] [AI/ML] [Figma]             │
│  ↑ cada badge com ícone SVG, hover: scale + glow             │
└──────────────────────────────────────────────────────────────┘
```

### Métricas com Counter Animation

```tsx
// components/about/AnimatedCounter.tsx
// Usa framer-motion useMotionValue + useTransform
// Trigger: IntersectionObserver (quando entra no viewport)
// Easing: easeOut sobre 2 segundos
// Formato: "5+" / "3" / "900+" / "95+"
// Estilo: número em font-mono text-4xl accent color
```

### Tech Badges

```tsx
// components/about/TechBadge.tsx
// Ícone SVG (devicons ou simple-icons) + label
// Estado normal: outline sutil, ícone em secondary color
// Hover: background accent/10, ícone em accent color, scale(1.05)
// Tooltip com nota (ex: "Primary stack — 3+ years")
// Grid responsivo: 5 colunas desktop → 3 mobile
```

### Foto

- **Placeholder:** Gradient mesh circular ou iniciais "GG" estilizadas
- **Futura:** Foto real com efeito duotone ou grayscale → color on hover
- **Borda:** Dashed border accent com rotation sutil no hover

**Commit:** `feat(about): bio section with animated counters, tech badges, photo placeholder`

---

## Bloco 4 — Projects Section (CRÍTICO)

### Layout Overview

```
┌──────────────────────────────────────────────────────────────┐
│  02 — Projects                                               │
│                                                              │
│  Impacto Mensurável                                          │
│                                                              │
│  [All] [Enterprise] [AI/ML] [Frontend]    ← filter tabs      │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │  ╔═══════════════╗  │  │  ╔═══════════════╗  │           │
│  │  ║  screenshot   ║  │  │  ║  screenshot   ║  │           │
│  │  ╚═══════════════╝  │  │  ╚═══════════════╝  │           │
│  │                     │  │                     │           │
│  │  EFVM 360           │  │  BlackBelt OS       │           │
│  │  Enterprise Rail Ops│  │  Martial Arts SaaS  │           │
│  │                     │  │                     │           │
│  │  [React][TS][Azure] │  │  [Next][Supa][ML]   │           │
│  │                     │  │                     │           │
│  │  451 testes · 15 mod│  │  473 testes · 8 ML  │           │
│  │                     │  │                     │           │
│  │  Live ↗  GitHub ↗   │  │  Live ↗  GitHub ↗   │           │
│  └─────────────────────┘  └─────────────────────┘           │
│  ↑ 3D tilt on hover (perspective transform)                  │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │  This Portfolio                               │           │
│  │  (card menor, featured = false)               │           │
│  └──────────────────────────────────────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

### Project Card — Componente

```tsx
// components/projects/ProjectCard.tsx
interface ProjectCardProps {
  project: {
    slug: string
    title: string
    subtitle: string
    description: string
    image: string  // screenshot ou OG image
    tags: string[]
    metrics: { label: string; value: string }[]
    links: { live?: string; github?: string }
    featured: boolean
    category: 'enterprise' | 'ai-ml' | 'frontend'
  }
}

// Efeitos:
// 1. 3D Tilt — perspective(1000px) rotateX/Y baseado no mouse position
// 2. Shine effect — gradient radial que segue o cursor
// 3. Border glow — accent color glow no hover
// 4. Image zoom — scale(1.05) na screenshot com overflow hidden
// 5. Tags slide — badges deslizam para cima revelando métricas
```

### 3D Tilt Implementation

```tsx
// hooks/useTilt.ts
// Calcula rotateX e rotateY baseado na posição do mouse relativa ao card
// Max rotation: 8deg
// Smooth: transition duration 150ms
// Reset: volta a (0,0) no mouse leave com spring animation
// Reduced motion: desabilita completamente
```

### Project Detail — Expandido (Modal ou Page)

Quando clica no card, abre detail view com transição suave:

```
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Projects                                          │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │           HERO IMAGE / SCREENSHOT            │           │
│  └──────────────────────────────────────────────┘           │
│                                                              │
│  EFVM 360                                                    │
│  Plataforma Digital de Gestão Operacional 360°               │
│                                                              │
│  [Live Demo ↗]  [GitHub ↗]                                  │
│                                                              │
│  ────────────────────────────────────────────                │
│                                                              │
│  🎯 O Desafio                                               │
│  Descrição do problema...                                    │
│                                                              │
│  💡 A Solução                                                │
│  Abordagem e decisões...                                     │
│                                                              │
│  🏗️ Arquitetura                                              │
│  ┌──────────────────────────────────────┐                   │
│  │  Diagrama de arquitetura (Mermaid    │                   │
│  │  ou SVG custom)                      │                   │
│  └──────────────────────────────────────┘                   │
│                                                              │
│  📊 Resultados & Métricas                                    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                      │
│  │ 451  │ │  15  │ │  19  │ │  5   │                       │
│  │Tests │ │Mods  │ │APIs  │ │Aggr. │                       │
│  └──────┘ └──────┘ └──────┘ └──────┘                      │
│                                                              │
│  ⚡ Decisões Técnicas                                        │
│  Accordion/expandable cards com cada ADR                     │
│                                                              │
│  🛠️ Stack Detalhado                                          │
│  Grid de tech badges com descrição                           │
│                                                              │
│  🖥️ Preview ao Vivo                                          │
│  iframe embed do projeto                                     │
└──────────────────────────────────────────────────────────────┘
```

### Dados dos Projetos

```tsx
// lib/data/projects.ts
// Cada projeto com versão PT-BR e EN
// Estrutura: slug, title, subtitle, description, challenge,
//            approach, architecture, results, techDecisions[],
//            stack[], metrics[], links, image, featured, category

export const projects = {
  'efvm360': {
    en: { title: 'EFVM 360', subtitle: 'Enterprise Railway Operations Platform', ... },
    pt: { title: 'EFVM 360', subtitle: 'Plataforma de Operações Ferroviárias', ... },
    metrics: [
      { value: '451', label: 'Automated Tests' },
      { value: '15', label: 'Modules' },
      { value: '19', label: 'API Endpoints' },
      { value: '5', label: 'DDD Aggregates' },
    ],
    stack: ['React 18', 'TypeScript', 'Vite', 'Express', 'MySQL', 'Azure', ...],
    links: { live: 'https://efvm360.vercel.app', github: 'https://github.com/GregoryGSPinto/efvm360' },
    featured: true,
    category: 'enterprise',
  },
  'blackbelt': {
    en: { title: 'BlackBelt OS', subtitle: 'Martial Arts Academy SaaS', ... },
    pt: { title: 'BlackBelt OS', subtitle: 'SaaS para Academias de Artes Marciais', ... },
    metrics: [
      { value: '473', label: 'Passing Tests' },
      { value: '8', label: 'ML Engines' },
      { value: '109', label: 'Pages' },
      { value: '7', label: 'Bounded Contexts' },
    ],
    stack: ['Next.js 14', 'Supabase', 'TypeScript', 'Event Sourcing', 'DDD', ...],
    links: { live: 'https://blackbelt-five.vercel.app', github: 'https://github.com/GregoryGSPinto/blackbelt' },
    featured: true,
    category: 'enterprise',
  },
}
```

**Commit:** `feat(projects): 3D tilt cards, project detail pages, data layer, filter tabs`

---

## Bloco 5 — Skills Section

### Layout — Radar Chart + Categories

```
┌──────────────────────────────────────────────────────────────┐
│  03 — Skills                                                 │
│                                                              │
│  Arsenal Tecnológico                                         │
│                                                              │
│  ┌──────────────────────┐  ┌────────────────────────────┐   │
│  │                      │  │  Frontend                   │   │
│  │   RADAR CHART        │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 95%     │   │
│  │   (interativo)       │  │  React, Next.js, TS,       │   │
│  │                      │  │  Tailwind, Framer Motion    │   │
│  │   Eixos:             │  │                             │   │
│  │   - Frontend         │  │  Backend                    │   │
│  │   - Backend          │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░ 85%      │   │
│  │   - Architecture     │  │  Node, Express, Supabase,   │   │
│  │   - AI/ML            │  │  MySQL, PostgreSQL          │   │
│  │   - DevOps           │  │                             │   │
│  │   - UX/Design        │  │  Architecture               │   │
│  │                      │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ 90%      │   │
│  │                      │  │  DDD, CQRS, Event Sourcing, │   │
│  └──────────────────────┘  │  Clean Arch, Microservices  │   │
│                             │                             │   │
│                             │  AI & Machine Learning      │   │
│                             │  ▓▓▓▓▓▓▓▓▓▓▓░░░ 75%       │   │
│                             │  LLMs, RAG, ML Pipelines,   │   │
│                             │  Prompt Engineering         │   │
│                             │                             │   │
│                             │  DevOps & Cloud             │   │
│                             │  ▓▓▓▓▓▓▓▓▓▓░░░░ 70%       │   │
│                             │  Docker, Azure, Vercel,     │   │
│                             │  GitHub Actions, CI/CD      │   │
│                             └────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

### Radar Chart

```tsx
// components/skills/SkillRadar.tsx
// Usar Recharts RadarChart ou D3.js custom
// Animação: desenha de 0% para valor final ao entrar no viewport
// Interativo: hover em cada eixo destaca a categoria
// Responsivo: em mobile, mostra apenas as barras (sem radar)
// Cores: accent para fill, border para stroke
```

### Skill Bars

```tsx
// components/skills/SkillBar.tsx
// Barra horizontal com animação de preenchimento
// Label à esquerda, porcentagem à direita
// Sub-labels: tecnologias específicas como tags
// Trigger: scroll into view (IntersectionObserver)
// Duration: 1.5s com easing easeOut
// Stagger: 100ms entre cada barra
```

**Commit:** `feat(skills): interactive radar chart, animated skill bars, responsive layout`

---

## Bloco 6 — Experience Timeline

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  04 — Experience                                             │
│                                                              │
│  Evolução Profissional                                       │
│                                                              │
│        2025 ─── ● ──────────────────────────────────         │
│                 │  AI Solutions Architect                     │
│                 │  Freelancer / Consultoria                   │
│                 │  Jan 2025 — Presente                        │
│                 │                                             │
│                 │  Arquitetura de soluções enterprise          │
│                 │  com IA integrada, liderança de              │
│                 │  projetos end-to-end.                        │
│                 │                                             │
│                 │  [Next.js] [Supabase] [AI/ML] [DDD]        │
│                 │                                             │
│        2024 ─── ● ──────────────────────────────────         │
│                 │  Full Stack Developer                       │
│                 │  Projetos Independentes                     │
│                 │  2024                                       │
│                 │  ...                                        │
│                 │                                             │
│        2023 ─── ● ──────────────────────────────────         │
│                 │  Frontend Developer                         │
│                 │  ...                                        │
└──────────────────────────────────────────────────────────────┘
```

### Implementação

```tsx
// components/experience/Timeline.tsx
// - Linha vertical com dots nos milestones
// - Cada entry anima ao entrar no viewport (slide from left/right alternado)
// - Dot pulsa quando entry está no viewport ativo
// - Tags de tech stack no rodapé de cada entry
// - Mobile: todas as entries à direita da linha

// components/experience/TimelineEntry.tsx
interface TimelineEntryProps {
  year: string
  title: string
  company: string
  period: string
  description: string  // PT e EN
  tags: string[]
  side: 'left' | 'right'  // alternado em desktop
}
```

### Dados

```tsx
// lib/data/experience.ts
export const experience = [
  {
    year: '2025',
    en: { title: 'AI Solutions Architect', company: 'Freelance / Consulting', period: 'Jan 2025 — Present', description: '...' },
    pt: { title: 'AI Solutions Architect', company: 'Freelancer / Consultoria', period: 'Jan 2025 — Presente', description: '...' },
    tags: ['Next.js', 'Supabase', 'AI/ML', 'DDD', 'Event Sourcing'],
  },
  // ...
]
```

**Commit:** `feat(experience): animated timeline with scroll reveal, alternating layout`

---

## Bloco 7 — Contact Section

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  05 — Contact                                                │
│                                                              │
│  Vamos Conversar                                             │
│                                                              │
│  Pronto para transformar ideias em arquiteturas que escalam. │
│                                                              │
│  ┌────────────────────────────────────────┐                  │
│  │  Nome:     [________________]          │                  │
│  │  Email:    [________________]          │                  │
│  │  Assunto:  [________________]          │                  │
│  │  Mensagem: [________________]          │                  │
│  │            [________________]          │                  │
│  │            [________________]          │                  │
│  │                                        │                  │
│  │  [ Enviar Mensagem → ]                 │                  │
│  └────────────────────────────────────────┘                  │
│                                                              │
│  ──── ou encontre-me em ────                                 │
│                                                              │
│  📧 gregoryguimaraes12@outlook.com                           │
│  🐙 github.com/GregoryGSPinto                               │
│  💼 linkedin.com/in/mqt-gregory                              │
│  📱 +55 31 99679-3625                                        │
└──────────────────────────────────────────────────────────────┘
```

### Form Funcional

```tsx
// app/api/contact/route.ts
// Server action usando Resend (resend.com) — free tier = 100 emails/day
// Validação com zod
// Rate limiting básico (1 envio por IP/minuto)
// Feedback visual: loading → success → error states

// Schema:
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
})
```

### Social Links

```tsx
// components/contact/SocialLinks.tsx
// Cada link: ícone SVG + texto + hover effect (slide underline)
// Copy-to-clipboard no email (tooltip "Copied!")
// Ícones: GitHub, LinkedIn, Email, Phone
```

**Commit:** `feat(contact): functional form with Resend, social links, validation`

---

## Bloco 8 — Global Features & Polish

### 8.1 — Dark/Light Mode Premium

```tsx
// context/ThemeContext.tsx
// Persiste no localStorage
// Respeita prefers-color-scheme como default
// Transição suave: 200ms em background e color
// Sem flash on load (script no <head> para detectar antes do render)
```

### 8.2 — Bilíngue PT-BR / EN

```tsx
// context/LangContext.tsx
// Persiste no localStorage
// Detecta navigator.language como default
// Todos os textos em lib/data/i18n.ts
// Estrutura: { en: { hero: { title: '...' } }, pt: { hero: { title: '...' } } }
// Hook: const { t, lang, toggleLang } = useLang()
// Uso: <h1>{t('hero.title')}</h1>
```

### 8.3 — Page Transitions (Framer Motion)

```tsx
// components/layout/PageTransition.tsx
// Wrap cada seção com AnimatePresence
// Entry: fadeIn + slideUp com stagger nos children
// Exit: fadeOut rápido
// Usar framer-motion variants para consistência
```

### 8.4 — Scroll Reveal

```tsx
// hooks/useScrollReveal.ts
// IntersectionObserver wrapper
// Configurable: threshold, rootMargin, once (boolean)
// Retorna ref + isInView
// Integra com framer-motion whileInView se disponível
```

### 8.5 — Loading Animation (First Visit)

```tsx
// components/layout/Preloader.tsx
// Animação: Logo "GG" desenha (SVG path animation)
// Duração: ~2 segundos
// Após: slide up reveal do conteúdo
// Mostra apenas na primeira visita (sessionStorage flag)
// Reduced motion: skip direto
```

### 8.6 — Cursor Customizado (Opcional)

```tsx
// components/ui/CustomCursor.tsx
// Dot cursor (8px) + circle follower (32px) com delay
// Muda estilo em hoverable elements (scale up, blend mode)
// Desabilitado em touch devices
// Desabilitado com reduced-motion
```

### 8.7 — Noise Texture Overlay

```css
/* Overlay sutil que adiciona textura premium */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.015;
  background-image: url('/textures/noise.png');
  background-size: 200px;
}
```

**Commit:** `feat(global): dark/light mode, i18n, transitions, preloader, scroll reveal`

---

## Bloco 9 — Extras (Diferenciadores)

### 9.1 — Architecture Diagram Section

Manter e melhorar a seção "System Design" que já existe, com diagrama de camadas animado. Usar SVG customizado ou Mermaid renderizado.

### 9.2 — AI & Automation Section

Manter e refinar. Adicionar link para o chatbot (se mantido) ou showcasar as capacidades de AI integradas nos projetos.

### 9.3 — Certifications Section

Grid compacto de certificações com badges visuais.

### 9.4 — Process Section

Manter o flow "Descoberta → Arquitetura → Implementação → Deploy → Monitoramento" com visual melhorado (stepper horizontal no desktop, vertical no mobile).

### 9.5 — Blog Teaser

Se o blog for implementado (Fase 4), mostrar os 3 posts mais recentes em cards compactos.

**Commit:** `feat(extras): architecture diagram, certifications, process, blog teaser`

---

## Estrutura Final de Arquivos

```
portifolio/
├── app/
│   ├── layout.tsx              # Root layout (fonts, theme, lang)
│   ├── page.tsx                # Home (todas as seções)
│   ├── globals.css             # Global styles + CSS variables
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Contact form API
│   └── projects/
│       └── [slug]/
│           └── page.tsx        # Project detail page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LangToggle.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── PageTransition.tsx
│   │   ├── Preloader.tsx
│   │   └── SkipLink.tsx
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── GradientMesh.tsx
│   │   └── Typewriter.tsx
│   ├── about/
│   │   ├── About.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── TechBadge.tsx
│   │   └── PhotoFrame.tsx
│   ├── projects/
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetail.tsx
│   │   └── FilterTabs.tsx
│   ├── skills/
│   │   ├── Skills.tsx
│   │   ├── SkillRadar.tsx
│   │   └── SkillBar.tsx
│   ├── experience/
│   │   ├── Experience.tsx
│   │   ├── Timeline.tsx
│   │   └── TimelineEntry.tsx
│   ├── contact/
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx
│   │   └── SocialLinks.tsx
│   └── ui/
│       ├── SectionHeader.tsx   # "01 — About" estilo consistente
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── CustomCursor.tsx
│       └── NoiseOverlay.tsx
├── context/
│   ├── ThemeContext.tsx
│   └── LangContext.tsx
├── hooks/
│   ├── useTilt.ts
│   ├── useScrollReveal.ts
│   ├── useReducedMotion.ts
│   ├── useActiveSection.ts
│   └── useCounter.ts
├── lib/
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   └── i18n.ts
│   ├── design-tokens.ts
│   └── utils.ts
├── public/
│   ├── fonts/
│   │   ├── Satoshi-Regular.woff2
│   │   ├── Satoshi-Medium.woff2
│   │   ├── Satoshi-Bold.woff2
│   │   └── Satoshi-Black.woff2
│   ├── textures/
│   │   └── noise.png
│   ├── images/
│   │   ├── projects/
│   │   │   ├── efvm360-hero.webp
│   │   │   └── blackbelt-hero.webp
│   │   └── gregory-photo.webp  # quando disponível
│   ├── cv/
│   │   └── gregory-pinto-cv.pdf
│   ├── favicon.ico
│   ├── favicon-dark.ico
│   └── og-image.png
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Dependências a Adicionar

```bash
pnpm add framer-motion resend @vercel/analytics
pnpm add -D @next/bundle-analyzer
```

**Nota:** Recharts já pode estar presente. Se não, `pnpm add recharts`.

---

## Resumo da Fase 2

| Bloco | Commit | Seções |
|-------|--------|--------|
| 1 | `feat(layout): navbar, theme/lang toggle, footer, scroll progress` | Navbar, Footer, ScrollProgress |
| 2 | `feat(hero): cinematic hero with gradient mesh, typewriter` | Hero |
| 3 | `feat(about): bio, animated counters, tech badges` | About |
| 4 | `feat(projects): 3D tilt cards, detail pages, filters` | Projects |
| 5 | `feat(skills): radar chart, animated skill bars` | Skills |
| 6 | `feat(experience): animated timeline` | Experience |
| 7 | `feat(contact): functional form, social links` | Contact |
| 8 | `feat(global): dark/light, i18n, transitions, preloader` | Global |
| 9 | `feat(extras): architecture, certs, process, blog teaser` | Extras |

**Ao final:** `git push origin main` com tag `v2.0-redesign-complete`
