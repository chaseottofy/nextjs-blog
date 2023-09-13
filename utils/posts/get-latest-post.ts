import getPostsSorted from './get-posts-sorted';

const getLatestPost = () => {
  return `/posts/${getPostsSorted('desc')[0].slugAsParams}`;
};

export default getLatestPost;
