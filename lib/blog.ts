import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  project?: string;
  content: string;
  lang: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getAllPosts(lang: string = 'pt'): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(BLOG_DIR, filename);
      const source = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(source);

      if (data.draft) return null;

      const title = data.title?.[lang] ?? data.title?.pt ?? data.title;
      const description =
        data.description?.[lang] ?? data.description?.pt ?? data.description;

      return {
        slug,
        title: typeof title === 'string' ? title : String(title),
        description: typeof description === 'string' ? description : String(description),
        date: data.date ? new Date(data.date).toISOString() : '',
        tags: data.tags ?? [],
        readingTime: readingTime(content).text,
        project: data.project,
        lang,
      };
    })
    .filter(Boolean) as Omit<BlogPost, 'content'>[];

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string, lang: string = 'pt'): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);

  const title = data.title?.[lang] ?? data.title?.pt ?? data.title;
  const description =
    data.description?.[lang] ?? data.description?.pt ?? data.description;

  return {
    slug,
    title: typeof title === 'string' ? title : String(title),
    description: typeof description === 'string' ? description : String(description),
    date: data.date ? new Date(data.date).toISOString() : '',
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    project: data.project,
    content,
    lang,
  };
}

export function getAllTags(lang: string = 'pt'): string[] {
  const posts = getAllPosts(lang);
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
