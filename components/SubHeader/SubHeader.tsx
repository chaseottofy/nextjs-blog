import styles from './SubHeader.module.css';
import Link from 'next/link';
import { format, parseISO } from "date-fns";

export function SubHeader({
  title,
  date,
  author,
  views,
}: {
  title: string;
  date: string;
  author: string;
  views: string;
}
) {
  return (
    <section className={styles.subheader}>
      <svg className={styles.grad}>
        <filter id='grainy' x='0' y='0' width='100%' height='100%'>
          <feTurbulence type='fractalNoise' baseFrequency='.537' />
          <feColorMatrix type='saturate' values='0' />
          <feBlend in='SourceGraphic' mode='multiply' />
        </filter>
      </svg>

      <div className={styles.overlay}></div>
      <div className={styles.overlayNoise}></div>

      <div className={styles.top}>
        <div className={styles.gobackwrapper}>
          <Link className={styles.goback} href="/">← Back to Home</Link>
        </div>

        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.bottom}>
        <div className={styles.column}>
          <span className={styles.content}>
            views: {views}
          </span>
        </div>

        <div className={styles.column}>
          <span className={styles.content}>
            {format(parseISO(date), 'LLLL d, yyyy')}
          </span>
        </div>

        <div className={styles.column}>
          <span className={styles.content}>
            by: {author}
          </span>
        </div>
      </div>
    </section>
  );
}