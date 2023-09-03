import { allPosts, Post } from "contentlayer/generated";

const getActivePosts = () => {
  console.log('ran')
  return allPosts.filter((post: Post) => {
    return !post.isArchived;
  });
};

export default getActivePosts;
