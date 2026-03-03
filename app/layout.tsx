import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gregory Guimarães | AI Solutions Architect',
  description:
    'Arquiteto de soluções inteligentes que transformam operações complexas em sistemas escaláveis e decisões data-driven.',
  keywords: [
    'AI Solutions Architect',
    'CTO',
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
    'React',
  ],
  authors: [{ name: 'Gregory Guimarães' }],
  openGraph: {
    title: 'Gregory Guimarães | AI Solutions Architect',
    description:
      'Arquiteto de soluções inteligentes que transformam operações complexas em sistemas escaláveis e decisões data-driven.',
    type: 'website',
  },
};

const themeScript = `
(function() {
  try {
    var pref = localStorage.getItem('theme-preference');
    var resolved = 'dark';
    if (pref === 'light') resolved = 'light';
    else if (pref === 'dark') resolved = 'dark';
    else if (pref === 'system' || !pref) {
      resolved = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.classList.add(resolved);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
