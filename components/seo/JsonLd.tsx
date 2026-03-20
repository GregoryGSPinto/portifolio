import { personalInfo } from '@/lib/data';

interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  knowsAbout: string[];
}

export function PersonJsonLd({ name, jobTitle, url, sameAs, knowsAbout }: PersonJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url,
    sameAs,
    knowsAbout,
    email: personalInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: personalInfo.location,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteJsonLdProps {
  url: string;
  name: string;
  description: string;
}

export function WebsiteJsonLd({ url, name, description }: WebsiteJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  keywords,
}: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
      url: personalInfo.linkedin,
    },
    publisher: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    keywords,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CaseStudyJsonLdProps {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
}

export function CaseStudyJsonLd({ name, description, url, keywords }: CaseStudyJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    creator: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    about: keywords,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
