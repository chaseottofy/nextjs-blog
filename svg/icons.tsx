import React from 'react';

export const ArrowIcon: React.FC = () => {
  return (
    <svg fill='none' height='24' shapeRendering='geometricPrecision' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' viewBox='0 0 24 24' width='24'><path d='M6 9l6 6 6-6' /></svg>
  );
};

export const CircleIcon: React.FC = () => {
  return (
    <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'><path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z' /></svg>
  );
};

export const GradientRef: React.FC = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        zIndex: -1,
        opacity: 0,
        visibility: 'hidden',
      }}
    >
      <filter id='grainy' x='0' y='0' width='100%' height='100%'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.65'
          numOctaves='3'
          stitchTiles='stitch'
        />
      </filter>
    </svg>
  );
};

export const Logo: React.FC = () => {
  return (
    <svg width='81' height='80' viewBox='0 0 81 80' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M40.9771 80C63.0687 80 80.9774 62.0914 80.9774 40C80.9773 17.9086 63.0685 -1.38069e-06 40.9769 -8.89459e-07C18.8853 -3.98224e-07 0.976602 17.9086 0.97665 40C0.976698 62.0914 18.8855 80 40.9771 80Z' fill='var(--primary1)'></path><path d='M41.1477 73.9297C59.7223 73.8962 74.6797 58.6603 74.5562 39.8995C74.4327 21.1387 59.275 5.95723 40.7005 5.99078C22.126 6.02432 7.16848 21.2602 7.29199 40.021C7.4155 58.7818 22.5732 73.9633 41.1477 73.9297Z' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path><path d='M41.1263 73.8359C51.0045 73.8136 58.9205 58.6285 58.8073 39.9192C58.694 21.2098 50.5943 6.06098 40.7161 6.08332C30.8379 6.10567 22.9219 21.2907 23.0352 40.0001C23.1484 58.7095 31.2481 73.8583 41.1263 73.8359Z' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path><path d='M7.11914 39.8867L74.719 39.5995' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path><path d='M9.5 27.5076L72.2542 27.2409' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path><path d='M18.0156 15.1169L63.6156 14.9232' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path><path d='M18.0078 64.7942L64.054 64.5984' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path><path d='M9.51172 52.4614L72.4352 52.1937' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path><path d='M65.7781 40.0175C45.4753 39.9779 40.9169 44.5589 40.9429 64.9808C40.9168 44.5435 36.3512 39.94 16.0638 39.9004C36.3666 39.94 40.925 35.359 40.899 14.9372C40.925 35.359 45.4905 39.9625 65.7781 40.0175Z' fill='#121212'></path><path d='M40.7773 6.15967L41.0645 73.7439' stroke='#121212' strokeWidth='2' strokeMiterlimit='10'></path></svg>
  );
};
