'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';

const links = [
  {
    id: 'email',
    label: { pt: 'Email', en: 'Email' },
    value: 'gregoryguimaraes12@outlook.com',
    href: 'mailto:gregoryguimaraes12@outlook.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    copyable: true,
  },
  {
    id: 'github',
    label: { pt: 'GitHub', en: 'GitHub' },
    value: 'GregoryGSPinto',
    href: 'https://github.com/GregoryGSPinto',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    copyable: false,
  },
  {
    id: 'linkedin',
    label: { pt: 'LinkedIn', en: 'LinkedIn' },
    value: 'mqt-gregory',
    href: 'https://www.linkedin.com/in/mqt-gregory',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    copyable: false,
  },
  {
    id: 'phone',
    label: { pt: 'Telefone', en: 'Phone' },
    value: '+55 31 99679-3625',
    href: 'tel:+5531996793625',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    copyable: false,
  },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function SocialLinks() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: do nothing
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="flex flex-col"
    >
      {links.map((link) => (
        <motion.div
          key={link.id}
          variants={fadeInUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="group"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <a
            href={link.href}
            target={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : '_blank'}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-4 py-5 transition-all duration-300 hover:pl-2"
          >
            <span
              className="transition-colors duration-300 group-hover:text-[var(--accent)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {link.icon}
            </span>
            <div className="flex-1 min-w-0">
              <span
                className="font-mono text-[11px] uppercase tracking-[3px] block mb-0.5 transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {link.label[lang]}
              </span>
              <span
                className="font-body text-[13px] md:text-[14px] block truncate transition-colors duration-300 group-hover:underline group-hover:text-[var(--accent)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.value}
              </span>
            </div>
          </a>
          {link.copyable && (
            <button
              type="button"
              onClick={() => handleCopy(link.value)}
              className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[1px] px-3 py-1.5 transition-all duration-200 hover:opacity-80"
              style={{
                color: copied ? 'var(--accent)' : 'var(--text-ghost)',
              }}
              aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            >
              {copied ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
