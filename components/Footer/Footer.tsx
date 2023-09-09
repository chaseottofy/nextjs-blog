import React from 'react';
import { SOCIAL_LINKS_ARRAY } from 'data/constants';

import CustomLink from '../CustomLink/Custom-link';

import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>

    <div className={styles.col}>
      <span className={styles.title}>Social</span>
      <div className={styles.links}>
        {
          SOCIAL_LINKS_ARRAY.map(([key, { href, id, title }], index) => (
            <>
              <CustomLink
                key={id}
                href={href}
                title={title}
                className={styles.link}
              >
                {key}
              </CustomLink>
              {
                index < SOCIAL_LINKS_ARRAY.length - 1 && <span>&nbsp;—&nbsp;</span>
              }
            </>
          ))
        }
      </div>
    </div>

    <div className={styles.col}>
      <span className={styles.title}>@ottofy</span>
      <div className={styles.links} />
    </div>
  </footer>
);

export default Footer;
