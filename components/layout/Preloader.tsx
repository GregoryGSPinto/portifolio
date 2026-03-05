'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'gg-preloader-shown';
const DURATION = 2000;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setLoading(false);
      return;
    }

    const shown = sessionStorage.getItem(STORAGE_KEY);
    if (shown) {
      setLoading(false);
      return;
    }

    setShouldShow(true);
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem(STORAGE_KEY, '1');
    }, DURATION);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  if (!shouldShow) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'var(--bg-primary)' }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Loading"
            >
              {/* First G */}
              <motion.path
                d="M10 55 C10 35, 10 20, 25 15 C35 11, 42 18, 42 25 L42 40 L30 40"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Second G */}
              <motion.path
                d="M45 55 C45 35, 45 20, 60 15 C70 11, 77 18, 77 25 L77 40 L65 40"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Dot */}
              <motion.circle
                cx="40"
                cy="65"
                r="2"
                fill="var(--accent)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.3 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={shouldShow ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: loading ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
