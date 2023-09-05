import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { postParams, MetadataProps } from 'models/interfaces';
import formatTags from 'utils/posts/format-tags';
import formatTag from 'utils/posts/format-tag';
import PostList from 'components/PostList/Post-list';
import styles from './page.module.css';

async function getPostsFromSlug(params: postParams) {
  const formattedSlug = formatTag(params.slug);
  const posts = allPosts.find((post) => {
    const postTags = formatTags(post.tags);
    return postTags.includes(formattedSlug);
  });

  return posts;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const formattedSlug = formatTag(params.slug);
  const posts = await getPostsFromSlug(params);
  if (!posts) {
    return {
      title: '404',
    };
  }

  return {
    title: `posts tagged: ${formattedSlug}`,
    description: `posts tagged: ${formattedSlug}`,
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
        <h1 className={styles.title}>
          #
          {params.slug}
        </h1>
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
