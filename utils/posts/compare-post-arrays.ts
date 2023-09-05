import { Post } from 'contentlayer/generated';

const postArraysAreSame = (a: Post[], b: Post[]) => {
  if (a.length !== b.length) return false;
  return a.every((post, index) => post.title === b[index].title);
};

export default postArraysAreSame;
