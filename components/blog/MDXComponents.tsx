import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl md:text-4xl font-bold mt-10 mb-4 text-text-primary font-display"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl md:text-3xl font-semibold mt-8 mb-3 text-text-primary font-display"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl md:text-2xl font-medium mt-6 mb-2 text-text-primary font-display"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-base leading-relaxed mb-4 text-text-secondary"
      {...props}
    />
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? '#'}
        className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },
  code: (props) => (
    <code
      className="bg-bg-tertiary text-accent px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-bg-tertiary border border-border-subtle rounded-lg p-4 overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-accent pl-4 my-6 italic text-text-tertiary"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-4 space-y-1 text-text-secondary" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 text-text-secondary" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  hr: () => <hr className="border-border-subtle my-8" />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg my-6 max-w-full" alt="" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm text-left text-text-secondary" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="px-4 py-2 font-semibold text-text-primary border-b border-border-subtle" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-2 border-b border-border-subtle" {...props} />
  ),
};
