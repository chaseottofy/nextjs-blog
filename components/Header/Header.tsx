'use client';

import { Post } from 'contentlayer/generated';
import Link from 'next/link';

import { Logo } from '../../svg/icons';
import ThemeToggle from '../Button/theme-toggle';

import styles from './Header.module.css';

interface HeaderInterface {
  activePosts: Post[];
}

const Header: React.FC<HeaderInterface> = ({ activePosts }) => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.colLeft}>
          <Link
            className={styles.appname}
            href='/'
          >
            BLOG
          </Link>
        </div>
        <div className={styles.colCenter}>
          <span>
            <Logo />
          </span>
        </div>

        <div className={styles.colRight}>
          <nav className={styles.nav}>
            <Link
              href={
                `/posts/${activePosts[0].slugAsParams}`
              }
            >
              latest
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
