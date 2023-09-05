import { defaultFieldOptions } from 'contentlayer/core';
import { Post } from 'contentlayer/generated';

interface TagCount {
  [key: string]: number;
}

type sortBy = 'count' | 'name';

const getPostTags = (posts: Post[], sortBy: sortBy) => {
  const tags: TagCount = {};
  if (!posts) return tags;

  for (const post of posts) {
    if (!post.tags) continue;
    for (let i = 0; i < post.tags.length; i++) {
      let currentTag = post.tags[i];
      if (i === post.tags.length - 1) {
        currentTag = post.tags[i].replace(/\r$/, '');
      }
      tags[currentTag] = tags[currentTag] ? tags[currentTag] + 1 : 1;
    }
  }

  return Object.fromEntries(Object.entries(tags).sort((a, b) => {
    if (sortBy === 'count') {
      return a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1];
    } else {
      return a[0].localeCompare(b[0]);
    }
  }));
};

export default getPostTags;