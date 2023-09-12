import BackLink from '@/components/BackLink/Back-link';
import OverlayNoise from '@/components/Overlay/Overlay-noise';
import PostList from '@/components/PostList/Post-list';
import RelatedTags from '@/components/Tags/Related/Related-tags';
import { Post } from 'contentlayer/generated';
import { MetadataProps, postParams } from '@/models/interfaces';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import getDateParsed from '@/utils/get-date-parsed';
import formatTag from '@/utils/posts/format-tag';
import getActivePosts from '@/utils/posts/get-active-posts';
import getPostsRange from '@/utils/posts/get-posts-range';

import styles from './page.module.css';

interface TagLayoutProps {
  posts: Post[] | [];
  tagList: Set<string>;
}

async function getPostsFromSlug(params: postParams): Promise<TagLayoutProps> {
  const tagList = new Set<string>();
  const formattedSlug = formatTag(params.slug);

  const posts = getActivePosts().filter((post) => {
    const postTags = post.tags;
    postTags[postTags.length - 1] = postTags[postTags.length - 1].replace(/\r$/, '');

    const formattedHasSlug = postTags.includes(formattedSlug);
    if (formattedHasSlug) {
      postTags.forEach((tag) => tagList.add(tag));
      return true;
    }
    return false;
  });

  if (!posts) {
    return {
      posts: [],
      tagList: new Set(),
    };
  }

  return { posts, tagList };
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const formattedSlug = formatTag(params.slug);

  if (!formattedSlug) {
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
  const { posts, tagList } = await getPostsFromSlug(params) as TagLayoutProps;
  const postsLength = posts.length;
  if (postsLength === 0) {
    notFound();
  }

  // remove current tag from related tags
  tagList.delete(formatTag(params.slug));
  // handle case where post only has one tag
  const relatedTags = tagList.size > 0 ? Array.from(tagList) : [];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <OverlayNoise />

        <div className={styles.topMeta}>
          <span>
            {`${postsLength} ${postsLength === 1 ? 'post' : 'posts'}`}
            {': '}
            &nbsp;
            {
              postsLength > 1 ? (
                <>
                  {getPostsRange(posts)}
                </>
              ) : (
                <>
                  {getDateParsed(posts[0].date, 'LLLL d, yyyy')}
                </>
              )
            }
          </span>
        </div>

        <div className={styles.top}>
          <BackLink />
          <h1 className={styles.title}>
            #
            {params.slug}
          </h1>
        </div>

        <div className={styles.bottom}>
          {
            relatedTags.length > 0 && (
              <RelatedTags
                relatedTags={relatedTags as string[]}
                tagLabel='Related Tags: '
              />
            )
          }
        </div>

      </div>
      <article className={styles.content}>
        <ul className={styles.contentList}>
          <PostList
            activePosts={posts}
            activeOff
          />
        </ul>
      </article>
    </div>
  );
};

export default TagLayout;
