import '@/styles/reset.css';
import '@/styles/root.css';
import '@/styles/mdx.css';

import { Post } from 'contentlayer/generated';
import React from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ThemeProvider from '@/providers/next-theme-provider';
import { BasementExpanded, NeueMontreal } from '@/styles/fonts';
import getPostsSorted from '@/utils/posts/get-posts-sorted';

import styles from './layout.module.css';

export { BASE_META_DATA as metadata } from '@/data/constants';

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
