'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { translations } from '@/lib/translations';
import { useScrollPosition, useIsMobile } from '@/lib/hooks';

export default function Navigation() {
  const { language, toggleLanguage } = useLanguage();
  const { preference, cycleTheme } = useTheme();
  const t = translations[language];
  const scrollY = useScrollPosition();
  const isMobile = useIsMobile(768); // md breakpoint
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const scrolled = scrollY > 50;
  const visibleCount = isMobile ? 3 : 5;
  const visibleItems = t.nav.items.slice(0, visibleCount);
  const visibleIds = t.nav.ids.slice(0, visibleCount);
  const dropdownItems = t.nav.items.slice(visibleCount);
  const dropdownIds = t.nav.ids.slice(visibleCount);

  const handleNavClick = useCallback((id: string) => {
    setDropdownOpen(false);
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

  const themeIcon = preference === 'light' ? '☀' : preference === 'dark' ? '☾' : '◐';

  return (
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

        {/* Nav items + More dropdown */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-8">
          {/* Visible items */}
          {visibleItems.map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(visibleIds[i])}
              className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] transition-colors duration-300 hover:text-accent"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item}
            </button>
          ))}

          {/* More button + dropdown */}
          {dropdownItems.length > 0 && (
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] transition-colors duration-300 flex items-center gap-1"
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
                      minWidth: isMobile ? 'calc(100vw - 40px)' : '200px',
                      right: isMobile ? '-70px' : '0',
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
                          padding: isMobile ? '12px 16px' : '10px 16px',
                          minHeight: isMobile ? '44px' : 'auto',
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
            onClick={toggleLanguage}
            className="font-mono text-[11px] uppercase tracking-[2px] px-3 py-1.5 rounded-sm border transition-all duration-300"
            style={{
              borderColor: 'var(--border-hover)',
              color: 'var(--accent)',
            }}
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
