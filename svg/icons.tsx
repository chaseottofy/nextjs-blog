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