'use client';

import { useRef, useCallback } from 'react';
import { useScrollPosition } from '@/lib/hooks';

export default function ScrollProgress() {
  const scrollY = useScrollPosition();
  const ref = useRef<HTMLDivElement>(null);

  const getProgress = useCallback(() => {
    if (typeof document === 'undefined') return 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 0;
    return Math.min((scrollY / docHeight) * 100, 100);
  }, [scrollY]);

  const progress = getProgress();

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[60] h-[2px] transition-[width] duration-150 ease-out"
      style={{
        width: `${progress}%`,
        background: 'var(--accent)',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
