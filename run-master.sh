#!/usr/bin/env bash
# ============================================================================
# run-master.sh — Portfolio World-Class Pipeline
# Gregory G. S. Pinto — AI Solutions Architect
#
# Uso:
#   chmod +x run-master.sh
#   ./run-master.sh              # Roda tudo (Fase 1 → 4)
#   ./run-master.sh --from 2     # Recomeça da Fase 2
#   ./run-master.sh --from 2.4   # Recomeça da Fase 2, Bloco 4
#   ./run-master.sh --dry-run    # Mostra o que seria executado
#
# Pré-requisitos:
#   - Claude Code instalado (claude CLI)
#   - Node.js + pnpm
#   - Git configurado com push access
#   - Estar no diretório raiz do projeto (~/Projetos/portifolio)
# ============================================================================

set -euo pipefail

# ─── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ─── Config ──────────────────────────────────────────────────────────────────
PROJECT_DIR="${PROJECT_DIR:-$(pwd)}"
LOG_DIR="${PROJECT_DIR}/.pipeline-logs"
START_FROM="1"
DRY_RUN=false
MAX_RETRIES=2

# ─── Parse Args ──────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from)
      START_FROM="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    *)
      echo "Unknown argument: $1"
      echo "Usage: ./run-master.sh [--from PHASE.BLOCK] [--dry-run]"
      exit 1
      ;;
  esac
done

# Extract phase and block from START_FROM (e.g., "2.4" → phase=2, block=4)
START_PHASE=$(echo "$START_FROM" | cut -d. -f1)
START_BLOCK=$(echo "$START_FROM" | cut -d. -f2 -s)
START_BLOCK="${START_BLOCK:-1}"

# ─── Utilities ───────────────────────────────────────────────────────────────
timestamp() { date '+%Y-%m-%d %H:%M:%S'; }

log() { echo -e "${CYAN}[$(timestamp)]${NC} $1"; }
log_phase() { echo -e "\n${BOLD}${BLUE}═══════════════════════════════════════════════════${NC}"; echo -e "${BOLD}${BLUE}  FASE $1 — $2${NC}"; echo -e "${BOLD}${BLUE}═══════════════════════════════════════════════════${NC}\n"; }
log_block() { echo -e "\n${YELLOW}  ┌─ Bloco $1: $2${NC}"; }
log_success() { echo -e "${GREEN}  └─ ✓ $1${NC}"; }
log_error() { echo -e "${RED}  └─ ✗ $1${NC}"; }
log_skip() { echo -e "  └─ ⊘ Skipped (--from ${START_FROM})"; }

should_run() {
  local phase=$1 block=$2
  if (( phase > START_PHASE )); then return 0; fi
  if (( phase == START_PHASE && block >= START_BLOCK )); then return 0; fi
  return 1
}

# ─── Claude Code Executor ────────────────────────────────────────────────────
run_claude() {
  local prompt="$1"
  local commit_msg="$2"
  local attempt=0

  if [ "$DRY_RUN" = true ]; then
    echo -e "    ${CYAN}[DRY RUN] Would execute Claude Code with prompt (${#prompt} chars)${NC}"
    echo -e "    ${CYAN}[DRY RUN] Would commit: ${commit_msg}${NC}"
    return 0
  fi

  while (( attempt <= MAX_RETRIES )); do
    attempt=$((attempt + 1))
    log "  Attempt $attempt/$((MAX_RETRIES + 1))..."

    # Run Claude Code
    if claude --dangerously-skip-permissions -p "$prompt" 2>&1 | tee "${LOG_DIR}/latest.log"; then
      # Verify build after changes
      if pnpm build 2>&1 | tee -a "${LOG_DIR}/latest.log"; then
        # Commit
        git add -A
        if ! git diff --cached --quiet; then
          git commit -m "$commit_msg"
          log_success "Committed: $commit_msg"
        else
          log "  No changes to commit"
        fi
        return 0
      else
        log_error "Build failed after Claude Code changes"
        if (( attempt <= MAX_RETRIES )); then
          log "  Auto-correcting build errors..."
          claude --dangerously-skip-permissions -p "The build failed. Read the error output below and fix ALL TypeScript and build errors. Do NOT change the intent of the code — only fix errors.

$(tail -50 "${LOG_DIR}/latest.log")" 2>&1 | tee -a "${LOG_DIR}/latest.log"
        fi
      fi
    else
      log_error "Claude Code execution failed"
    fi
  done

  log_error "FAILED after $MAX_RETRIES retries. Check ${LOG_DIR}/latest.log"
  return 1
}

# ─── Pre-flight Checks ──────────────────────────────────────────────────────
preflight() {
  log "Running pre-flight checks..."

  # Check we're in a git repo
  if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    log_error "Not in a git repository. Run from your project root."
    exit 1
  fi

  # Check node/pnpm
  if ! command -v pnpm &>/dev/null; then
    log_error "pnpm not found. Install with: npm i -g pnpm"
    exit 1
  fi

  # Check claude
  if ! command -v claude &>/dev/null; then
    log_error "Claude Code CLI not found. Install from: https://docs.anthropic.com/en/docs/claude-code"
    exit 1
  fi

  # Create log dir
  mkdir -p "$LOG_DIR"

  # Ensure clean working tree (or stash)
  if ! git diff --quiet || ! git diff --cached --quiet; then
    log "Stashing uncommitted changes..."
    git stash push -m "pipeline-auto-stash-$(date +%s)"
  fi

  log_success "Pre-flight checks passed"
}

# ============================================================================
# FASE 1 — Audit & Cleanup
# ============================================================================
phase_1() {
  log_phase 1 "Audit & Cleanup"

  # ── Bloco 1.1: Security ──
  log_block "1.1" "Security Audit"
  if should_run 1 1; then
    run_claude "You are working on a Next.js portfolio project. Execute the SECURITY AUDIT:

1. Check git history for any leaked secrets: git log --all -p -- '*.env*'
2. Search for hardcoded API keys or tokens in all .ts/.tsx files
3. Update .gitignore to cover: node_modules, .env*, .next, out, build, dist, .DS_Store, .vercel, *.tsbuildinfo, next-env.d.ts, .vscode, .idea
4. Update .env.example with placeholder keys (NEVER real values):
   NEXT_PUBLIC_CHATBOT_ENABLED=false
   OPENAI_API_KEY=your_key_here
   RESEND_API_KEY=your_key_here
   CONTACT_EMAIL=your_email_here
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
5. Verify next.config.ts doesn't expose server secrets to client bundle
6. If any real secrets are found in history, report them (I'll need to rotate them manually)

Work only in the project root. Do not break existing functionality." \
    "security: audit secrets, update .gitignore and .env.example"
  else
    log_skip
  fi

  # ── Bloco 1.2: Build & TypeScript ──
  log_block "1.2" "Build & TypeScript Cleanup"
  if should_run 1 2; then
    run_claude "You are working on a Next.js + TypeScript portfolio project. Execute BUILD & TYPESCRIPT CLEANUP:

1. Enable strict mode in tsconfig.json: strict: true, noUnusedLocals: true, noUnusedParameters: true
2. Run 'pnpm tsc --noEmit' and fix ALL TypeScript errors
3. Remove all unused imports and variables
4. Remove all console.log/console.error statements (replace with proper error handling if needed)
5. Find and remove any dead/unreachable code
6. Add these scripts to package.json:
   \"typecheck\": \"tsc --noEmit\"
   \"lint:strict\": \"next lint --max-warnings 0\"
   \"check\": \"pnpm typecheck && pnpm lint:strict && pnpm build\"
7. Run 'pnpm build' and ensure it passes with zero errors and zero warnings

Fix issues incrementally. The build MUST pass at the end." \
    "chore: zero TypeScript errors, remove dead code, enable strict mode"
  else
    log_skip
  fi

  # ── Bloco 1.3: Remove old/ ──
  log_block "1.3" "Remove Legacy old/ Directory"
  if should_run 1 3; then
    run_claude "You are working on a Next.js portfolio project. Remove the legacy 'old/' directory:

1. First, check if any current file imports from or references 'old/' — fix those references if found
2. Check if old/ contains any useful text content, copy/data that should be preserved in lib/data/
3. If there's useful content, extract it to appropriate locations first
4. Then delete the entire old/ directory: rm -rf old/
5. Verify no broken imports remain: pnpm build must pass" \
    "chore: remove legacy old/ directory"
  else
    log_skip
  fi

  # ── Bloco 1.4: Performance ──
  log_block "1.4" "Performance Optimization"
  if should_run 1 4; then
    run_claude "You are working on a Next.js portfolio project. Execute PERFORMANCE OPTIMIZATIONS:

1. Replace any <img> tags with Next.js <Image> component with proper width/height/alt
2. Ensure next/font is used for all fonts (no external font stylesheets in <head>)
3. Add dynamic imports for heavy components (chat, modals, etc.):
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), { ssr: false })
4. Verify images have proper sizes and priority attributes (priority for above-the-fold)
5. Add image formats config in next.config.ts: images: { formats: ['image/avif', 'image/webp'] }
6. Build must pass and first load JS should be reasonable" \
    "perf: optimize fonts, images, bundle splitting — target Lighthouse 95+"
  else
    log_skip
  fi

  # ── Bloco 1.5: Accessibility ──
  log_block "1.5" "Accessibility (WCAG 2.1 AA)"
  if should_run 1 5; then
    run_claude "You are working on a Next.js portfolio project. Execute ACCESSIBILITY IMPROVEMENTS:

1. Add a SkipLink component that renders an anchor to #main-content, visible only on focus
2. Add id='main-content' to the <main> element
3. Ensure <html> has lang attribute (lang='pt-BR' or dynamic based on context)
4. Verify heading hierarchy: exactly one <h1> per page, no skipped levels
5. Add aria-label to all icon-only buttons and links
6. Ensure all interactive elements have visible focus styles: *:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
7. Add prefers-reduced-motion media query: disable animations when user prefers reduced motion
8. Check color contrast ratios: text on backgrounds must be >= 4.5:1 for normal text
9. Build must pass" \
    "a11y: WCAG 2.1 AA compliance — skip link, focus, contrast, semantics"
  else
    log_skip
  fi

  # ── Push Phase 1 ──
  if [ "$DRY_RUN" = false ]; then
    log "Pushing Phase 1..."
    git push origin main
    git tag -a v1.0-audit-complete -m "Phase 1: Audit & Cleanup complete"
    git push origin v1.0-audit-complete
    log_success "Phase 1 pushed with tag v1.0-audit-complete"
  fi
}

# ============================================================================
# FASE 2 — Redesign Premium
# ============================================================================
phase_2() {
  log_phase 2 "Redesign Premium World-Class"

  # ── Bloco 2.1: Dependencies & Design System ──
  log_block "2.1" "Dependencies & Design System Foundation"
  if should_run 2 1; then
    run_claude "You are redesigning a Next.js portfolio to world-class level. SETUP DESIGN SYSTEM:

1. Install dependencies: pnpm add framer-motion resend @vercel/analytics
2. Download Satoshi font from fontshare.com and place .woff2 files in public/fonts/ (Regular, Medium, Bold, Black weights). If you can't download, use General Sans or Outfit from Google Fonts as alternative via next/font/google
3. Set up the design system:
   - Create lib/design-tokens.ts with dark/light color palettes:
     Dark: bg #0A0A0B, text #FAFAF9, accent #6EE7B7 (emerald-300)
     Light: bg #FAFAF9, text #09090B, accent #059669 (emerald-600)
   - Update globals.css with CSS variables, noise texture overlay (use a CSS gradient pattern if no image available), ::selection styling
   - Update tailwind.config.ts with custom fonts, animations (fadeIn, slideUp, reveal, glowPulse), and design tokens
4. Configure fonts in app/layout.tsx using next/font
5. Create a small noise texture PNG (or use CSS grain effect) in public/textures/
6. Build must pass" \
    "feat(design): design system foundation — colors, typography, tokens, animations"
  else
    log_skip
  fi

  # ── Bloco 2.2: Navbar & Layout ──
  log_block "2.2" "Navbar & Global Layout"
  if should_run 2 2; then
    run_claude "You are redesigning a Next.js portfolio. BUILD THE NAVBAR & GLOBAL LAYOUT:

Reference the existing code structure — enhance, don't start from scratch.

1. Create/update components/layout/Navbar.tsx:
   - Logo 'GG' monogram on left with accent color hover glow
   - Nav links: Home, Projects, About, Blog, Contact (smooth scroll to sections)
   - Right side: Language toggle (PT|EN pill), Theme toggle (sun/moon icon with framer-motion morphing)
   - Scroll behavior: transparent bg at top → backdrop-blur + bg-black/80 + border-bottom after 80px scroll
   - Active section detection using IntersectionObserver
   - Mobile: hamburger menu → slide-in panel with backdrop blur

2. Create components/layout/ScrollProgress.tsx: thin 2px bar at absolute top, accent color, width = scroll%

3. Create/update components/layout/Footer.tsx: 'Built with Next.js, TypeScript & ♥', copyright, source code link

4. Create components/layout/SkipLink.tsx (from Phase 1 spec)

5. Update app/layout.tsx to include Navbar, Footer, ScrollProgress

6. Style: use the design tokens from lib/design-tokens.ts. Dark-first aesthetic. Font: Satoshi (or your configured alternative). Premium feel — NOT generic.

7. Build must pass. All components must be properly typed with TypeScript." \
    "feat(layout): premium navbar with scroll behavior, theme/lang toggle, footer"
  else
    log_skip
  fi

  # ── Bloco 2.3: Bilingual & Theme Context ──
  log_block "2.3" "i18n & Theme Context"
  if should_run 2 3; then
    run_claude "You are redesigning a Next.js portfolio. SET UP BILINGUAL (PT-BR/EN) & THEME SYSTEM:

1. Create/update context/ThemeContext.tsx:
   - Dark/light mode with localStorage persistence
   - Respect prefers-color-scheme as default
   - Apply 'dark' class to <html> element
   - Anti-flash: add inline script in layout.tsx <head> to set theme before render

2. Create/update context/LangContext.tsx:
   - PT-BR and EN support with localStorage persistence
   - Detect navigator.language as default (pt → pt-BR, else → en)
   - Hook: useLang() returns { t, lang, toggleLang }

3. Create lib/data/i18n.ts with ALL UI text in both languages:
   - nav: home, projects, about, blog, contact
   - hero: title ('Gregory G. S. Pinto'), subtitle, roles for typewriter, cta buttons
   - about: bio text, section title, metric labels
   - projects: section title, filter labels, 'view project', 'view source'
   - skills: section title, category names
   - experience: section title, each entry
   - contact: section title, form labels, social labels
   - footer: built with, copyright

4. Update all existing components to use t() function from useLang()

5. Build must pass" \
    "feat(i18n): bilingual PT-BR/EN with theme context, localStorage persistence"
  else
    log_skip
  fi

  # ── Bloco 2.4: Hero Section ──
  log_block "2.4" "Hero Section (Cinematic)"
  if should_run 2 4; then
    run_claude "You are redesigning a Next.js portfolio. BUILD A CINEMATIC HERO SECTION:

1. Create components/hero/Hero.tsx — the main hero wrapper:
   - Full viewport height (min-h-screen)
   - Staggered animation sequence using framer-motion

2. Create components/hero/GradientMesh.tsx:
   - Animated gradient background with 3-4 color blobs (emerald/teal/subtle blue)
   - Use CSS animations (not canvas) for performance
   - Respect prefers-reduced-motion: static gradient fallback

3. Create components/hero/Typewriter.tsx:
   - Cycles through roles: 'Solution Architect', 'AI Specialist', 'UX Engineer', 'System Designer'
   - Typing effect: 80ms/char type, 40ms/char delete, 2000ms pause between
   - Blinking cursor (530ms interval)
   - Use i18n: different roles for PT and EN

4. Hero layout (centered, responsive):
   - Small label: 'AI Solutions Architect' (monospace, accent color)
   - Name: 'Gregory G. S. Pinto' (huge, bold, clip-path reveal animation from bottom with blur→clear)
   - Typewriter line below name
   - Two CTA buttons: 'View My Work' (filled, accent) + 'Download CV' (ghost/outline)
   - Scroll indicator at bottom: 'SCROLL' with animated chevron

5. Animation timeline (framer-motion variants with staggerChildren):
   t=0.0: bg fade in
   t=0.3: name reveal (translateY 40→0, blur 10→0)
   t=0.6: subtitle slide up
   t=0.9: typewriter starts
   t=1.2: CTAs fade in
   t=1.8: scroll indicator pulses

6. Mobile responsive: stack vertical, reduce font sizes, simpler gradient

7. Build must pass. Use design tokens. Premium aesthetic." \
    "feat(hero): cinematic hero with gradient mesh, typewriter, staggered reveal"
  else
    log_skip
  fi

  # ── Bloco 2.5: About Section ──
  log_block "2.5" "About Section"
  if should_run 2 5; then
    run_claude "You are redesigning a Next.js portfolio. BUILD THE ABOUT SECTION:

1. Create components/about/About.tsx:
   - Section header: '01 — About' style (monospace number + label)
   - Two-column layout: photo left, bio right (stack on mobile)

2. Create components/about/PhotoFrame.tsx:
   - Placeholder: gradient circle with initials 'GG' in the center
   - Dashed accent border with subtle rotation on hover
   - Future: real photo with grayscale → color on hover

3. Create components/about/AnimatedCounter.tsx:
   - Animates from 0 to target number when scrolling into view
   - Uses framer-motion useMotionValue + useTransform + animate
   - Trigger: IntersectionObserver (once)
   - Duration: 2s, easeOut
   - Display: large mono font, accent color number, small label below

4. Create components/about/TechBadge.tsx:
   - Small badge with SVG icon + tech name
   - Hover: scale(1.05), bg accent/10, icon color change
   - Grid: 5 cols desktop, 3 cols mobile

5. About section content:
   - Bio text (from i18n): 2-3 paragraphs about Gregory's approach
   - 4 metric counters: '5+' (Years), '3' (Enterprise Projects), '900+' (Tests Passing), '95+' (Lighthouse)
   - Tech badges grid: React, Next.js, TypeScript, Node.js, Supabase, Python, TailwindCSS, Docker, Azure, Vercel, DDD, Event Sourcing, CQRS, AI/ML, Figma

6. Scroll reveal animation (framer-motion whileInView)

7. Build must pass" \
    "feat(about): bio section with animated counters, tech badges, photo placeholder"
  else
    log_skip
  fi

  # ── Bloco 2.6: Projects Section ──
  log_block "2.6" "Projects Section (Critical)"
  if should_run 2 6; then
    run_claude "You are redesigning a Next.js portfolio. BUILD THE PROJECTS SECTION — this is the MOST IMPORTANT section:

1. Create lib/data/projects.ts with data for 3 projects:

   EFVM 360:
   - title: 'EFVM 360' / subtitle: 'Enterprise Railway Operations Platform'
   - description: Digital management platform for heavy-cargo railway operations
   - metrics: [{value:'451',label:'Tests'},{value:'15',label:'Modules'},{value:'19',label:'API Endpoints'},{value:'5',label:'DDD Aggregates'}]
   - stack: ['React 18','TypeScript','Vite','Express','MySQL','Azure','Docker','ECharts','DDD','Event Sourcing']
   - links: {live:'https://efvm360.vercel.app',github:'https://github.com/GregoryGSPinto/efvm360'}
   - featured: true, category: 'enterprise'

   BlackBelt OS:
   - title: 'BlackBelt OS' / subtitle: 'Martial Arts Academy SaaS'
   - description: Operating system for martial arts academies with AI/ML
   - metrics: [{value:'473',label:'Tests'},{value:'8',label:'ML Engines'},{value:'109',label:'Pages'},{value:'7',label:'Bounded Contexts'}]
   - stack: ['Next.js 14','Supabase','TypeScript','Event Sourcing','DDD','AI/ML','TailwindCSS']
   - links: {live:'https://blackbelt-five.vercel.app',github:'https://github.com/GregoryGSPinto/blackbelt'}
   - featured: true, category: 'enterprise'

   Portfolio:
   - title: 'Portfolio' / subtitle: 'This website'
   - metrics: [{value:'95+',label:'Lighthouse'}]
   - featured: false, category: 'frontend'

   Include bilingual content (en/pt) for titles, subtitles, descriptions.

2. Create hooks/useTilt.ts:
   - Returns ref + event handlers for 3D tilt effect
   - Calculates rotateX/Y from mouse position relative to element center
   - Max rotation: 8deg, smooth transition 150ms
   - Reset to (0,0) on mouse leave with spring
   - Disabled when prefers-reduced-motion

3. Create components/projects/ProjectCard.tsx:
   - Uses useTilt for 3D effect
   - Shows: screenshot placeholder (gradient), tech badges, key metrics, live+github links
   - Hover: shine overlay (radial gradient following cursor), border glow, image zoom
   - Featured cards are larger (span 2 cols on desktop)
   - Links to detail page: /projects/[slug]

4. Create components/projects/FilterTabs.tsx:
   - Tabs: All, Enterprise, AI/ML, Frontend
   - Animated indicator sliding between tabs (framer-motion layoutId)
   - Filters project list with AnimatePresence

5. Create components/projects/Projects.tsx:
   - Section header
   - FilterTabs
   - Grid of ProjectCards with stagger animation

6. Create app/projects/[slug]/page.tsx:
   - Full project detail page with: hero image, title, subtitle, links
   - Sections: Challenge → Approach → Architecture → Results → Technical Decisions → Stack
   - Back button to home
   - Animated metric counters
   - Technical decisions as expandable accordion cards
   - generateStaticParams for all project slugs
   - Dynamic metadata

7. Build must pass. This must look PREMIUM — it's the centerpiece." \
    "feat(projects): 3D tilt cards, project detail pages, data layer, filter tabs"
  else
    log_skip
  fi

  # ── Bloco 2.7: Skills Section ──
  log_block "2.7" "Skills Section"
  if should_run 2 7; then
    run_claude "You are redesigning a Next.js portfolio. BUILD THE SKILLS SECTION:

1. Create lib/data/skills.ts with categories:
   - Frontend (95%): React, Next.js, TypeScript, TailwindCSS, Framer Motion
   - Backend (85%): Node.js, Express, Supabase, MySQL, PostgreSQL
   - Architecture (90%): DDD, CQRS, Event Sourcing, Clean Architecture, Microservices
   - AI & ML (75%): LLMs, RAG, ML Pipelines, Prompt Engineering, Claude/OpenAI API
   - DevOps (70%): Docker, Azure, Vercel, GitHub Actions, CI/CD
   - UX/Design (80%): Figma, Design Systems, Accessibility, Responsive Design

2. Create components/skills/SkillBar.tsx:
   - Horizontal bar with animated fill (0% → value%) on scroll into view
   - Label left, percentage right
   - Sub-labels: list of specific technologies
   - Staggered animation: 100ms delay between bars
   - Fill color: accent gradient

3. Create components/skills/Skills.tsx:
   - Section header: 'Tech Radar' or 'Arsenal Tecnológico'
   - Layout: skill bars stacked vertically with category headers
   - Responsive and clean

4. Use framer-motion for all animations with whileInView trigger
5. Build must pass" \
    "feat(skills): animated skill bars with scroll reveal, categorized layout"
  else
    log_skip
  fi

  # ── Bloco 2.8: Experience & Contact ──
  log_block "2.8" "Experience Timeline & Contact"
  if should_run 2 8; then
    run_claude "You are redesigning a Next.js portfolio. BUILD EXPERIENCE TIMELINE & CONTACT SECTIONS:

EXPERIENCE TIMELINE:

1. Create lib/data/experience.ts with entries (bilingual):
   - 2025: AI Solutions Architect / Freelance / Consulting
   - 2024: Full Stack Developer / Independent Projects
   - 2023: Frontend Developer / Studies & Projects

2. Create components/experience/Timeline.tsx:
   - Vertical line with dots at each milestone
   - Each entry animates in on scroll (framer-motion, alternating left/right on desktop)
   - Active dot pulses when entry is in viewport
   - Tech tags at bottom of each entry
   - Mobile: all entries on one side

3. Create components/experience/TimelineEntry.tsx:
   - Year, title, company, period, description, tags
   - Responsive styling

CONTACT SECTION:

4. Create components/contact/ContactForm.tsx:
   - Fields: name, email, subject, message
   - Validation with inline error messages
   - Submit handler: POST to /api/contact
   - States: idle → loading (spinner) → success (checkmark) → error (retry)
   - Styled with design tokens (dark inputs, accent focus ring)

5. Create app/api/contact/route.ts:
   - Receive form data, validate with basic checks
   - Send email via Resend (import { Resend } from 'resend')
   - If RESEND_API_KEY not set, log to console instead (dev fallback)
   - Return JSON response with success/error

6. Create components/contact/SocialLinks.tsx:
   - Email: gregoryguimaraes12@outlook.com (with copy-to-clipboard)
   - GitHub: github.com/GregoryGSPinto
   - LinkedIn: linkedin.com/in/mqt-gregory
   - Phone: +55 31 99679-3625
   - Each with icon and hover underline effect

7. Build must pass" \
    "feat(experience-contact): animated timeline, functional contact form, social links"
  else
    log_skip
  fi

  # ── Bloco 2.9: Assembly & Polish ──
  log_block "2.9" "Final Assembly & Polish"
  if should_run 2 9; then
    run_claude "You are finalizing a Next.js portfolio redesign. ASSEMBLE ALL SECTIONS & POLISH:

1. Update app/page.tsx to compose all sections in order:
   - Hero (full viewport)
   - About
   - Projects
   - Skills
   - Experience
   - Contact
   Each section wrapped with consistent padding and max-width.
   Section IDs for smooth scroll navigation: #hero, #about, #projects, #skills, #experience, #contact

2. Add framer-motion page transitions:
   - Each section uses whileInView with staggered children
   - Smooth section-to-section flow

3. Create components/layout/Preloader.tsx:
   - Logo 'GG' SVG path animation (draw on)
   - Duration: ~2 seconds
   - After: content slides up
   - Only on first visit (sessionStorage check)
   - Disabled for reduced-motion

4. Add SectionHeader component for consistent '01 — About' style numbering

5. Verify ALL sections render correctly on:
   - Desktop (1200px+)
   - Tablet (768px)
   - Mobile (375px)

6. Run pnpm build — must pass with zero errors
7. Visually review each section in dev mode and fix any layout issues

This is the final polish pass. Everything must feel cohesive and premium." \
    "feat(global): assemble all sections, preloader, page transitions, responsive polish"
  else
    log_skip
  fi

  # ── Push Phase 2 ──
  if [ "$DRY_RUN" = false ]; then
    log "Pushing Phase 2..."
    git push origin main
    git tag -a v2.0-redesign-complete -m "Phase 2: Redesign Premium complete"
    git push origin v2.0-redesign-complete
    log_success "Phase 2 pushed with tag v2.0-redesign-complete"
  fi
}

# ============================================================================
# FASE 3 — SEO + Performance + Analytics
# ============================================================================
phase_3() {
  log_phase 3 "SEO + Performance + Analytics"

  # ── Bloco 3.1: Metadata & OG ──
  log_block "3.1" "Dynamic Metadata & Open Graph"
  if should_run 3 1; then
    run_claude "You are optimizing a Next.js portfolio for SEO. ADD METADATA & OPEN GRAPH:

1. Update app/layout.tsx with comprehensive Metadata export:
   - title: { default: 'Gregory Pinto — AI Solutions Architect', template: '%s | Gregory Pinto' }
   - description about solution architecture, DDD, AI/ML
   - keywords array
   - openGraph: type website, locale en_US, alternateLocale pt_BR, image /og-image.png (1200x630)
   - twitter: card summary_large_image
   - robots: index true, follow true

2. Add dynamic metadata to app/projects/[slug]/page.tsx using generateMetadata

3. Create app/api/og/route.tsx using @vercel/og (ImageResponse) for dynamic OG images:
   - Dark background (#0A0A0B), 'GG' logo, title, subtitle, 'gregorypinto.dev'
   - Accepts ?title and ?subtitle query params
   - Runtime: edge

4. Build must pass" \
    "seo: dynamic metadata, OG image generation, twitter cards"
  else
    log_skip
  fi

  # ── Bloco 3.2: Structured Data & Sitemap ──
  log_block "3.2" "JSON-LD, Sitemap, robots.txt"
  if should_run 3 2; then
    run_claude "You are optimizing a Next.js portfolio for SEO. ADD STRUCTURED DATA:

1. Create components/seo/JsonLd.tsx with:
   - PersonJsonLd: schema.org Person with name, jobTitle, sameAs (github, linkedin), knowsAbout
   - WebsiteJsonLd: schema.org WebSite
   - Render as <script type='application/ld+json'>

2. Add JsonLd components to app/layout.tsx

3. Create app/sitemap.ts (Next.js MetadataRoute.Sitemap):
   - Home page (priority 1)
   - Each project page (priority 0.8)
   - Blog pages if they exist

4. Create app/robots.ts:
   - Allow: /
   - Disallow: /api/, /_next/
   - Sitemap URL

5. Build must pass" \
    "seo: JSON-LD structured data (Person, Website), sitemap.xml, robots.txt"
  else
    log_skip
  fi

  # ── Bloco 3.3: Analytics & Final Performance ──
  log_block "3.3" "Analytics & Performance"
  if should_run 3 3; then
    run_claude "You are optimizing a Next.js portfolio for performance. ADD ANALYTICS & FINAL OPTIMIZATIONS:

1. Add Vercel Analytics to app/layout.tsx:
   import { Analytics } from '@vercel/analytics/react'
   import { SpeedInsights } from '@vercel/speed-insights/next'
   Render both after {children}

2. Add performance headers in next.config.ts:
   - Cache fonts for 1 year (immutable)
   - Cache images for 1 day with stale-while-revalidate
   - Enable image optimization: formats ['image/avif', 'image/webp']

3. Verify:
   - All images use next/image
   - All fonts use next/font
   - Heavy components use dynamic import
   - No unnecessary large dependencies in bundle

4. Build must pass with clean output" \
    "perf: Vercel Analytics, SpeedInsights, performance headers, final optimization"
  else
    log_skip
  fi

  # ── Push Phase 3 ──
  if [ "$DRY_RUN" = false ]; then
    log "Pushing Phase 3..."
    git push origin main
    git tag -a v3.0-seo-perf-complete -m "Phase 3: SEO + Performance complete"
    git push origin v3.0-seo-perf-complete
    log_success "Phase 3 pushed with tag v3.0-seo-perf-complete"
  fi
}

# ============================================================================
# FASE 4 — Blog (Opcional)
# ============================================================================
phase_4() {
  log_phase 4 "Blog com MDX"

  # ── Bloco 4.1: Blog Infrastructure ──
  log_block "4.1" "MDX Blog Infrastructure"
  if should_run 4 1; then
    run_claude "You are adding an MDX blog to a Next.js portfolio. SET UP BLOG INFRASTRUCTURE:

1. Install: pnpm add @next/mdx @mdx-js/loader @mdx-js/react gray-matter reading-time rehype-pretty-code rehype-slug remark-gfm

2. Update next.config.ts to support MDX with rehype/remark plugins

3. Create content/blog/ directory

4. Create lib/blog.ts with:
   - getAllPosts(lang): reads MDX files, parses frontmatter, returns sorted array
   - getPostBySlug(slug): reads single post
   - BlogPost interface: slug, title, description, date, tags, readingTime, project, content

5. Create app/blog/page.tsx:
   - Lists all published posts
   - Tag filter tabs
   - Each post shows: title, date, reading time, tags, related project link

6. Create app/blog/[slug]/page.tsx:
   - Renders MDX content with custom components
   - Table of contents sidebar (desktop)
   - Previous/Next post navigation
   - generateStaticParams + generateMetadata

7. Create components/blog/MDXComponents.tsx with styled overrides for h1-h3, p, a, code, blockquote

8. Create one sample post: content/blog/hello-world.mdx with proper frontmatter

9. Build must pass" \
    "feat(blog): MDX infrastructure, blog index, post pages, custom components"
  else
    log_skip
  fi

  # ── Bloco 4.2: Content & RSS ──
  log_block "4.2" "Blog Content & RSS"
  if should_run 4 2; then
    run_claude "You are adding content to an MDX blog in a Next.js portfolio. CREATE INITIAL POSTS & RSS:

1. Create 4 blog post files in content/blog/:

   a) ddd-frontend-real-world.mdx:
      title: 'DDD in the Frontend: A Real-World Approach with React'
      tags: [ddd, react, architecture, event-sourcing]
      project: efvm360
      Write ~300 words about applying DDD in frontend with real examples from EFVM 360

   b) event-sourcing-railway-ops.mdx:
      title: 'Event Sourcing for Safety-Critical Railway Operations'
      tags: [event-sourcing, architecture, safety]
      project: efvm360
      Write ~300 words about why Event Sourcing with SHA-256 hash chains was chosen

   c) building-ai-assistant-adambot.mdx:
      title: 'Building an AI Assistant with Voice, Memory and 10 Modules'
      tags: [ai, chatbot, voice, architecture]
      project: efvm360
      Write ~300 words about AdamBot architecture decisions

   d) ml-engines-martial-arts.mdx:
      title: '8 ML Engines for a Martial Arts SaaS'
      tags: [machine-learning, ai, saas]
      project: blackbelt
      Write ~300 words about the ML engines in BlackBelt OS

   Each post must have bilingual frontmatter (en/pt titles and descriptions).

2. Create app/feed.xml/route.ts: RSS feed endpoint generating valid RSS 2.0 XML

3. Add blog teaser to home page: show 3 most recent posts in a compact card format in the existing 'Insights' section

4. Build must pass" \
    "feat(blog): 4 initial posts, RSS feed, blog teaser on home"
  else
    log_skip
  fi

  # ── Push Phase 4 ──
  if [ "$DRY_RUN" = false ]; then
    log "Pushing Phase 4..."
    git push origin main
    git tag -a v4.0-blog-complete -m "Phase 4: Blog complete"
    git push origin v4.0-blog-complete
    log_success "Phase 4 pushed with tag v4.0-blog-complete"
  fi
}

# ============================================================================
# MAIN
# ============================================================================
main() {
  echo -e "${BOLD}"
  echo "  ╔══════════════════════════════════════════════╗"
  echo "  ║  Portfolio World-Class Pipeline               ║"
  echo "  ║  Gregory G. S. Pinto                         ║"
  echo "  ║  Starting from: Phase ${START_PHASE}, Block ${START_BLOCK}          ║"
  echo "  ╚══════════════════════════════════════════════╝"
  echo -e "${NC}"

  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}  ⚠ DRY RUN MODE — no changes will be made${NC}\n"
  fi

  preflight

  (( START_PHASE <= 1 )) && phase_1
  (( START_PHASE <= 2 )) && phase_2
  (( START_PHASE <= 3 )) && phase_3
  (( START_PHASE <= 4 )) && phase_4

  echo ""
  log_phase "✓" "Pipeline Complete!"
  echo -e "  ${GREEN}All phases executed successfully.${NC}"
  echo -e "  ${GREEN}Check your deploy at: https://portifolio-pearl.vercel.app${NC}"
  echo ""
}

main
