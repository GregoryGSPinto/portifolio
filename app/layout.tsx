import type { Metadata, Viewport } from 'next';
import { Outfit, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LangProvider } from '@/context/LangContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import SkipLink from '@/components/layout/SkipLink';
import { PersonJsonLd, WebsiteJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/site';
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
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.shortTitle,
  title: {
    default: siteConfig.title,
    template: '%s | Gregory Guimaraes',
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.legalName, url: siteConfig.links.linkedin }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      'pt-BR': absoluteUrl('/'),
      'en-US': absoluteUrl('/'),
    },
  },
  category: 'technology',
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    url: absoluteUrl('/'),
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    siteName: siteConfig.shortTitle,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'format-detection': 'telephone=no, email=no, address=no',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAF9' },
  ],
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
          name={siteConfig.legalName}
          jobTitle="Product-minded Software Architect"
          url={siteConfig.url}
          sameAs={[
            siteConfig.links.github,
            siteConfig.links.linkedin,
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
          url={siteConfig.url}
          name={siteConfig.title}
          description={siteConfig.description}
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
        <SpeedInsights />
      </body>
    </html>
  );
}
