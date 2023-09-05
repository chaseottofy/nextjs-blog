import getPostsSorted from './get-posts-sorted';

const getLatestPost = () => {
  return `/posts/${getPostsSorted('asc')[0].slugAsParams}`;
};

export default getLatestPost;
