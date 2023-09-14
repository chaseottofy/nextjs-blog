import React from 'react';
import Link from 'next/link';

import { SOCIAL_LINKS_ARRAY } from '@/data/constants';

import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.links}>
      {
        SOCIAL_LINKS_ARRAY.map(([key, { href, id, title }]) => (
          <Link
            key={id}
            className={styles.link}
            href={href}
            title={title}
            target='_blank'
            rel='noopener noreferrer'
          >
            {key}
          </Link>
        ))
      }
    </div>
  </footer>
);

export default Footer;
