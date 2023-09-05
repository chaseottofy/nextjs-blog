import React from 'react';

import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Post } from 'contentlayer/generated';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import styles from './Post-list.module.css';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => (
  <Link
    href={`/posts/${post.slugAsParams}`}
    className={styles.linkWrapper}
  >
    <div className={styles.postCard}>
      <div className={styles.col1}>
        {
          featured ? (
            <div className={styles.featuredImage}>
              <Image
                src={post?.banner as string || '/images/placeholder.webp'}
                alt={post.title}
                width={1920}
                height={833}
                loading='eager'
                priority
                quality={80}
              />
            </div>
          ) : (
            <div className={styles.subCol}>
              <h2>{post.title}</h2>
              <span className={styles.subExcerpt}>
                {
                  post.excerpt.length > 140
                    ? `${post.excerpt.slice(0, 140)}...`
                    : post.excerpt
                }
              </span>
              <div className={styles.subColTags}>
                {
                  post.tags.map((tag) => (
                    <span
                      key={nanoid(10)}
                      className={styles.tag}
                    >
                      #
                      {tag}
                      &nbsp;
                    </span>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>

      <div className={styles.col2}>
        {
          featured ? (
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
                      <time dateTime={post.date}>
                        {format(parseISO(post.date), 'MM.dd.yy')}
                      </time>
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.featuredRightBottom}>
                <div>
                  <h2>{post.title}</h2>
                  <p>
                    {
                      post.excerpt.length > 100 ? `${post.excerpt.slice(0, 100)}...` : post.excerpt
                    }
                  </p>
                </div>
                <div className={styles.featuredTags}>
                  {
                    post.tags.map((tag, index) => (
                      index <= 2 && (
                        <span key={nanoid(10)} className={styles.tag}>
                          #
                          {tag}
                          &nbsp;
                        </span>
                      )
                    ))
                  }
                </div>
              </div>
            </div>

          ) : (

            <div className={styles.lowerInfo}>
              <div className={styles.lowerInfoLeft}>
                <div className={styles.lowerInfoCol}>
                  <span>DATE</span>
                  <span>
                    <time dateTime={post.date}>
                      {format(parseISO(post.date), 'MM.dd.yy')}
                    </time>
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
          )
        }
      </div>
    </div>
  </Link>
);

interface PostListProps {
  activePosts: Post[];
}

const PostList: React.FC<PostListProps> = ({ activePosts }) => (
  <div className={styles.wrapper}>
    {
      activePosts?.length >= 1 ? (activePosts.map((post: Post) => (
        <PostCard
          key={nanoid(10)}
          post={post}
          featured={post.isFeatured}
        />
      ))) : (
        <div className={styles.noPosts}>
          <h3>no posts found</h3>
        </div>
      )
    }
  </div>
);

export default PostList;
