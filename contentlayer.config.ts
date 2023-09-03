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
    authorLink: {
      type: 'string',
      description: 'The link to the author of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The description of the post',
      required: true,
    },
    banner: {
      type: 'string',
      description: 'Link to post banner image',
      required: false,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'The tags of the post',
      required: true
    },
    isFeatured: {
      type: 'boolean',
      description: 'Force the post to be featured',
      required: false,
    },
    isArchived: {
      type: 'boolean',
      description: 'Force the post to be archived',
      required: false,
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
