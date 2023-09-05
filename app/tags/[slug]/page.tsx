// import { allPosts } from 'contentlayer/generated';
// import { SubHeader } from 'components/SubHeader/Sub-header';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { MDXComponents } from 'components/MDX/MDX-components';
// import { postParams, MetadataProps } from 'models/interfaces';
// import { nanoid } from 'nanoid'

import styles from './page.module.css';

function TagLayout({ params }: { params: { slug: string; }; }) {
  // const getPostsOfTag = () => {
  //   const posts = getActivePosts();
  //   const postsOfTag = [];
  //   for (let post of posts) {
  //     for (let tag of post.tags) {
  //       if (tag.trim() === params.slug) {
  //         postsOfTag.push(post);
  //       }
  //     }
  //   }
  //   return postsOfTag;
  // };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{params.slug}</h1>
    </div>
  );
}

export default TagLayout;
