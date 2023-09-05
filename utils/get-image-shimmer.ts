export const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#0077ad" />
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#gradient)" />
    <defs>
      <linearGradient id="gradient">
        <stop offset="0.2" stop-color="#0077ad">
          <animate attributeName="offset" values="-2; 1" dur="2.2s" repeatCount="indefinite" />
        </stop>
        <stop offset="0.5" stop-color="#1f8db9">
          <animate attributeName="offset" values="-1.5; 1.5" dur="2.2s" repeatCount="indefinite" />
        </stop>
        <stop offset="0.8" stop-color="#0077ad">
          <animate attributeName="offset" values="-1; 2" dur="2.2s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
  </svg>
`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);