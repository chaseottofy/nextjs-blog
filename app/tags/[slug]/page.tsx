import styles from './page.module.css';
import Link from 'next/link';
import getActivePosts from 'utils/get-active-posts';

const TagLayout = ({ params }: { params: { slug: string; }; }) => {
  const getPostsOfTag = () => {
    const posts = getActivePosts();
    const postsOfTag = [];
    for (let post of posts) {
      for (let tag of post.tags) {
        if (tag.trim() === params.slug) {
          postsOfTag.push(post);
        }
      }
    }
    return postsOfTag;
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{params.slug}</h1>
      <div className={styles.posts}>
        {getPostsOfTag().map((post) => (
          <div key={post._raw.flattenedPath} className={styles.post}>
            <Link href={`/posts/${post._raw.flattenedPath}`}>
              <span>{post.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagLayout;