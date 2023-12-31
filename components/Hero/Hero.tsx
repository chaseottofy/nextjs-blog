'use client';

import React from 'react';
import { Post } from 'contentlayer/generated';

import TagComponent from '@/components/Tags/Tags';

import styles from './Hero.module.css';

interface HeroProps {
  activePosts: Post[];
  setActivePosts: (posts: Post[]) => void;
  startingActive: Post[];
  tags: {
    [key: string]: number;
  };
}

const Hero: React.FC<HeroProps> = ({
  activePosts, setActivePosts, startingActive, tags,
}) => (
  <div className={styles.hero}>
    <TagComponent
      setActivePosts={setActivePosts}
      activePosts={activePosts}
      startingActive={startingActive}
      tags={tags}
    />
  </div>
);

export default Hero;
