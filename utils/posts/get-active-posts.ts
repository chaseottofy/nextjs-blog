import { allPosts, Post } from "contentlayer/generated";

const getActivePosts = () => {
  return allPosts.filter((post: Post) => {
    return !post.isArchived;
  });
};

export default getActivePosts;
