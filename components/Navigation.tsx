'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import { useTheme } from '@/context/ThemeContext';
import { useScrollPosition } from '@/lib/hooks';

export default function Navigation() {
  const { lang, toggleLang, t } = useLang();
  const { preference, cycleTheme } = useTheme();
  const scrollY = useScrollPosition();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrolled = scrollY > 50;
  const visibleItems = t.nav.items.slice(0, 5);
  const visibleIds = t.nav.ids.slice(0, 5);
  const dropdownItems = t.nav.items.slice(5);
  const dropdownIds = t.nav.ids.slice(5);

  const handleNavClick = useCallback((id: string) => {
    setDropdownOpen(false);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setDropdownOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dropdownOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="font-display text-lg tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          >
            GG
          </a>

          {/* Desktop nav items + More dropdown */}
          <div className="hidden md:flex items-center gap-8">
            {visibleItems.map((item, i) => (
              <button
                key={item}
                onClick={() => handleNavClick(visibleIds[i])}
                className="font-mono text-[11px] uppercase tracking-[2px] transition-colors duration-300 hover:text-accent"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item}
              </button>
            ))}

            {dropdownItems.length > 0 && (
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  className="font-mono text-[11px] uppercase tracking-[2px] transition-colors duration-300 flex items-center gap-1"
                  style={{
                    color: dropdownOpen ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                >
                  {t.nav.more}
                  <span
                    className="inline-block transition-transform duration-300 text-[9px]"
                    style={{
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    ▾
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      ref={dropdownRef}
                      role="menu"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 mt-3 p-2 z-50"
                      style={{
                        minWidth: '200px',
                        background: 'var(--bg-primary)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px var(--dropdown-shadow, rgba(0,0,0,0.2))',
                      }}
                    >
                      {dropdownItems.map((item, i) => (
                        <button
                          key={item}
                          role="menuitem"
                          onClick={() => handleNavClick(dropdownIds[i])}
                          className="w-full text-left font-mono text-[11px] uppercase tracking-[2px] transition-all duration-200 rounded-lg block"
                          style={{
                            padding: '10px 16px',
                            color: 'var(--text-secondary)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--card-bg)';
                            e.currentTarget.style.color = 'var(--accent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right controls */}
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
              onClick={toggleLang}
              className="font-mono text-[11px] uppercase tracking-[2px] px-3 py-1.5 rounded-sm border transition-all duration-300"
              style={{
                borderColor: 'var(--border-hover)',
                color: 'var(--accent)',
              }}
              aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 ml-1"
              style={{ gap: 5 }}
              aria-label="Toggle menu"
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

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40"
            style={{
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'var(--bg-primary)', opacity: 0.95 }}
            />
            <div
              className="relative z-10 flex flex-col items-center justify-center h-full"
              style={{ gap: 32 }}
            >
              {t.nav.items.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => handleNavClick(t.nav.ids[i])}
                  className="font-mono text-base uppercase transition-colors duration-300 hover:text-accent"
                  style={{
                    letterSpacing: '3px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
