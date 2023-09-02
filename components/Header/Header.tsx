'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import getLatestPost from '../../utils/get-latest-post';
import ThemeToggle from '../Button/theme-toggle';

function Icon() {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 200 200"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 100.641C32 68.391 54.1651 41.3515 84 34.1102V1.28125C36.3772 8.98855 0 50.5392 0 100.641C0 150.742 36.3772 192.293 84 200V167.171C54.1651 159.93 32 132.89 32 100.641ZM200 100.641C200 150.742 163.623 192.293 116 200V167.171C145.835 159.93 168 132.89 168 100.641C168 68.391 145.835 41.3515 116 34.1102V1.28125C163.623 8.98855 200 50.5392 200 100.641Z" />
    </svg>
  );
}

export function Header() {
  const latestPost = getLatestPost();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>

        <div className={styles.colLeft}>
          <Link className={styles.appname} href="/">otto</Link>
        </div>

        <div className={styles.colCenter}>
          <ThemeToggle className={styles.iconWrapper}>
            <Icon />
            <Icon />
          </ThemeToggle>
        </div>

        <div className={styles.colRight}>
          <nav className={styles.nav}>
            <Link href={latestPost}>latest</Link>
            <Link href="/links">Top</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
