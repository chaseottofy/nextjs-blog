/**types and interfaces used more than once*/

export type postParams = {
  slug: string;
};

export type MetadataProps = {
  params: postParams;
};

export type NestedTitles = {
  [key: string]: null | NestedTitles;
};
