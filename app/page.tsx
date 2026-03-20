import { getAllPosts } from '@/lib/blog';
import HomePage from '@/components/HomePage';

export default function Home() {
  const ptPosts = getAllPosts('pt').slice(0, 3);
  const enPosts = getAllPosts('en').slice(0, 3);

  return (
    <HomePage
      blogPosts={{
        pt: ptPosts.map(({ slug, title, description, date, tags, readingTime }) => ({
          slug, title, description, date, tags, readingTime,
        })),
        en: enPosts.map(({ slug, title, description, date, tags, readingTime }) => ({
          slug, title, description, date, tags, readingTime,
        })),
      }}
    />
  );
}
