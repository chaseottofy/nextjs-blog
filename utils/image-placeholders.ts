export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#0070f3" offset="20%" />
      <stop stop-color="#0070f3" offset="50%" />
      <stop stop-color="#0761d1" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0761d1" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// create a function that converts a webp image to base64 format
// export const webpToBase64 = (url: string) => {
//   const res = await fetch(url);
//   const blob = await res.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       resolve(reader.result);
//     };
//     reader.onerror = reject;
//   });
// };
// export const webpToBase64 = async (url: string) => {
//   const res = await fetch(url);
//   const blob = await res.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       resolve(reader.result);
//     };
//     reader.onerror = reject;
//   });
// };