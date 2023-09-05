import { memo } from 'react';
import { Post } from 'contentlayer/generated';
import Image from 'next/image';
import imagePlaceholders from '../../data/image-placeholders';

const PostCardImage: React.FC<{ post: Post; }> = memo(({ post }) => {
  const placeholderImageSrc = imagePlaceholders[post.slugAsParams];

  return (
    <Image
      src={post?.banner ? post.banner : placeholderImageSrc}
      placeholder={placeholderImageSrc}
      alt={post.title}
      fill
      loading='eager'
      priority
      quality={50}
      sizes='(max-width:840px) 100vw, 60vw'
    />
  );
}, () => true);

export default PostCardImage;
