import { Post } from "contentlayer/generated";

const sortPosts = (posts: Post[], direction:string, featured: boolean): Post[] => {
  return posts.sort((a: Post, b: Post) => {
    const Adate = new Date(a.date);
    const Bdate = new Date(b.date);

    if (featured) {
      if (a.isFeatured && !b.isFeatured) {
        return -1;
      }
      if (!a.isFeatured && b.isFeatured) {
        return 1;
      }
    }

    return direction === 'asc'
      ? Adate.getTime() - Bdate.getTime()
      : Bdate.getTime() - Adate.getTime();
  });
};

export default sortPosts;
