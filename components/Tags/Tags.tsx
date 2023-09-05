'use client';

import { useState, useEffect } from 'react';
import { Post } from 'contentlayer/generated';
import joinClasses from 'utils/join-classes';
import formatTags from 'utils/posts/format-tags';
import useWindowDimensions from 'hooks/use-width';
import { useHasMounted } from 'hooks/use-has-mounted';
import { nanoid } from 'nanoid';
import Tag from './Tag';
import styles from './Tags.module.css';
import { ArrowIcon } from '../../svg/icons';

interface TagProps {
  setActivePosts: (posts: Post[]) => void;
  activePosts: Post[];
  startingActive: Post[];
  tags: {
    [key: string]: number;
  };
}

interface TagProps {
  setActivePosts: (posts: Post[]) => void;
  activePosts: Post[];
  startingActive: Post[];
  tags: {
    [key: string]: number;
  };
}

// const comparePostArrays = (a: Post[], b: Post[]) => {

// }

const TagComponent: React.FC<TagProps> = ({
  setActivePosts, activePosts, startingActive, tags,
}) => {
  const [tagKeys, tagValues] = [Object.keys(tags), Object.values(tags)];
  const tagLength = tagKeys.length;
  const { width: windowSize } = useWindowDimensions();
  const maxTags = Math.floor(windowSize / 100) || 12;
  const maxTagsOver = maxTags > tagKeys.length;

  const hasMounted = useHasMounted();
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  // const [prevActivePosts, setPrevActivePosts] = useState<string[]>([]);
  // const [prevActivePosts, setPrevActivePosts] = useState<Post[]>(activePosts);
  const [visibleTags, setVisibleTags] = useState<string[]>(tagKeys.slice(
    0,
    maxTagsOver ? tagKeys.length : maxTags,
  ));

  useEffect(() => {
    handleSetVisibleTags();
  }, [windowSize]);

  useEffect(() => {
    handleUpdateActivePostTags();
    // console.log(visibleTags.length, tagLength)
  }, [activeTags]);

  function handleFilterPosts() {
    setActivePosts(startingActive.filter((post) => {
      const hasTags = post?.tags;
      if (!hasTags) return false;
      const postTags = formatTags(post.tags);
      return activeTags.every((activeTag) => postTags.includes(activeTag));
    }));
  }

  function handleUpdateActivePostTags() {
    if (!hasMounted) return;

    // if (postArraysAreSame(activePosts, prevActivePosts)) {
    //   // if
    //   // return;
    // }

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
    }

    // setPrevActivePosts(activePosts);
  }

  function handleSetVisibleTags() {
    if (!hasMounted) return;
    setModalOpen(false); // force close modal to recalculate visible tag #
    setVisibleTags(tagKeys.slice(0, maxTagsOver ? tagKeys.length : maxTags));
  }

  function toggleModal() {
    setModalOpen((prev) => !prev);
    if (isModalOpen) {
      setVisibleTags(tagKeys.slice(0, maxTagsOver ? tagKeys.length : maxTags));
    } else {
      setVisibleTags(tagKeys.slice(0, tagKeys.length));
    }
  }

  function handleOnTagClick(tag: string) {
    if (activeTags.includes(tag)) {
      setActiveTags((prev) => prev.filter((activeTag) => activeTag !== tag));
    } else {
      setActiveTags((prev) => [...prev, tag]);
    }
  }

  function handleResetTags() {
    setActiveTags([]);
  }

  return (
    <div className={styles.tags}>
      {visibleTags.map((tag, index) => (
        <Tag
          key={nanoid(10)}
          tag={tag}
          count={tagValues[index]}
          onTagClick={() => {
            handleOnTagClick(tag);
          }}
          tagClassName={
            activeTags.includes(tag) ? joinClasses(styles, ['activeTag', 'tag']) : styles.tag
          }
        />
      ))}
      <button
        onClick={toggleModal}
        type='button'
        className={
          isModalOpen
            ? joinClasses(styles, ['toggleButton', 'activeToggle'])
            : styles.toggleButton
        }
      >
        <span>
          {isModalOpen ? 'Hide ' : 'Show '}
          {maxTagsOver ? 0 : tagLength - maxTags}
          {' '}
          tags
        </span>
        <span><ArrowIcon /></span>
      </button>
      {
        activeTags.length > 0 && (
          <button
            type='button'
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
