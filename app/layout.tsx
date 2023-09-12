import React from 'react';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { Post } from 'contentlayer/generated';
import localFont from 'next/font/local';
import ThemeProvider from '@/providers/next-theme-provider';
import getPostsSorted from '@/utils/posts/get-posts-sorted';

import '@/styles/reset.css';
import '@/styles/root.css';
import '@/styles/mdx.css';
import styles from './layout.module.css';

export { BASE_META_DATA as metadata } from '@/data/constants';

const NeueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/NeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: false,
  variable: '--neue',
  fallback: [
    'apple-system',
    'blinkmacsystemfont',
    'segoe ui',
    'roboto',
    'oxygen',
    'ubuntu',
    'cantarell',
    'fira sans',
    'droid sans',
    'helvetica neue',
    'sans-serif',
  ],
});

const BasementExpanded = localFont({
  src: [
    {
      path: '../public/fonts/Basement-expanded.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'block', // No other font matches its weird height, so block it
  variable: '--basement-expanded',
  fallback: [
    'apple-system',
    'blinkmacsystemfont',
    'segoe ui',
    'roboto',
    'oxygen',
    'ubuntu',
    'cantarell',
    'fira sans',
    'droid sans',
    'helvetica neue',
    'sans-serif',
  ],
  preload: false,
});

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
        className={`${NeueMontreal.variable} ${BasementExpanded.variable}`}
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
