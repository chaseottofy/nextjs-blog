import React from 'react';
import { nanoid } from 'nanoid';
import styles from './Footer.module.css';
import { socialLinks, emailLink } from '../../data/constants';
import CustomLink from '../CustomLink/Custom-link';

const Footer: React.FC = () => (
  <footer className={styles.footer}>

    <div className={styles.col}>
      <span className={styles.title}>Social</span>
      <div className={styles.links}>
        {
            Object.entries(socialLinks).map(([key, value], index) => (
              <>
                <CustomLink
                  key={nanoid(10)}
                  href={value}
                  title={key}
                  className={styles.link}
                >
                  {key}
                </CustomLink>
                {
                  index < Object.entries(socialLinks).length - 1 && <span>&nbsp;—&nbsp;</span>
                }
              </>
            ))
          }
      </div>
    </div>

    <div className={styles.col}>
      <span className={styles.title}>Email me</span>
      <div className={styles.links}>
        <a rel='noopener' target='_self' href={`mailto:${emailLink}`}>
          {emailLink}
        </a>
      </div>
    </div>

    <div className={styles.col}>
      <span className={styles.title}>
        code by
        &nbsp;
        @ottofy
      </span>
      <div className={styles.links} />
    </div>
  </footer>
);

export default Footer;
