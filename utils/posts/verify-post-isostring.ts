import { Post } from 'contentlayer/generated';

function isValidISODateString(dateString: string): boolean {
  const isoDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?Z$/;

  if (!isoDateRegex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

const verifyPostDates = (posts: Post[]): void => {
  posts.forEach((post: Post) => {
    if (!isValidISODateString(post.date)) {
      throw new Error(`Invalid date for post ${post._raw.flattenedPath}`);
    }
  });
};

export default verifyPostDates;
