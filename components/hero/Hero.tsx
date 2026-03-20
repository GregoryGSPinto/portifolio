'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import GradientMesh from './GradientMesh';
import Typewriter from './Typewriter';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0 },
  },
};

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  },
});

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  },
});

function handleScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const { t, lang } = useLang();
  const firstName = 'Gregory';
  const lastName = 'Guimaraes';
  const proofItems =
    lang === 'pt'
      ? [
          { value: '2', label: 'projetos com decisao tecnica documentada' },
          { value: '100+', label: 'testes automatizados' },
          { value: '8+', label: 'anos em operacoes criticas e ambientes complexos' },
        ]
      : [
          { value: '2', label: 'projects with documented technical decisions' },
          { value: '100+', label: 'automated tests' },
          { value: '8+', label: 'years in critical operations and complex environments' },
        ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <GradientMesh />
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, var(--gradient-bottom), transparent)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-12 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="max-w-4xl">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] sm:text-[11px] tracking-[2.5px] uppercase mb-6"
              style={{
                color: 'var(--accent)',
                borderColor: 'var(--tag-border)',
                background: 'var(--tag-bg)',
              }}
              variants={fadeIn(0.2)}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              {lang === 'pt' ? 'Arquitetura, produto e execucao final' : 'Architecture, product, and final execution'}
            </motion.span>

            <motion.p
              className="font-mono text-[11px] uppercase tracking-[2px] mb-4"
              style={{ color: 'var(--text-tertiary)' }}
              variants={fadeIn(0.25)}
            >
              {t.hero.preTitle}
            </motion.p>

            <motion.div
              className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end"
              variants={fadeIn(0.28)}
            >
              <div
                className="flex h-[72px] w-[72px] items-center justify-center rounded-[22px] border"
                style={{
                  borderColor: 'var(--border-hover)',
                  background:
                    'linear-gradient(145deg, var(--tag-bg), rgba(255, 255, 255, 0.02))',
                  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.16)',
                }}
              >
                <span
                  className="font-display text-2xl tracking-[0.18em]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  GG
                </span>
              </div>

              <div className="space-y-2">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.42em]"
                  style={{ color: 'var(--accent)' }}
                >
                  {lang === 'pt' ? 'Assinatura' : 'Signature'}
                </p>
                <div className="leading-none">
                  <div
                    className="font-display text-[28px] sm:text-[34px] tracking-[-0.04em]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {firstName}
                  </div>
                  <div
                    className="font-display text-[38px] sm:text-[54px] tracking-[-0.06em]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {lastName}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="font-display font-light leading-[0.95] mb-6 text-left"
              style={{
                fontSize: 'clamp(42px, 9vw, 102px)',
                letterSpacing: '-2.8px',
                color: 'var(--text-primary)',
              }}
              variants={fadeUp(0.3)}
            >
              {lang === 'pt'
                ? 'Software claro para operacoes complexas.'
                : 'Clear software for complex operations.'}
            </motion.h1>

            <motion.p
              className="font-body text-[16px] md:text-xl max-w-[760px] mb-5 leading-relaxed text-left"
              style={{ color: 'var(--text-secondary)' }}
              variants={fadeUp(0.45)}
            >
              {lang === 'pt'
                ? 'Atuo na fronteira entre produto, arquitetura e implementacao. Meu diferencial esta em traduzir ambientes criticos, regras de negocio densas e operacao real em plataformas com decisao tecnica clara.'
                : 'I work at the intersection of product, architecture, and implementation. My edge is translating critical environments, dense business rules, and real operations into platforms with clear technical decisions.'}
            </motion.p>

            <motion.div className="h-8 mb-8 text-left" variants={fadeIn(0.65)}>
              <Typewriter key={lang} />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10"
              variants={fadeIn(0.8)}
            >
              <button
                type="button"
                onClick={() => handleScrollTo('projects')}
                className="font-mono text-[12px] uppercase tracking-[2px] px-7 py-3.5 transition-all duration-300 hover:brightness-110 cursor-pointer"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--bg-primary)',
                  borderRadius: '999px',
                }}
              >
                {lang === 'pt' ? 'Ver estudos de caso' : 'View case studies'}
              </button>
              <a
                href="/cv/gregory-guimaraes-cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] uppercase tracking-[2px] px-7 py-3.5 transition-all duration-300 hover:brightness-125 cursor-pointer text-center"
                style={{
                  border: '1px solid var(--border-hover)',
                  color: 'var(--accent)',
                  borderRadius: '999px',
                  background: 'transparent',
                }}
              >
                {t.hero.cta2}
              </a>
              <Link
                href="/blog"
                className="font-mono text-[12px] uppercase tracking-[2px] px-7 py-3.5 text-center rounded-full transition-colors"
                style={{
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {lang === 'pt' ? 'Ler arquitetura' : 'Read architecture notes'}
              </Link>
            </motion.div>

            <motion.div variants={fadeIn(1)} className="grid gap-3 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border p-4"
                  style={{ borderColor: 'var(--border-subtle)', background: 'var(--card-bg)' }}
                >
                  <div className="font-mono text-2xl mb-2" style={{ color: 'var(--accent)' }}>
                    {item.value}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.aside
            variants={fadeIn(1)}
            className="rounded-[28px] border p-6 md:p-7"
            style={{
              borderColor: 'var(--border-subtle)',
              background: 'linear-gradient(180deg, var(--card-bg), transparent)',
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[2px] mb-4" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'pt' ? 'Posicionamento' : 'Positioning'}
            </p>
            <div className="space-y-5">
              <div>
                <p className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>
                  {lang === 'pt' ? 'Foco principal' : 'Primary focus'}
                </p>
                <p className="text-base" style={{ color: 'var(--text-primary)' }}>
                  {lang === 'pt' ? 'Arquitetura orientada a produto e operacao' : 'Product- and operations-oriented architecture'}
                </p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>
                  {lang === 'pt' ? 'Stack recorrente' : 'Recurring stack'}
                </p>
                <p className="text-base" style={{ color: 'var(--text-primary)' }}>
                  TypeScript, React/Next.js, Node.js, DDD, AI integration
                </p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>
                  {lang === 'pt' ? 'Onde agrego mais valor' : 'Where I add the most value'}
                </p>
                <p className="text-base" style={{ color: 'var(--text-primary)' }}>
                  {lang === 'pt'
                    ? 'Dominios complexos, reposicionamento de produto e lideranca tecnica pratica'
                    : 'Complex domains, product repositioning, and hands-on technical leadership'}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span
          className="font-mono text-[10px] tracking-[3px] uppercase"
          style={{ color: 'var(--text-ghost)' }}
        >
          {t.hero.scroll}
        </span>
        <motion.svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="hero-scroll-chevron"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="var(--text-ghost)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 9L8 16L15 9"
            stroke="var(--text-ghost)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
