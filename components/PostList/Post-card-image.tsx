import { memo } from 'react';
import { Post } from 'contentlayer/generated';
import Image from 'next/image';

import imagePlaceholders from '@/data/image-placeholders';

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
        objectPosition: 'center center',
        aspectRatio: '16/9',
        filter: 'contrast(1.3)',
      }}
      sizes='(max-width:840px) 100vw, 60vw'
      placeholder='blur'
      blurDataURL={placeholderImageSrc}
    />
  );
}, () => true);

export default PostCardImage;
