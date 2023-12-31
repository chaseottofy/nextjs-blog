'use client';

import { Post } from 'contentlayer/generated';
import Link from 'next/link';

import { useHasMounted } from '@/hooks/use-has-mounted';
import { Logo } from '@/svg/icons';
import joinClasses from '@/utils/join-classes';

import ThemeToggle from '../Button/theme-toggle';

import styles from './Header.module.css';

interface HeaderInterface {
  activePosts: Post[];
}

const Header: React.FC<HeaderInterface> = ({ activePosts }) => {
  const hasMounted = useHasMounted();

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
                `/posts/${activePosts[activePosts.length - 1].slugAsParams}`
              }
            >
              latest
            </Link>
          </nav>
          <div className={
            hasMounted
              ? styles.themeToggleWrapper
              : joinClasses(styles, ['themeToggleWrapper', 'skeleton'])
          }
          >
            <ThemeToggle
              hasMounted={hasMounted}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
