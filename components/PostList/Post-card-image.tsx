import { memo } from 'react';
import Image from 'next/image';
import { placeholderImageSrc } from 'data/constants';
import { Post } from 'contentlayer/generated';
// import { shimmer, toBase64 } from 'utils/image-placeholders';

const PostCardImage: React.FC<{ post: Post; }> = memo(({ post }) => (
  <Image
    src={post?.banner ? post.banner : placeholderImageSrc}
    alt={post.title}
    width={1200}
    height={521}
    loading='eager'
    // placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 521))}`}
    priority
    quality={80}
  />
), () => true);

export default PostCardImage;
