'use client';

import { useScrollPosition } from '@/lib/hooks';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const scrollY = useScrollPosition();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      setProgress(0);
      return;
    }
    setProgress(Math.min((scrollY / docHeight) * 100, 100));
  }, [scrollY]);

  return (
    <div
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
