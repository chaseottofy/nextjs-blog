import type { Metadata } from 'next';

// If you are not using an svg for your favicon, update the following constants
const FAVICON_SRC = '/logo.svg';
const FAVICON_SIZE = 'any';
const FAVICON_TYPE = 'image/svg+xml';
const FAVICON_REL = 'icon';

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
  portfolio: {
    href: "https://ottofy.dev",
    id: "constslpf01",
    title: "Chase Ottofy Portfolio",
    siteName: "Chase Ottofy Portfolio",
    description: "Chase Ottofy's portfolio website.",
  },
  codepen: {
    href: "https://codepen.io/chaseottofy",
    id: "constslcp01",
    title: "Codepen Profile",
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
  'next.js blog',
  'react blog',
  'Typescript',
  'contentlayer',
  'web development',
  'frontend development',
  'modern web frameworks',
];

export const BASE_META_DATA: Metadata = {
  title: `Blog | ${AUTHOR_NAME}`,
  description: `${AUTHOR_NAME}'s personal blog on web development. Dive into topics around Next.js, React, Typescript, Contentlayer and more. Discover insights and techniques for modern web development.`,
  keywords: BASE_KEYWORDS.join(', '),
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
      rel: FAVICON_REL,
      url: FAVICON_SRC,
      sizes: FAVICON_SIZE,
      type: FAVICON_TYPE,
    },
  ],
};
