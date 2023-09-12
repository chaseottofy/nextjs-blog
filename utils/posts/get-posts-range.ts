import { Post } from 'contentlayer/generated';
import sortPosts from './sort-posts';
import { monthNames } from '@/data/date-constants';
import getDateArray from '@/utils/get-date-array';

/**
 * Receives an array of posts 
 * -> sorts them in ascending order by date
 * -> returns a string representing the range of dates of the posts
 * 
 * @param posts - array of posts@typeParam Post[]
 * 
 * @example
 * Same Year, Month, and Day 
 * - Only one date is displayed rather than Jan 1, 2021 - Jan 1, 2021
 * start: 2021-01-01, end: 2021-01-01 -> January 1, 2021
 * 
 * @example
 * Dates have same year and month, but different days
 * start: 2021-01-01, end: 2021-01-02 -> January 1 - 2, 2021
 * 
 * @example
 * Same Year
 * start: 2021-01-01, end: 2021-02-01 -> January 1 - February 1, 2021
 * 
 * @example
 * Dates do not fall in the same year, Display full date range
 * start: 2021-01-01, end: 2022-01-01 -> January 1, 2021 - January 1, 2022
 */

const getPostsRange = (posts: Post[]) => {
  if (posts.length === 0) return '';

  if (posts.length === 1) {
    return getDateArray(new Date(posts[0].date)).reduce((a, c, i) => {
      return i === 1 ? a = `${monthNames[c]}${a},` : `${a} ${c}`;
    }, '');
  }

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
