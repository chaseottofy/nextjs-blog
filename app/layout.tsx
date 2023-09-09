import React from 'react';
import { Post } from 'contentlayer/generated';
import getPostsSorted from 'utils/posts/get-posts-sorted';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ThemeProvider from '../providers/next-theme-provider';
import {
  BasementExpanded,
  NeueMontreal,
} from '../utils/get-local-fonts';

import '../styles/global.scss';
import styles from './layout.module.css';

export { BASE_META_DATA as metadata } from 'data/constants';

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
