# PORTFOLIO_CTO_AUDIT.md — Fase 1: Audit & Cleanup

> **Objetivo:** Limpar, proteger e otimizar a base de código antes do redesign.
> **Executor:** Claude Code autônomo via `run-master.sh`
> **Commits:** 1 por bloco | Push ao final da fase

---

## Bloco 1 — Segurança (.env, secrets, gitignore)

### Checklist

```
[ ] Verificar se .env ou .env.local estão commitados no histórico git
[ ] Auditar .gitignore — garantir cobertura completa
[ ] Verificar .env.example — apenas keys sem valores reais
[ ] Checar se há API keys, tokens ou secrets hardcoded em qualquer arquivo
[ ] Verificar se next.config.ts expõe variáveis sensíveis ao client
```

### Ações

1. **Auditar histórico git por secrets vazados:**
   ```bash
   git log --all --full-history -p -- '*.env' '*.env.local' '*.env.production'
   grep -rn "sk-\|NEXT_PUBLIC_\|API_KEY\|SECRET\|PASSWORD\|TOKEN" --include="*.ts" --include="*.tsx" --include="*.js" .
   ```

2. **Atualizar `.gitignore`** (merge com template Next.js recomendado):
   ```gitignore
   # dependencies
   node_modules/
   .pnp/
   .pnp.js

   # env files
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   .env.production

   # next.js
   .next/
   out/

   # build
   build/
   dist/

   # misc
   .DS_Store
   *.pem
   .vercel
   *.tsbuildinfo
   next-env.d.ts

   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   pnpm-debug.log*

   # IDE
   .vscode/
   .idea/
   *.swp
   *.swo
   ```

3. **Validar `next.config.ts`:**
   - Somente variáveis `NEXT_PUBLIC_*` no client bundle
   - Nenhum `env: {}` expondo server secrets

4. **Atualizar `.env.example`:**
   ```env
   # AI Chatbot (se usar)
   NEXT_PUBLIC_CHATBOT_ENABLED=false
   OPENAI_API_KEY=your_openai_key_here

   # Contact Form
   RESEND_API_KEY=your_resend_key_here
   CONTACT_EMAIL=your_email@example.com

   # Analytics (opcional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

**Commit:** `security: audit secrets, update .gitignore and .env.example`

---

## Bloco 2 — Build & TypeScript (zero errors, dead code)

### Checklist

```
[ ] pnpm build completa sem erros
[ ] pnpm tsc --noEmit sem erros
[ ] Zero warnings de ESLint
[ ] Remover imports não utilizados
[ ] Remover componentes/arquivos órfãos
[ ] Remover console.log/console.error em produção
[ ] Verificar strict mode no tsconfig.json
```

### Ações

1. **Garantir strict mode no `tsconfig.json`:**
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noFallthroughCasesInSwitch": true,
       "forceConsistentCasingInFileNames": true,
       "exactOptionalPropertyTypes": false
     }
   }
   ```

2. **Limpar dead code:**
   ```bash
   # Encontrar exports não utilizados
   npx ts-prune --error
   # Encontrar arquivos sem importação
   npx unimported
   # Remover console statements
   grep -rn "console\." --include="*.ts" --include="*.tsx" app/ components/ lib/ context/
   ```

3. **Adicionar script de lint rigoroso ao `package.json`:**
   ```json
   {
     "scripts": {
       "lint": "next lint",
       "lint:strict": "next lint --max-warnings 0",
       "typecheck": "tsc --noEmit",
       "check": "pnpm typecheck && pnpm lint:strict && pnpm build"
     }
   }
   ```

4. **Rodar e corrigir:**
   ```bash
   pnpm typecheck  # corrigir todos os erros
   pnpm lint:strict  # corrigir todos os warnings
   pnpm build  # garantir build limpa
   ```

**Commit:** `chore: zero TypeScript errors, remove dead code, strict mode`

---

## Bloco 3 — Remover pasta `old/` (legado)

### Checklist

```
[ ] Verificar se há algo reutilizável em old/
[ ] Extrair qualquer conteúdo/texto/copy útil antes de deletar
[ ] Remover old/ completamente
[ ] Verificar se nenhum import referencia old/
```

### Ações

1. **Inspecionar e extrair:**
   ```bash
   # Listar conteúdo
   find old/ -type f | head -50
   # Procurar referências
   grep -rn "old/" --include="*.ts" --include="*.tsx" app/ components/ lib/
   ```

2. **Extrair conteúdo reutilizável** (se houver textos, copies, dados de projetos) para `lib/data/` ou `lib/content/`.

3. **Deletar:**
   ```bash
   rm -rf old/
   ```

4. **Atualizar qualquer referência residual.**

**Commit:** `chore: remove legacy old/ directory`

---

## Bloco 4 — Performance & SEO (Lighthouse 95+)

### Checklist

```
[ ] Imagens otimizadas (next/image, WebP/AVIF, lazy loading)
[ ] Fonts otimizadas (next/font, display: swap, preload)
[ ] Bundle analysis — sem dependências desnecessárias
[ ] Code splitting funcionando (dynamic imports)
[ ] Metadata básico presente (title, description, viewport)
[ ] Favicon presente e correto
[ ] Sem layout shift (CLS < 0.1)
[ ] LCP < 2.5s
[ ] FID < 100ms
```

### Ações

1. **Otimizar fonts:**
   ```tsx
   // app/layout.tsx
   import { Inter, JetBrains_Mono } from 'next/font/google'
   // ou fontes premium como Satoshi, General Sans via next/font/local
   ```

2. **Analisar bundle:**
   ```bash
   ANALYZE=true pnpm build
   # ou
   npx @next/bundle-analyzer
   ```
   - Remover libs não usadas
   - Verificar se framer-motion faz tree-shaking correto
   - Lazy load componentes pesados (chat IA, etc.)

3. **Otimizar imagens:**
   - Todo `<img>` → `<Image>` do Next.js
   - Formatos modernos (WebP)
   - Sizes e priority corretos
   - Placeholder blur para above-the-fold

4. **Prefetch estratégico:**
   ```tsx
   // Links importantes com prefetch
   <Link href="/projects/blackbelt" prefetch={true}>
   // Links secundários sem prefetch
   <Link href="/blog" prefetch={false}>
   ```

**Commit:** `perf: optimize fonts, images, bundle splitting — target Lighthouse 95+`

---

## Bloco 5 — Acessibilidade (WCAG 2.1 AA)

### Checklist

```
[ ] Landmarks semânticos: <header>, <main>, <nav>, <footer>, <section>
[ ] Todos os interativos com focus visible
[ ] Contraste mínimo 4.5:1 (texto normal), 3:1 (texto grande)
[ ] Alt text em todas as imagens
[ ] Skip to main content link
[ ] aria-labels em ícones sem texto
[ ] Teclado navegável (Tab, Enter, Escape)
[ ] Reduced motion respectado
[ ] Lang attribute no <html>
[ ] Heading hierarchy correta (h1 → h2 → h3, sem pulos)
```

### Ações

1. **Adicionar skip link:**
   ```tsx
   // components/SkipLink.tsx
   export function SkipLink() {
     return (
       <a
         href="#main-content"
         className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                    focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black 
                    focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 
                    focus:ring-blue-500"
       >
         Skip to main content
       </a>
     )
   }
   ```

2. **Respeitar prefers-reduced-motion:**
   ```tsx
   // hooks/useReducedMotion.ts
   import { useEffect, useState } from 'react'

   export function useReducedMotion() {
     const [prefersReduced, setPrefersReduced] = useState(false)
     useEffect(() => {
       const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
       setPrefersReduced(mq.matches)
       const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
       mq.addEventListener('change', handler)
       return () => mq.removeEventListener('change', handler)
     }, [])
     return prefersReduced
   }
   ```

3. **Focus management global:**
   ```css
   /* globals.css */
   *:focus-visible {
     outline: 2px solid var(--color-accent);
     outline-offset: 2px;
   }
   ```

4. **Auditar com ferramentas:**
   ```bash
   npx axe-core-cli https://localhost:3000
   # ou usar Lighthouse accessibility audit
   ```

**Commit:** `a11y: WCAG 2.1 AA compliance — skip link, focus, contrast, semantics`

---

## Resumo da Fase 1

| Bloco | Commit Message | Arquivos Impactados |
|-------|---------------|---------------------|
| 1 | `security: audit secrets, update .gitignore and .env.example` | `.gitignore`, `.env.example`, `next.config.ts` |
| 2 | `chore: zero TypeScript errors, remove dead code, strict mode` | `tsconfig.json`, `package.json`, vários `.ts/.tsx` |
| 3 | `chore: remove legacy old/ directory` | `old/` (deletado) |
| 4 | `perf: optimize fonts, images, bundle splitting` | `app/layout.tsx`, componentes com imagens |
| 5 | `a11y: WCAG 2.1 AA compliance` | `components/`, `app/`, `globals.css` |

**Ao final:** `git push origin main` com tag `v1.0-audit-complete`
