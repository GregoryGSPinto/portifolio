import { MDXRemote as MDXRemoteRSC } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from './MDXComponents';

interface Props {
  source: string;
}

export async function MDXContent({ source }: Props) {
  return (
    <MDXRemoteRSC
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
      components={mdxComponents}
    />
  );
}
