'use client';

import { allPosts } from 'contentlayer/generated';
import { SubHeader } from 'components/SubHeader/SubHeader';
import {
  getMDXComponent,
} from 'next-contentlayer/hooks';
import "@code-hike/mdx/dist/index.css";
import styles from './page.module.css';

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateStaticPaths = async () => {
  const paths = await generateStaticParams();
  return {
    paths,
    fallback: false,
  };
};

export const generateMetadata = ({ params }: { params: { slug: string; }; }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return {
    title: post.title.length > 10 ? post.title.substring(0, 10) + "..." : post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author, url: post.authorLink }],
  };
};

// export const generateMetadata = ({ params }: { params: { slug: string; }; }) => {
//   const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
//   if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
//   return { 
//     title: post.title 
//   };
// };

const PostLayout = ({ params }: { params: { slug: string; }; }) => {
  const post = allPosts.find((post) => {
    return post._raw.flattenedPath === params.slug;
  });
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  const Content = getMDXComponent(post.body.code);

  return (
    <div className={styles.page}>
      <SubHeader
        title={post.title}
        date={post.date}
        author={post.author}
        tags={post.tags}
      />
      <article className={styles.article}>
        <div className={styles.content}>
          <Content />
        </div>
      </article>
    </div>
  );
};

export default PostLayout;
