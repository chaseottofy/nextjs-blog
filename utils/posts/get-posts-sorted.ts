import getActivePosts from './get-active-posts';
import verifyPostDates from './verify-post-isostring';
import sortPosts from './sort-posts';

/**
 * 
 * @param direction - 'asc' or 'desc'
 * @param featured - if true, ensure that featured posts are first
 * @returns sorted 'asc' or 'desc' array of posts
 */
const getPostsSorted = (direction: string, featured?: boolean) => {
  const posts = getActivePosts();
  verifyPostDates(posts);
  return sortPosts(posts, direction, featured || false);
};

export default getPostsSorted;