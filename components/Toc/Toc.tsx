import { NestedTitles } from '@/models/interfaces';
import formatLink from '@/utils/format-link';

import styles from './Toc.module.css';

/**
 * Recursively renders a list of titles
 *
 * @param titles - an object of potentially
 * nested titles [key: string]: null | NestedTitles;
 *
 * @returns React.FC | calls itself recursively
 */
const TitleList: React.FC<{ titles: NestedTitles; }> = ({ titles }) => {
  const titlesKeys = Object.keys(titles);
  return (
    <ul className={styles.toc}>
      {
        titlesKeys.map((title, index) => {
          const titleHref = formatLink(title);
          const titleId = titleHref.length >= 15 ? `${titleHref.slice(0, 15)}id` : `${titleHref}id`;
          const liCName = index === titlesKeys.length - 1 ? styles.liLast : styles.liTop;

          return (
            <li key={titleId} className={liCName}>
              <a href={titleHref}>{title}</a>
              {titles[title] && <TitleList titles={titles[title] as NestedTitles} />}
            </li>
          );
        })
      }
    </ul>
  );
};

const TableOfContents: React.FC<{ titles: NestedTitles; }> = ({ titles }) => {
  return (
    <div className={styles.tocWrapper}>
      <TitleList titles={titles} />
    </div>
  );
};

export default TableOfContents;
