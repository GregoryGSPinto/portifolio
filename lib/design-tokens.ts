export const tokens = {
  colors: {
    dark: {
      bg: {
        primary: '#0A0A0B',
        secondary: '#111113',
        tertiary: '#1A1A1D',
      },
      text: {
        primary: '#FAFAF9',
        secondary: 'rgba(250, 250, 249, 0.6)',
        tertiary: 'rgba(250, 250, 249, 0.55)',
        ghost: 'rgba(250, 250, 249, 0.22)',
      },
      accent: {
        DEFAULT: '#6EE7B7',
        hover: '#A7F3D0',
        glow: 'rgba(110, 231, 183, 0.35)',
      },
      border: {
        subtle: 'rgba(255, 255, 255, 0.08)',
        hover: 'rgba(110, 231, 183, 0.25)',
      },
      card: {
        bg: 'rgba(255, 255, 255, 0.04)',
        bgHover: 'rgba(255, 255, 255, 0.07)',
      },
      nav: 'rgba(10, 10, 11, 0.92)',
      selection: {
        bg: 'rgba(110, 231, 183, 0.2)',
        color: '#6EE7B7',
      },
    },
    light: {
      bg: {
        primary: '#FAFAF9',
        secondary: '#F0F0EE',
        tertiary: '#E5E5E3',
      },
      text: {
        primary: '#09090B',
        secondary: 'rgba(9, 9, 11, 0.68)',
        tertiary: 'rgba(9, 9, 11, 0.55)',
        ghost: 'rgba(9, 9, 11, 0.22)',
      },
      accent: {
        DEFAULT: '#059669',
        hover: '#047857',
        glow: 'rgba(5, 150, 105, 0.35)',
      },
      border: {
        subtle: 'rgba(0, 0, 0, 0.10)',
        hover: 'rgba(5, 150, 105, 0.25)',
      },
      card: {
        bg: 'rgba(0, 0, 0, 0.03)',
        bgHover: 'rgba(0, 0, 0, 0.06)',
      },
      nav: 'rgba(250, 250, 249, 0.92)',
      selection: {
        bg: 'rgba(5, 150, 105, 0.18)',
        color: '#047857',
      },
    },
  },
  fonts: {
    display: 'var(--font-outfit)',
    body: 'var(--font-outfit)',
    mono: 'var(--font-dm-mono)',
  },
  animation: {
    fadeIn: 'fadeIn 0.6s ease-out forwards',
    slideUp: 'slideUp 0.6s ease-out forwards',
    reveal: 'reveal 0.8s ease-out forwards',
    glowPulse: 'glowPulse 2s ease-in-out infinite',
  },
} as const;

export type DesignTokens = typeof tokens;
