import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { postParams, MetadataProps } from '@/models/interfaces';
import buildHierarchy from '@/utils/build-toc';
import TableOfContents from '@/components/Toc/Toc';
import SubHeader from '@/components/SubHeader/Sub-header';
import MDXConfig from '@/components/Mdx-comp';
import styles from './page.module.css';

async function getPostFromSlug(params: postParams) {
  const post = allPosts.find((post) => {
    return post.slugAsParams === params.slug;
  });
  if (!post) {
    return;
  }
  return post;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const post = await getPostFromSlug(params);

  if (!post) {
    return {
      title: '404',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [
      {
        name: post.author,
        url: post.authorLink,
      },
    ],
  };
}

const PostLayout = async ({ params }: MetadataProps) => {
  const post = await getPostFromSlug(params);

  if (!post) {
    notFound();
  }
  const toc = buildHierarchy(post.body.raw);
  
  return (
    <div className={styles.page}>
      <SubHeader
        title={post.title}
        date={post.date}
        author={post.author}
        tags={post.tags}
      />
      <article className={styles.article}>
        {Object.keys(toc).length > 0 && (
          <TableOfContents titles={toc} />
        )}
        <div className={styles.content}>
          <MDXConfig code={post.body.code} />
        </div>
      </article>
    </div>
  );
};

export default PostLayout;
