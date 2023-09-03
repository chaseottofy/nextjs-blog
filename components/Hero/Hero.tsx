"use client";

import styles from './Hero.module.css';
import TagComponent from 'components/Tags/Tags';
import { Post } from 'contentlayer/generated';

interface HeroProps {
  activePosts: Post[];
  setActivePosts: (posts: Post[]) => void;
  startingActive: Post[];
  tags: {
    [key: string]: number;
  };
}

export const Hero: React.FC<HeroProps> = ({ activePosts, setActivePosts, startingActive, tags }) => {
  return (
    <div className={styles.hero}>
      <TagComponent
        setActivePosts={setActivePosts}
        activePosts={activePosts}
        startingActive={startingActive}
        tags={tags}
      />
    </div>
  );
};
