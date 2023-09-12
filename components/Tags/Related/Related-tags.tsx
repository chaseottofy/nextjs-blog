import React from 'react';
import Link from 'next/link';

import styles from './Related-tags.module.css';

interface RelatedTagProps {
  relatedTags: string[];
  tagLabel?: string;
}

const RelatedTags: React.FC<RelatedTagProps> = ({
  relatedTags,
  tagLabel = 'Related: ',
}) => {
  return (
    <div className={styles.relatedTags}>
      <div className={styles.tagsWrapper}>
        <div
          className={styles.tags}
          data-content={tagLabel}
        >
          {
            relatedTags.map((tag) => {
              return (
                <Link
                  key={`${tag}-slug`}
                  href={`/tags/${tag}`}
                >
                  <span>{tag}</span>
                  {/* <span>
                    #
                    {tag}
                  </span> */}
                </Link>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default RelatedTags;
