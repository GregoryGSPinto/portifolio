'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

interface TiltStyle {
  transform: string;
  transition: string;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(maxRotation = 8) {
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<TiltStyle>({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 150ms ease-out',
  });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setStyle({
        transform: `perspective(800px) rotateX(${-y * maxRotation}deg) rotateY(${x * maxRotation}deg)`,
        transition: 'transform 150ms ease-out',
      });
    },
    [prefersReduced, maxRotation],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
