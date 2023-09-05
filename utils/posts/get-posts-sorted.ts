import { compareDesc, compareAsc, parseISO } from "date-fns";
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
    const Adate = parseISO(a.date);
    const Bdate = parseISO(b.date);

    if (featured) {
      if (a.isFeatured && !b.isFeatured) {
        return -1;
      }
      if (!a.isFeatured && b.isFeatured) {
        return 1;
      }
    }

    return direction === 'asc'
      ? compareAsc(Adate, Bdate)
      : compareDesc(Bdate, Adate);
  });
};

export default getPostsSorted;