'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLang } from '@/context/LangContext';

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_DURATION = 2000;
const CURSOR_BLINK = 530;

export default function Typewriter() {
  const { t } = useLang();
  const roles = t.hero.roles;
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const tickRef = useRef<() => void>(null);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), CURSOR_BLINK);
    return () => clearInterval(interval);
  }, []);

  const tick = useCallback(() => {
    const current = roles[roleIndex];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
        timeoutRef.current = setTimeout(() => tickRef.current?.(), TYPE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          timeoutRef.current = setTimeout(() => tickRef.current?.(), DELETE_SPEED);
        }, PAUSE_DURATION);
      }
    } else {
      if (displayed.length > 0) {
        setDisplayed(current.slice(0, displayed.length - 1));
        timeoutRef.current = setTimeout(() => tickRef.current?.(), DELETE_SPEED);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timeoutRef.current = setTimeout(() => tickRef.current?.(), TYPE_SPEED);
      }
    }
  }, [displayed, isDeleting, roleIndex, roles]);

  useEffect(() => {
    tickRef.current = tick;
    timeoutRef.current = setTimeout(tick, TYPE_SPEED);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick]);

  return (
    <span className="font-mono text-sm sm:text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle"
        style={{
          background: 'var(--accent)',
          opacity: cursorVisible ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      />
    </span>
  );
}
