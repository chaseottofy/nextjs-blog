import { memo } from 'react';
import Image from 'next/image';
import imagePlaceholders from '../../data/image-placeholders';
import { Post } from 'contentlayer/generated';

const PostCardImage: React.FC<{ post: Post; }> = memo(({ post }) => {
  const placeholderImageSrc = imagePlaceholders[post.slugAsParams];

  return (
    <>
      <Image
        src={post?.banner ? post.banner : placeholderImageSrc}
        placeholder={placeholderImageSrc}
        alt={post.title}
        width={1200}
        height={521}
        loading='eager'
        priority
        quality={80}
      />
    </>
  );
}, () => true);

export default PostCardImage;
