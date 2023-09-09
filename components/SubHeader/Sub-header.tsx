import Link from 'next/link';

import getDateParsed from '../../utils/get-date-parsed';

import styles from './Sub-header.module.css';

import OverlayNoise from 'components/Overlay/Overlay-noise';

interface SubHeaderProps {
  title: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  title, date, author, tags, slug,
}) => {

  return (
    <section
      className={styles.subheader}
    >
      <OverlayNoise />
      <div className={styles.topMeta}>
        <span>
          {getDateParsed(date, 'LLLL d, yyyy')}
        </span>
        <span>by: {author}</span>
      </div>

      <div className={styles.top}>
        <div className={styles.gobackwrapper}>
          <Link className={styles.goback} href='/'>← Back To Home</Link>
        </div>
        <h1 className={styles.title}>
          {title}
        </h1>
      </div>

      <div className={styles.bottom}>
        {tags.map((tag) => (
          <Link
            key={`${tag}SH`}
            href={`/tags/${tag}`}
          >
            <span className={styles.tag}>
              #
              {tag}
              &nbsp;
            </span>
          </Link>
        ))}
      </div>


    </section>
  );
};

export default SubHeader;
