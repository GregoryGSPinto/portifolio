'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { translations } from '@/lib/translations';
import { useScrollPosition, useActiveSection } from '@/lib/hooks';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function SunIcon() {
  return (
    <motion.svg
      key="sun"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ rotate: -90, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      exit={{ rotate: 90, scale: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </motion.svg>
  );
}

function MoonIcon() {
  return (
    <motion.svg
      key="moon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ rotate: 90, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      exit={{ rotate: -90, scale: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </motion.svg>
  );
}

function SystemIcon() {
  return (
    <motion.svg
      key="system"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" opacity="0.4" />
    </motion.svg>
  );
}

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const { preference, cycleTheme } = useTheme();
  const t = translations[language];
  const scrollY = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(t.navbar.ids);

  const scrolled = scrollY > 80;

  const handleNavClick = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const themeLabel = preference === 'light'
    ? (language === 'pt' ? 'Tema claro' : 'Light theme')
    : preference === 'dark'
      ? (language === 'pt' ? 'Tema escuro' : 'Dark theme')
      : (language === 'pt' ? 'Tema do sistema' : 'System theme');

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--border-subtle)'
            : '1px solid transparent',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="font-display text-xl font-bold tracking-wide relative group"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-accent">
              GG
            </span>
            <span
              className="absolute inset-0 -m-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
              style={{ background: 'var(--accent-glow)' }}
              aria-hidden="true"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {t.navbar.items.map((item, i) => {
              const id = t.navbar.ids[i];
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="font-mono text-[11px] uppercase tracking-[2px] transition-colors duration-300 relative"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--accent-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {item}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px]"
                      style={{ background: 'var(--accent)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle — PT|EN pill */}
            <div
              className="flex items-center rounded-full border overflow-hidden"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <button
                onClick={() => { if (language !== 'pt') toggleLanguage(); }}
                className="font-mono text-[10px] uppercase tracking-[1.5px] px-2.5 py-1 transition-all duration-300"
                style={{
                  color: language === 'pt' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  background: language === 'pt' ? 'var(--accent)' : 'transparent',
                }}
                aria-label="Mudar para Português"
              >
                PT
              </button>
              <button
                onClick={() => { if (language !== 'en') toggleLanguage(); }}
                className="font-mono text-[10px] uppercase tracking-[1.5px] px-2.5 py-1 transition-all duration-300"
                style={{
                  color: language === 'en' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  background: language === 'en' ? 'var(--accent)' : 'transparent',
                }}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Theme Toggle — sun/moon morph */}
            <button
              onClick={cycleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:border-accent-hover"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent)',
              }}
              aria-label={themeLabel}
            >
              <AnimatePresence mode="wait" initial={false}>
                {preference === 'light' ? (
                  <SunIcon />
                ) : preference === 'dark' ? (
                  <MoonIcon />
                ) : (
                  <SystemIcon />
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 ml-1"
              style={{ gap: 5 }}
              aria-label={menuOpen
                ? (language === 'pt' ? 'Fechar menu' : 'Close menu')
                : (language === 'pt' ? 'Abrir menu' : 'Open menu')}
              aria-expanded={menuOpen}
            >
              <span
                className="block transition-all duration-300"
                style={{
                  width: 20,
                  height: 1.5,
                  backgroundColor: 'var(--text-primary)',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block transition-all duration-300"
                style={{
                  width: 20,
                  height: 1.5,
                  backgroundColor: 'var(--text-primary)',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block transition-all duration-300"
                style={{
                  width: 20,
                  height: 1.5,
                  backgroundColor: 'var(--text-primary)',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[min(80vw,320px)] flex flex-col"
              style={{
                background: 'var(--bg-primary)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderLeft: '1px solid var(--border-subtle)',
              }}
              role="dialog"
              aria-modal="true"
              aria-label={language === 'pt' ? 'Menu de navegação' : 'Navigation menu'}
            >
              <div className="flex flex-col justify-center flex-1 px-8" style={{ gap: 36 }}>
                {t.navbar.items.map((item, i) => {
                  const id = t.navbar.ids[i];
                  const isActive = activeSection === id;
                  return (
                    <motion.button
                      key={id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease }}
                      onClick={() => handleNavClick(id)}
                      className="font-mono text-base uppercase text-left transition-colors duration-300"
                      style={{
                        letterSpacing: '3px',
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                      }}
                    >
                      {item}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
