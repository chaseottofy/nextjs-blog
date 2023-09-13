import getPostsSorted from './get-posts-sorted';

const getLatestPost = () => {
  const sortedPosts = getPostsSorted('desc');
  console.log('sortedPosts', sortedPosts)
  return `/posts/${getPostsSorted('desc')[0].slugAsParams}`;
};

export default getLatestPost;
