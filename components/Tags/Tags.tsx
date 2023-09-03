"use client";

import { useState, useEffect } from 'react';
import { Post } from 'contentlayer/generated';
import styles from './Tags.module.css';
import joinClasses from 'utils/join-classes';
import useWindowDimensions from 'hooks/use-width';
import { useHasMounted } from 'hooks/use-has-mounted';

interface TagProps {
  setActivePosts: (posts: Post[]) => void;
  activePosts: Post[];
  startingActive: Post[];
  tags: {
    [key: string]: number;
  };
}

interface TagComponentProps {
  tag: string;
  count: number;
  onTagClick: (tag: string) => void;
  className?: string;
}

const Tag: React.FC<TagComponentProps> = ({ tag, count, onTagClick, className }) => {
  return (
    <>
      <span
        onClick={() => onTagClick(tag)}
        className={className}
      >
        <span>{tag}&nbsp;</span>
        <span>{count}</span>
      </span>
    </>
  );
};


const TagComponent: React.FC<TagProps> = ({ setActivePosts, activePosts, startingActive, tags }) => {
  const [tagKeys, tagValues] = [Object.keys(tags), Object.values(tags)];
  const tagLength = tagKeys.length;

  const hasMounted = useHasMounted();
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);

  // gets updated on window resize;
  const { width: windowSize } = useWindowDimensions();

  // set a max number of tags to show based on window size to not wrap past first line
  const maxTags = Math.floor(windowSize / 100);
  // if there are more tags than the max, show the max, otherwise show all tags
  const maxTagsOver = maxTags > tagKeys.length;

  useEffect(() => {
    setModalOpen(false); // force close modal to recalculate visible tag #
    setVisibleTags(tagKeys.slice(0, maxTagsOver ? tagKeys.length : maxTags));
  }, [windowSize]);

  useEffect(() => {
    if (!hasMounted) return;
    const emptyPosts = activePosts.length === 0;
    const emptyTags = activeTags.length === 0;

    if (emptyPosts && emptyTags) {
      setActivePosts(startingActive);
      return;
    }

    if (emptyPosts && !emptyTags) {
      handleFilterPosts();
      return;
    }

    if (!emptyPosts && emptyTags) {
      setActivePosts(startingActive);
      return;
    }

    if (!emptyPosts && !emptyTags) {
      handleFilterPosts();
      return;
    }
  }, [activeTags]);

  function handleFilterPosts() {
    setActivePosts(startingActive.filter((post) => {
      let postTags = post.tags;
      postTags[postTags.length - 1] = postTags[postTags.length - 1].replace(/\r$/, '');
      return activeTags.every((activeTag) => {
        return postTags.includes(activeTag);
      });
    }));
  }

  function toggleModal() {
    setModalOpen((prev) => !prev);
    if (isModalOpen) {
      setVisibleTags(tagKeys.slice(0, maxTagsOver ? tagKeys.length : maxTags));
    } else {
      setVisibleTags(tagKeys.slice(0, tagKeys.length));
    }
  };

  function handleOnTagClick(tag: string) {
    if (activeTags.includes(tag)) {
      setActiveTags((prev) => prev.filter((activeTag) => activeTag !== tag));
    } else {
      setActiveTags((prev) => [...prev, tag]);
    }
  };

  return (
    <div className={styles.tags}>
      {visibleTags.map((tag, index) => (
        <Tag
          key={tag}
          tag={tag}
          count={tagValues[index]}
          onTagClick={() => {
            handleOnTagClick(tag);
          }}
          className={
            activeTags.includes(tag) ? joinClasses(styles, ["activeTag", "tag"]) : styles.tag
          }
        />
      ))}
      <button
        onClick={toggleModal}
        className={styles.toggleButton}
      >
        {isModalOpen ? 'Hide ' : 'Show '}
        {maxTagsOver ? 0 : tagLength - maxTags} tags
      </button>
    </div>
  );
};

export default TagComponent;
