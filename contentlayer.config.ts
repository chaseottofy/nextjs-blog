import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { remarkCodeHike } from '@code-hike/mdx';
/**
 * @remarks
 * Im on windows and keep seeing "may not work correctly with windows", but I have not had any issues.
 * Sometimes I have to restart the dev server to see changes, no real project breaking issues.
 * 
 * @param title - I have titles set up so that everything after '-' will be displayed as a smaller subtitle
 * see @/components/Sub-header.tsx
 * 
 * @param date - ISO date string: **If you do not want to use ISO** : 
 * ALL dates are parsed in ./utils/get-date-parsed.ts and can be changed there
 * 
 * @param authorLink - used for metaData in association with the author :
 * (link to twitter or something personal)
 * 
 * @param excerpt - used for metaData and for the post preview :
 * (I have it limited to 100 chars for home preview 
 * see @/components/Post-list.tsx
 * 
 * @param banner - path to banner image of post /images/posts/{banner}.webp

 * @param isFeatured - if true, the post will have its banner image displayed on the home page
 * @param isArchived - if true, the post will not be included in the build
 * 
 * @param tags - a list of tags to be used for filtering. One annoying thing is the last tag of
 * a post will have a '\r' character at the end of it. Something to be aware of when filtering.
 * Look at my examples for tags schema (tabs at beginning of line necessary)
 */
const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true, description: 'ISO string: "2023-08-06T11:30:30"' },
    author: { type: 'string', required: true },
    authorLink: { type: 'string', required: true, description: 'https://github.com/username' },
    excerpt: { type: 'string', required: true },
    banner: { type: 'string', required: false, description: '/images/posts/image-src.webp' },
    isFeatured: { type: 'boolean', required: false },
    isArchived: { type: 'boolean', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    coverImage: {
      type: 'string',
      resolve: (doc) => `/images/${doc._raw.flattenedPath}/cover.webp`,
    },
  }
}));

export default makeSource(() => ({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkCodeHike],
  },
}));
