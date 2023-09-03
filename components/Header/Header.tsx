'use client';

import Link from 'next/link';
import getLatestPost from '../../utils/get-latest-post';
import ThemeToggle from '../Button/theme-toggle';
import Image from 'next/image';
import styles from './Header.module.css';

const CircleIcon = () => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
  );
};

export function Header() {
  const latestPost = getLatestPost();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>

        <div className={styles.colLeft}>
          <Link className={styles.appname} href="/">
            BLOG
          </Link>
        </div>

        <div className={styles.colCenter}>
          <span>
            <Image
              src={`/images/logo/echo.webp`}
              alt='site logo'
              loading='eager'
              quality={80}
              priority={true}
              width={40}
              height={40}
            />
          </span>
        </div>

        <div className={styles.colRight}>
          <nav className={styles.nav}>
            <Link
              href={latestPost}
            >latest</Link>
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
}
