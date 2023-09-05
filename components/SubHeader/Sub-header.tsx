import Link from 'next/link';
import { nanoid } from 'nanoid';
import imagePlaceholders from 'data/image-placeholders';
import styles from './Sub-header.module.css';
import getDateParsed from '../../utils/get-date-parsed';

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
  const placeholderImage = imagePlaceholders[slug]
    ? imagePlaceholders[slug]
    : imagePlaceholders.default;

  return (
    <section
      className={styles.subheader}
    >
      <svg className={styles.grad}>
        <filter id='grainy' x='0' y='0' width='100%' height='100%'>
          <feTurbulence type='fractalNoise' baseFrequency='.537' />
          <feColorMatrix type='saturate' values='0' />
          <feBlend in='SourceGraphic' mode='multiply' />
        </filter>
      </svg>

      <div
        className={styles.overlay}
        style={{
          backgroundImage: `url(${placeholderImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className={styles.overlayNoise} />

      <div className={styles.top}>
        <div className={styles.gobackwrapper}>
          <Link className={styles.goback} href='/'>← Back to Home</Link>
        </div>
        <h1 className={styles.title}>
          {
            // if title has a dash, split it into two lines
            title.includes('-') ? title.split('-').map((line) => (
              <span
                key={nanoid(10)}
                className={styles.titleLine}
              >
                {line}
              </span>
            )) : title
          }
        </h1>
      </div>

      <div className={styles.bottom}>
        <div className={styles.column}>
          <div className={styles.content}>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Link
                  key={nanoid(10)}
                  href={`/tags/${tag}`}
                >
                  <span
                    className={styles.tag}
                  >
                    #
                    {tag}
                    &nbsp;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.column}>
          <span className={styles.content}>
            {getDateParsed(date, 'LLLL d, yyyy')}
          </span>
          <span className={styles.content}>{author}</span>
        </div>
      </div>
    </section>
  );
};

export default SubHeader;
