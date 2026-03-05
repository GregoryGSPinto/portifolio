declare module 'next-mdx-remote/rsc' {
  import type { ReactElement, ComponentProps } from 'react';
  import type { MDXProvider } from '@mdx-js/react';

  interface SerializeOptions {
    mdxOptions?: {
      remarkPlugins?: Array<unknown>;
      rehypePlugins?: Array<unknown>;
    };
  }

  interface MDXRemoteProps {
    source: string;
    options?: SerializeOptions;
    components?: ComponentProps<typeof MDXProvider>['components'];
  }

  export function MDXRemote(props: MDXRemoteProps): Promise<ReactElement>;
}

declare module 'rehype-slug';
declare module 'remark-gfm';
declare module 'gray-matter' {
  interface GrayMatterFile {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>;
    content: string;
  }
  function matter(input: string): GrayMatterFile;
  export = matter;
}
declare module 'reading-time' {
  interface ReadingTimeResult {
    text: string;
    minutes: number;
    time: number;
    words: number;
  }
  function readingTime(text: string): ReadingTimeResult;
  export = readingTime;
}
