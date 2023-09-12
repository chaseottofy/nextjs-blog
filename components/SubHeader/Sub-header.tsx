import BackLink from 'components/BackLink/Back-link';
import OverlayNoise from 'components/Overlay/Overlay-noise';
import RelatedTags from 'components/Tags/Related/Related-tags';
import getDateParsed from 'utils/get-date-parsed';

import styles from './Sub-header.module.css';

interface SubHeaderProps {
  title: string;
  date: string;
  author: string;
  tags: string[];
}

const SubHeader: React.FC<SubHeaderProps> = ({
  title, date, author, tags,
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
        <span>
          {author}
        </span>
      </div>

      <div className={styles.top}>
        <BackLink />
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.bottom}>
        <RelatedTags
          relatedTags={tags}
          tagLabel='Tags: '
        />
      </div>

    </section>
  );
};

export default SubHeader;
