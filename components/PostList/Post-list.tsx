import React from 'react';
import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import { nanoid } from 'nanoid';
import joinClasses from 'utils/join-classes';
import styles from './Post-list.module.css';
import TagList from './Post-tag-list';
import PostCardImage from './Post-card-image';
import getDateParsed from '../../utils/get-date-parsed';

interface PostCardProps {
  post: Post;
}

interface FeaturedPostCardProps {
  post: Post;
  featuredImage: React.ReactNode;
}

interface PostListProps {
  activePosts: Post[];
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post, featuredImage }) => {
  const hueRotate = post?.bannerHueRotate ? post.bannerHueRotate : 0;
  const postDateFormatted = getDateParsed(post.date, 'MM.dd.yy');
  const postExcerptFormatted = post.excerpt.length > 100
    ? `${post.excerpt.slice(0, 100)}...`
    : post.excerpt;

  return (
    <Link
      href={`/posts/${post.slugAsParams}`}
      className={styles.linkWrapper}
    >
      <div className={joinClasses(styles, ['postCard', 'featuredPostCard'])}>
        <div className={styles.col1}>
          <svg className={styles.grad}>
            <filter id='grainy' x='0' y='0' width='100%' height='100%'>
              <feTurbulence type='fractalNoise' baseFrequency='.537' />
              <feColorMatrix type='saturate' values='0' />
              <feBlend in='SourceGraphic' mode='multiply' />
            </filter>
          </svg>
          <div className={styles.featuredImageOverlay}></div>
          <div
            className={styles.featuredImage}
            style={{
              filter: `hue-rotate(${hueRotate})`,
            }}
          >
            {featuredImage}
          </div>
        </div>

        <div className={styles.col2}>
          <div className={styles.featuredRightWrapper}>
            <div className={styles.featuredRightTop}>
              <div className={styles.featuredInfo}>
                <div className={styles.featuredInfoCol}>
                  <span>AUTHOR</span>
                  <span>{post.author}</span>
                </div>
                <div className={styles.featuredInfoCol}>
                  <span>DATE</span>
                  <span>
                    <time dateTime={post.date}>{postDateFormatted}</time>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.featuredRightBottom}>
              <div>
                <h2>{post.title}</h2>
                <p>{postExcerptFormatted}</p>
              </div>
              <TagList
                tags={post.tags}
                wrapperCName={styles.featuredTags}
                tagCName={styles.tag}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const postDateFormatted = getDateParsed(post.date, 'MM.dd.yy');
  const postExcerptFormatted = post.excerpt.length > 140
    ? `${post.excerpt.slice(0, 140)}...`
    : post.excerpt;

  return (
    <Link
      href={`/posts/${post.slugAsParams}`}
      className={styles.linkWrapper}
    >
      <div className={styles.postCard}>
        <div className={styles.col1}>
          <div className={styles.subCol}>
            <h2>{post.title}</h2>
            <span className={styles.subExcerpt}>{postExcerptFormatted}</span>
            <TagList
              tags={post.tags}
              wrapperCName={styles.subColTags}
              tagCName={styles.tag}
            />
          </div>
        </div>

        <div className={styles.col2}>
          <div className={styles.lowerInfo}>
            <div className={styles.lowerInfoLeft}>
              <div className={styles.lowerInfoCol}>
                <span>DATE</span>
                <span>
                  <time dateTime={post.date}>{postDateFormatted}</time>
                </span>
              </div>
              <div className={styles.lowerInfoCol}>
                <span>AUTHOR</span>
                <span>{post.author}</span>
              </div>
            </div>

            <div className={styles.lowerInfoRight}>
              <div className={styles.lowerInfoCol}>
                <span>read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PostList: React.FC<PostListProps> = ({ activePosts }) => {
  return (
    <div className={styles.wrapper}>
      {
        activePosts?.length >= 1 ? (activePosts.map((post: Post) => {
          return (
            post.isFeatured
              ? (
                <FeaturedPostCard
                  key={nanoid(10)}
                  post={post}
                  // memoized (will not re-render if props don't change)
                  featuredImage={<PostCardImage post={post} />}
                />
              )
              : (<PostCard key={nanoid(10)} post={post} />)
          );
        })) : (
          <div className={styles.noPosts}>
            <h3>no posts found</h3>
          </div>
        )
      }
    </div>
  );
};

export default PostList;
