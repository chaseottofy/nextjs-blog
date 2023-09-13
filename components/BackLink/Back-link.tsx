import Link from 'next/link';
import { memo } from 'react';

import styles from './Back-link.module.css';

const BackLinkComponent: React.FC = () => (
  <div className={styles.backLinkWrapper}>
    <Link href='/'>← Back To Home</Link>
  </div>
);

const BackLink = memo(BackLinkComponent);

export default BackLink;
