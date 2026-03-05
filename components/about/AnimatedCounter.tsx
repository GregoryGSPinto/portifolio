'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

export default function AnimatedCounter({ target, suffix = '', label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      setDisplay(String(v));
    });
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(motionVal, target, {
            duration: 2,
            ease: 'easeOut',
          });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, motionVal, target]);

  return (
    <div ref={ref} className="text-center">
      <motion.span
        className="font-mono text-4xl md:text-5xl font-bold block mb-2"
        style={{ color: 'var(--accent)' }}
      >
        {display}
        {suffix}
      </motion.span>
      <span
        className="font-body text-xs md:text-sm uppercase tracking-widest"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {label}
      </span>
    </div>
  );
}
