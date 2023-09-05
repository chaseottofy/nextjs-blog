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
      fill={true}
      loading='eager'
      priority
      // quality={80}
    />
  );
}, () => true);

export default PostCardImage;
