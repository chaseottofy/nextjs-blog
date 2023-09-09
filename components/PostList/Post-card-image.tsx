// import { memo, useState } from 'react';
import { memo } from 'react';
import { Post } from 'contentlayer/generated';
import imagePlaceholders from 'data/image-placeholders';
import Image from 'next/image';

const PostCardImage: React.FC<{ post: Post; }> = memo(({ post }) => {
  const placeholderImageSrc = imagePlaceholders[post.slugAsParams] || imagePlaceholders.default;
  return (
    <Image
      src={post?.banner ? post.banner : placeholderImageSrc}
      alt={post.title}
      fill
      quality={50}
      loading='eager'
      priority
      style={{
        objectFit: 'cover',
        aspectRatio: '16/9',
        filter: 'contrast(1.4)',
      }}
      sizes='(max-width:840px) 100vw, 60vw'
      placeholder='blur'
      blurDataURL={placeholderImageSrc}
    />
  );
}, () => true);

export default PostCardImage;
