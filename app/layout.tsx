import type { Metadata } from 'next';
import { Outfit, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
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
      className={`${outfit.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased font-body">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
