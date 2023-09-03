"use client";

import { useState } from 'react';
import { Hero } from '../components/Hero/Hero';
import { PostList } from '../components/PostList/PostList';
import { Post } from 'contentlayer/generated';
import getPostsSorted from 'utils/get-posts-sorted';

interface TagCount {
  [key: string]: number;
}

const getTags = (posts: Post[]) => {
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
