"use client";

import { useState } from 'react';
import { Hero } from '../components/Hero/Hero';
import { PostList } from '../components/PostList/PostList';
import { Post } from 'contentlayer/generated';

interface TagCount {
  [key: string]: number;
}

const getTags = (posts: Post[]) => {
  const tags: TagCount = {};
  if (!posts) return tags;

  posts.forEach((post) => {
    for (const tag of post.tags) {
      const formatTag = tag.replace(/\r$/, '');
      tags[formatTag] = tags[formatTag] ? tags[formatTag] + 1 : 1;
    }
  });

  // sort tags by count and then alphabetically if count is the same
  const sortedByCount = Object.fromEntries(Object.entries(tags).sort((a, b) => {
    return a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1];
  }));
  return sortedByCount;
  // const sortedTags: TagCount = {}; // sort tags by name
  // Object.keys(tags).sort().forEach((key) => {sortedTags[key] = tags[key];});
  // return sortedTags;
};

export default function Home({
  params
}) {
  const startPosts = params.startPosts;
  const [activePosts, setActivePosts] = useState(startPosts);

  return (
    <>
      <Hero
        activePosts={activePosts}
        setActivePosts={setActivePosts}
        startingActive={startPosts}
        tags={getTags(startPosts)}
      />
      <PostList
        activePosts={activePosts}
      />
    </>
  );
}
