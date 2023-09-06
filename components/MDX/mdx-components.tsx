'use client';

import React from 'react';
import {
  getMDXComponent,
} from 'next-contentlayer/hooks';
import '@code-hike/mdx/dist/index.css';

interface MDXProps {
  code: string;
}

const MDXComponents: React.FC<MDXProps> = ({ code }) => {
  const Content = getMDXComponent(code);
  return (
    <Content />
  );
};

export default MDXComponents;
