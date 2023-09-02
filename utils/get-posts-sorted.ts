import { compareDesc } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

const getPostsSorted = (direction: string) => {
  return allPosts.sort((a: Post, b: Post) => {
    return direction === 'asc'
      ? compareDesc(new Date(a.date), new Date(b.date))
      : compareDesc(new Date(b.date), new Date(a.date));
  });
};

export default getPostsSorted;