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
  ]
});

export const MelodyMedium = localFont({
  src: '../public/BLMelody-Medium.woff2',
  variable: '--melody'
});
export const BasementExpanded = localFont({
  src: [
    {
      path: '../public/Basement-expanded.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--basement-expanded'
});
export const BasementBlack = localFont({
  src: [
    {
      path: '../public/Basement-black.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--basement-black'
});