import { Post } from "contentlayer/generated";
import getActivePosts from './get-active-posts';

/**
 * 
 * @param direction - 'asc' or 'desc'
 * @param featured - if true, ensure that featured posts are first
 * @returns sorted 'asc' or 'desc' array of posts
 */
const getPostsSorted = (direction: string, featured?: boolean) => {
  return getActivePosts().sort((a: Post, b: Post) => {
    const Adate = new Date(a.date);
    const Bdate = new Date(b.date);

    if (featured) {
      if (a.isFeatured && !b.isFeatured) {
        return -1;
      }
      if (!a.isFeatured && b.isFeatured) {
        return 1;
      }
    }

    return direction === 'asc'
      ? Adate.getTime() - Bdate.getTime()
      : Bdate.getTime() - Adate.getTime();
  });
};

export default getPostsSorted;