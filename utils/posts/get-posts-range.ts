import { Post } from 'contentlayer/generated';
import sortPosts from './sort-posts';
import { monthNames } from 'data/date-constants';
import getDateArray from 'utils/get-date-array';

const getPostsRange = (posts: Post[]) => {
  const sortedPosts = sortPosts(posts, 'asc', false);
  const firstPost = sortedPosts[0];
  const lastPost = sortedPosts[sortedPosts.length - 1];
  const firstPostDateObj = new Date(firstPost.date);
  const lastPostDateObj = new Date(lastPost.date);
  const [firstPostDay, firstPostMonth, firstPostYear] = getDateArray(firstPostDateObj);
  const [lastPostDay, lastPostMonth, lastPostYear] = getDateArray(lastPostDateObj);

  if (firstPostYear === lastPostYear) {
    if (firstPostMonth === lastPostMonth) {
      if (firstPostDay === lastPostDay) {
        return `${monthNames[firstPostMonth - 1]} ${firstPostDay}, ${firstPostYear}`;
      }
      return `${monthNames[firstPostMonth - 1]} ${firstPostDay} - ${lastPostDay}, ${firstPostYear}`;
    }
    return `${monthNames[firstPostMonth - 1]} ${firstPostDay} - ${monthNames[lastPostMonth - 1]} ${lastPostDay}, ${firstPostYear}`;
  } else {
    return `${monthNames[firstPostMonth - 1]} ${firstPostDay}, ${firstPostYear} - ${monthNames[lastPostMonth - 1]} ${lastPostDay}, ${lastPostYear}`;
  }
};

export default getPostsRange;
