import type { Metadata } from 'next';
import { Outfit, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { LangProvider } from '@/context/LangContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import SkipLink from '@/components/layout/SkipLink';
import { PersonJsonLd, WebsiteJsonLd } from '@/components/seo/JsonLd';
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
  metadataBase: new URL('https://gregorypinto.dev'),
  title: {
    default: 'Gregory Pinto — AI Solutions Architect',
    template: '%s | Gregory Pinto',
  },
  description:
    'Solution Architect specializing in DDD, scalable systems, and AI/ML — transforming complex operations into data-driven decisions.',
  keywords: [
    'AI Solutions Architect',
    'Solution Architecture',
    'Domain-Driven Design',
    'DDD',
    'AI/ML',
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Machine Learning',
    'CTO',
    'Scalable Systems',
  ],
  authors: [{ name: 'Gregory Pinto' }],
  openGraph: {
    title: 'Gregory Pinto — AI Solutions Architect',
    description:
      'Solution Architect specializing in DDD, scalable systems, and AI/ML — transforming complex operations into data-driven decisions.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'pt_BR',
    siteName: 'Gregory Pinto',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gregory Pinto — AI Solutions Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gregory Pinto — AI Solutions Architect',
    description:
      'Solution Architect specializing in DDD, scalable systems, and AI/ML — transforming complex operations into data-driven decisions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
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
        <PersonJsonLd
          name="Gregory Pinto"
          jobTitle="AI Solutions Architect"
          url="https://gregorypinto.dev"
          sameAs={[
            'https://github.com/GregoryGSPinto',
            'https://www.linkedin.com/in/mqt-gregory/',
          ]}
          knowsAbout={[
            'Solution Architecture',
            'Domain-Driven Design',
            'AI/ML',
            'TypeScript',
            'React',
            'Next.js',
            'Node.js',
            'Python',
          ]}
        />
        <WebsiteJsonLd
          url="https://gregorypinto.dev"
          name="Gregory Pinto — AI Solutions Architect"
          description="Solution Architect specializing in DDD, scalable systems, and AI/ML — transforming complex operations into data-driven decisions."
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased font-body">
        <ThemeProvider>
          <LangProvider>
            <SkipLink />
            <ScrollProgress />
            <Navbar />
            {children}
            <Footer />
          </LangProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
