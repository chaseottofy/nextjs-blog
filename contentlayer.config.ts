import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { remarkCodeHike } from '@code-hike/mdx';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { 
      type: 'string', 
      required: true,
      description: 'The title of the post',
    },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    authorLink: {type: 'string',required: true},
    excerpt: {type: 'string',required: true},
    banner: {type: 'string',required: false},
    isFeatured: {type: 'boolean',required: false},
    isArchived: {type: 'boolean',required: false},
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: true
    },
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
