'use client';

import { useState } from 'react';
import Hero from 'components/Hero/Hero';
import PostList from 'components/PostList/Post-list';
import { Post } from 'contentlayer/generated';
import getPostTags from 'utils/posts/get-post-tags';

interface HomeProps {
  params: {
    startPosts: Post[];
  };
}

const Home: React.FC<HomeProps> = ({
  params,
}) => {
  const { startPosts } = params;
  const [activePosts, setActivePosts] = useState(startPosts);

  return (
    <>
      <Hero
        activePosts={activePosts}
        setActivePosts={setActivePosts}
        startingActive={startPosts}
        tags={getPostTags(startPosts, 'count')}
      />
      <PostList
        activePosts={activePosts}
      />
    </>
  );
};

export default Home;
