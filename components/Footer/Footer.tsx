import styles from './Footer.module.css';
import { socialLinks, portfolioLink, emailLink } from '../../data/constants';

import CustomLink from '../UI/CustomLink';

export function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.col}>
        <span className={styles.title}>Social</span>
        <div className={styles.links}>
          {
            Object.entries(socialLinks).map(([key, value], index) => {
              return (
                <>
                  <CustomLink
                    key={key}
                    href={value}
                    title={key}
                    className={styles.link}
                  >{key}</CustomLink>
                  {
                    index < Object.entries(socialLinks).length - 1 && <span>&nbsp;—&nbsp;</span>
                  }
                </>
              );
            })
          }
        </div>
      </div>

      <div className={styles.col}>
        <span className={styles.title}>Email me</span>
        <div className={styles.links}>
          <a rel="noopener" target="_self" href={"mailto:" + emailLink}>
            {emailLink}
          </a>
        </div>
      </div>

      <div className={styles.col}>
        <span className={styles.title}>code by <>&nbsp;</>@ottofy</span>
        <div className={styles.links}>
          <span>&nbsp; — &nbsp;</span>
          <CustomLink
            href={portfolioLink}
            title="portfolio link"
            className={styles.link}
          >
            portfolio
          </CustomLink>
        </div>
      </div>
    </footer>
  );
}
