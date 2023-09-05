import '../styles/global.scss';
import React from 'react';
import type { Metadata } from 'next';
import getPostsSorted from 'utils/posts/get-posts-sorted';
import { Post } from 'contentlayer/generated';
import styles from './layout.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {
  NeueMontreal,
  BasementExpanded,
} from '../utils/get-local-fonts';
import ThemeProvider from '../providers/next-theme-provider';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Nextjs blog example',
  keywords: 'nextjs, blog, react, react blog, nextjs blog',
  authors: [{ name: 'Chase Ottofy', url: 'https://chaseottofy.github.io/Portfolio/' }],
  icons: [
    {
      rel: 'icon',
      url: '/logo.svg',
      sizes: 'any',
      type: 'image/svg+xml',
    },
  ],
};

interface RootLayoutInterface {
  children: React.ReactNode;
  params: {
    startPosts: Post[];
  };
}

const RootLayout: React.FC<RootLayoutInterface> = ({
  children,
  params,
}) => {
  const startPosts = getPostsSorted('asc', true);
  // eslint-disable-next-line no-param-reassign
  params.startPosts = startPosts;

  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={`${NeueMontreal.className} ${BasementExpanded.variable}`}
      >
        <ThemeProvider>
          <Header activePosts={startPosts} />
          <main className={styles.main}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
