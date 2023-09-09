import { Post } from 'contentlayer/generated';
import sortPosts from './sort-posts';
import getDateParsed from 'utils/get-date-parsed';
import { monthNames } from 'data/date-constants';
import getDateArray from 'utils/get-date-array';

const getPostsRange = (posts: Post[]) => {
  const sortedPosts = sortPosts(posts, 'asc', false);
  const firstPost = sortedPosts[0];
  const lastPost = sortedPosts[sortedPosts.length - 1];
  const format = 'LLLL d, yyyy';

  const firstPostDateObj = new Date(firstPost.date);
  const lastPostDateObj = new Date(lastPost.date);

  /*
  */
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


  // const firstPostDate = getDateParsed(firstPost.date, format);
  // const lastPostDate = getDateParsed(lastPost.date, format);
  // // console.log(firstPost.date)

  // if (lastPostDate.slice(-4) === firstPostDate.slice(-4)) {
  //   // if (lastPostDate.slice(0, 3))
  //   /*
  //   if (lastPostDate.slice(0, 3) === firstPostDate.slice(0, 3)) {
  //     return `${firstPostDate.slice(0, -6)} - ${lastPostDate.slice(5)} ${lastPostDate.slice(0, 3)}`;
  //   }

  //   */
  //   // console.log(lastPostDate.slice(0, 3) === 'Aug')
  //   return `${firstPostDate.slice(0, -6)} - ${lastPostDate}`;
  // }

  // return `${firstPostDate} - ${lastPostDate}`;
};

export default getPostsRange;
