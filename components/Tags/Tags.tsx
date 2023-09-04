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

const arrowIcon = () => {
  return (
    <>
      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
    </>
  );
};

const TagComponent: React.FC<TagProps> = ({ setActivePosts, activePosts, startingActive, tags }) => {
  const [tagKeys, tagValues] = [Object.keys(tags), Object.values(tags)];
  const tagLength = tagKeys.length;
  // const { width: windowSize } = {width: 1000};
  const { width: windowSize } = useWindowDimensions();
  const maxTags = Math.floor(windowSize / 100) || 12;
  const maxTagsOver = maxTags > tagKeys.length;

  const hasMounted = useHasMounted();
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [visibleTags, setVisibleTags] = useState<string[]>(tagKeys.slice(0, maxTagsOver ? tagKeys.length : maxTags));

  useEffect(() => {
    handleSetVisibleTags();
  }, [windowSize]);

  useEffect(() => {
    handleUpdateActivePostTags();
  }, [activeTags]);

  function handleUpdateActivePostTags() {
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
  }

  function handleSetVisibleTags() {
    if (!hasMounted) return;
    setModalOpen(false); // force close modal to recalculate visible tag #
    setVisibleTags(tagKeys.slice(0, maxTagsOver ? tagKeys.length : maxTags));
  }

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

  function handleResetTags() {
    setActiveTags([]);
  }

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
        className={
          isModalOpen ? joinClasses(styles, ["toggleButton", "activeToggle"]) : styles.toggleButton
        }
      >
        <span>
          {isModalOpen ? 'Hide ' : 'Show '}
          {maxTagsOver ? 0 : tagLength - maxTags} tags
        </span>
        <span>{arrowIcon()}</span>
      </button>
      {
        activeTags.length >= 1 && (
          <button
            className={styles.clearButton}
            onClick={handleResetTags}
          >
            reset
          </button>
        )
      }
    </div>
  );
};

export default TagComponent;
