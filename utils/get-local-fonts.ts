import localFont from 'next/font/local';

export const NeueMontreal = localFont({
  src: [
    {
      path: '../public/NeueMontreal-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/NeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/NeueMontreal-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: false,
  variable: '--neue',
  fallback: ['system-ui', 'sans-serif'],
});
export const BasementExpanded = localFont({
  src: [
    {
      path: '../public/Basement-expanded.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'block', // No other font matches its weird height, so block it
  variable: '--basement-expanded',
  fallback: ['Georgia', 'system-ui', 'sans-serif'],
  preload: false,
});
// export const BasementBlack = localFont({
//   src: [
//     {
//       path: '../public/Basement-black.woff2',
//       weight: '800',
//       style: 'normal',
//     },
//   ],
//   display: 'swap',
//   variable: '--basement-black',
//   fallback: ['Georgia', 'system-ui', 'sans-serif'],
//   preload: false,
// });