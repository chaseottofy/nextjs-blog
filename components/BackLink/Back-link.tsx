import { memo } from 'react';
import Link from 'next/link';

import styles from './Back-link.module.css';

// Nextjs offers support for accessing the history state of the browser using the 'replace' method.
const BackLinkComponent: React.FC = () => (
  <div className={styles.backLinkWrapper}>
    <Link href='/'>← Back To Home</Link>
  </div>
);

const BackLink = memo(BackLinkComponent);

export default BackLink;
