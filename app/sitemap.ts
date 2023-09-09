import { BASE_URL } from 'data/constants';
import { MetadataRoute } from 'next';

const pages = [
  'posts',
  'tags',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: `${BASE_URL}/${page}`,
      lastModified: new Date(),
    })),
  ];
}
