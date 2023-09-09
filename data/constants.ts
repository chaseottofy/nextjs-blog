import type { Metadata } from 'next';

/**
 * @see {@link @app/layout.tsx#metaData} - used for meta tag (portfolio)
 * @see {@link @components/Footer/Footer.tsx#Footer} - all links are used in footer
 */
export const SOCIAL_LINKS = {
  github: {
    href: "https://github.com/chaseottofy",
    id: "constslgh01",
    title: "Github Profile",
  },
  codepen: {
    href: "https://codepen.io/chaseottofy",
    id: "constslcp01",
    title: "Codepen Profile",
  },
  portfolio: {
    href: "https://chaseottofy.github.io/Portfolio",
    id: "constslpf01",
    title: "Chase Ottofy Portfolio",
    siteName: "Chase Ottofy Portfolio",
    description: "Chase Ottofy's portfolio website.",
  },
  email: {
    href: "mailto:ottofy@zohomail.com",
    id: "constslml01",
    title: "Email Me",
  },
};

export const BASE_URL = "https://github.com/chaseottofy/nextjs-blog#readme";

export const SOCIAL_LINKS_ARRAY = Object.entries(SOCIAL_LINKS);

export const AUTHOR_NAME = "Ottofy";

export const BASE_KEYWORDS = [
  AUTHOR_NAME,
  'Next.js blog',
  'React blog',
  'Typescript',
  'Contentlayer',
  'Web development',
  'Frontend development',
  'Modern web frameworks',
  'Chase Ottofy portfolio',
  'Web developer',
];

export const BASE_META_DATA: Metadata = {
  title: AUTHOR_NAME + "'s Blog - Web Development & Insights",
  description: `Chase Ottofy's personal blog on web development. Dive into topics around Next.js, React, Typescript, Contentlayer and more. Discover insights and techniques for modern web development.`,
  keywords: BASE_KEYWORDS.join(', ').toLowerCase(),
  authors: [
    {
      name: AUTHOR_NAME,
      url: SOCIAL_LINKS.portfolio.href
    }
  ],
  creator: AUTHOR_NAME,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: 'black' },
    { media: '(prefers-color-scheme: light)', color: 'white' },
  ],
  openGraph: {
    title: SOCIAL_LINKS.portfolio.title,
    description: SOCIAL_LINKS.portfolio.description,
    url: SOCIAL_LINKS.portfolio.href,
    type: 'website',
    siteName: SOCIAL_LINKS.portfolio.siteName,
  },
  icons: [
    {
      rel: 'icon',
      url: '/logo.svg',
      sizes: 'any',
      type: 'image/svg+xml',
    },
  ],
};
