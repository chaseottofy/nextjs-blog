'use client';

import { Post } from 'contentlayer/generated';
import Image from 'next/image';
import Link from 'next/link';

import { CircleIcon } from '../../svg/icons';
import ThemeToggle from '../Button/theme-toggle';

import styles from './Header.module.css';

interface HeaderInterface {
  activePosts: Post[];
}

const Header: React.FC<HeaderInterface> = ({ activePosts }) => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <div className={styles.colLeft}>
        <Link className={styles.appname} href='/'>
          BLOG
        </Link>
      </div>
      <div className={styles.colCenter}>
        <span>
          <Image
            src='/images/logo/echo.webp'
            alt='site logo'
            quality={50}
            width={40}
            height={40}
            loading='lazy'
          />
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
        <div className={styles.toggleWrapper}>
          <ThemeToggle className={styles.toggleTheme}>
            <CircleIcon />
          </ThemeToggle>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
