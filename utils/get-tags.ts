import getActivePosts from './get-active-posts';

interface TagCount {
  [key: string]: number;
}

const getTags = () => {
  const posts = getActivePosts();
  const tags: TagCount = {};

  posts.forEach((post) => {
    for (const tag of post.tags) {
      const formatTag = tag.trim().toLowerCase();
      tags[formatTag] = tags[formatTag] ? tags[formatTag] + 1 : 1;
    }
  });

  // sort tags by name
  const sortedTags: TagCount = {};
  Object.keys(tags).sort().forEach((key) => {
    sortedTags[key] = tags[key];
  });

  return sortedTags;
};


export default getTags;
