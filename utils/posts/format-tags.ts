import formatTag from './format-tag';

const formatTags = (tags: string[]) => {
  tags[tags.length - 1] = formatTag(tags[tags.length - 1]);
  return tags;
};

export default formatTags;