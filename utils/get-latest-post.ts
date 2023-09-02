import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const getLatestPost = () => {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  return `/posts/${posts[0]._raw.flattenedPath}`;
};

export default getLatestPost;