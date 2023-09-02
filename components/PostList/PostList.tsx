import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import styles from './PostList.module.css';
import getPostsSorted from 'utils/get-posts-sorted';
import Image from 'next/image';

const PostCard = ({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) => {
  return (
    <Link
      href={`/posts/${post._raw.flattenedPath}`}
      className={styles.linkWrapper}
    >
      <div className={styles.postCard}>
        <div className={styles.col1}>
          {
            featured ? (
              <div className={styles.featuredImage}>
                <Image
                  src={`/images/${post._raw.flattenedPath}.webp`}
                  alt={post.title}
                  width={1920}
                  height={833}
                />
              </div>
            ) : (
              <div className={styles.subCol}>
                <h2>{post.title}</h2>
                <span>{
                  post.excerpt.length > 140
                    ? post.excerpt.slice(0, 140) + '...'
                    : post.excerpt
                }</span>
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

                    <div className={styles.featuredInfoCol}>
                      <span>Views</span>
                      <span>{post.views}</span>
                    </div>

                  </div>
                </div>

                <div className={styles.featuredRightBottom}>
                  <div>
                    <h2>{post.title}</h2>
                    <p>{
                      post.excerpt.length > 100 ? post.excerpt.slice(0, 100) + '...' : post.excerpt
                    }</p>
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
                    <span>VIEWS</span>
                    <span>{post.views}</span>
                  </div>
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
};

export const PostList = () => {
  const posts = getPostsSorted('asc');

  return (
    <div className={styles.wrapper}>
      {
        posts.map((post: Post, index) => (
          <PostCard
            key={post._raw.flattenedPath}
            post={post}
            featured={index === 0}
          />
        ))
      }
    </div>
  );
};
