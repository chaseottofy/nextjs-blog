import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { remarkCodeHike } from '@code-hike/mdx';

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    author: {
      type: 'string',
      description: 'The author of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the post',
      required: true
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
    coverImage: {
      type: 'string',
      resolve: (doc) => `/images/${doc._raw.flattenedPath}/cover.webp`,
    }
  }
}));

export default makeSource(() => ({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkCodeHike],
  },
}));
