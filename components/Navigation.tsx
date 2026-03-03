'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { translations } from '@/lib/translations';
import { useScrollPosition } from '@/lib/hooks';

export default function Navigation() {
  const { language, toggleLanguage } = useLanguage();
  const { preference, cycleTheme } = useTheme();
  const t = translations[language];
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 50;

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const themeIcon = preference === 'light' ? '☀' : preference === 'dark' ? '☾' : '◐';

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="font-display text-lg tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          >
            GG
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {t.nav.items.map((item, i) => (
              <button
                key={item}
                onClick={() => handleNavClick(t.nav.ids[i])}
                className="font-mono text-[11px] uppercase tracking-[2px] transition-colors duration-300 hover:text-accent"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              className="font-mono text-[12px] px-2.5 py-1.5 rounded-sm border transition-all duration-300"
              style={{
                borderColor: 'var(--border-hover)',
                color: 'var(--accent)',
              }}
              aria-label="Toggle theme"
            >
              {themeIcon}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="font-mono text-[11px] uppercase tracking-[2px] px-3 py-1.5 rounded-sm border transition-all duration-300"
              style={{
                borderColor: 'var(--border-hover)',
                color: 'var(--accent)',
              }}
            >
              {language === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 ml-2"
              aria-label="Menu"
            >
              <span
                className="block w-5 h-px transition-transform duration-300"
                style={{
                  background: 'var(--text-primary)',
                  transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : '',
                }}
              />
              <span
                className="block w-5 h-px transition-opacity duration-300"
                style={{
                  background: 'var(--text-primary)',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-px transition-transform duration-300"
                style={{
                  background: 'var(--text-primary)',
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : '',
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            style={{
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(30px)',
            }}
          >
            {t.nav.items.map((item, i) => (
              <button
                key={item}
                onClick={() => handleNavClick(t.nav.ids[i])}
                className="font-mono text-base uppercase tracking-[3px] transition-colors duration-300 hover:text-accent py-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
