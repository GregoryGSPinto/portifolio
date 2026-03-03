'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { useScrollPosition } from '@/lib/hooks';

export default function Navigation() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 50;

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10, 10, 11, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="font-display text-lg tracking-wide"
            style={{ color: '#E8E4DE' }}
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
                style={{ color: 'rgba(232, 228, 222, 0.4)' }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="font-mono text-[11px] uppercase tracking-[2px] px-3 py-1.5 rounded-sm border transition-all duration-300"
              style={{
                borderColor: 'rgba(201, 168, 76, 0.3)',
                color: '#C9A84C',
              }}
            >
              {language === 'pt' ? 'EN' : 'PT'}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5"
              aria-label="Menu"
            >
              <span className="block w-5 h-px bg-text-primary transition-transform" style={{ transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : '' }} />
              <span className="block w-5 h-px bg-text-primary transition-opacity" style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span className="block w-5 h-px bg-text-primary transition-transform" style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : '' }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 lg:hidden"
            style={{ background: 'rgba(10, 10, 11, 0.97)' }}
          >
            {t.nav.items.map((item, i) => (
              <button
                key={item}
                onClick={() => handleNavClick(t.nav.ids[i])}
                className="font-mono text-sm uppercase tracking-[3px] transition-colors duration-300 hover:text-accent"
                style={{ color: 'rgba(232, 228, 222, 0.6)' }}
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
