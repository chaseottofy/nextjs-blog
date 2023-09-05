// 'use client';

import { allPosts } from 'contentlayer/generated';
import { nanoid } from 'nanoid';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { postParams, MetadataProps } from 'models/interfaces';
import { Post } from 'contentlayer/generated';
// import PostList from '../../components/PostList/Post-list';
import PostList from 'components/PostList/Post-list';
import styles from './page.module.css';

async function getPostsFromSlug(params: postParams) {
  const formattedSlug = params.slug.replace(/\r$/, '');
  const posts = allPosts.find((post) => {
    const postTags = post.tags;
    // contentlayer's tag schema results in a trailing \r on the last tag
    postTags[postTags.length - 1] = postTags[postTags.length - 1].replace(/\r$/, '');
    return post.tags.includes(formattedSlug);
  });
  if (!posts) {
    return;
  }
  return posts;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const formattedSlug = params.slug.replace(/\r$/, '');
  const posts = await getPostsFromSlug(params);
  if (!posts) {
    return {
      title: '404',
    };
  }

  return {
    title: 'posts tagged: ' + formattedSlug,
    description: 'posts tagged: ' + formattedSlug,
  };
}

const TagLayout = async ({ params }: MetadataProps) => {
  const posts = await getPostsFromSlug(params);
  if (!posts) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{params.slug}</h1>
      </div>

      <div className={styles.content}>
        <ul className={styles.contentList}>
          <PostList
            activePosts={posts ? [posts] : []}
          />
        </ul>
      </div>
    </div>
  );
};

export default TagLayout;
