import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-bg-primary text-text-primary antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
