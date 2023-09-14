'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

interface MDXComponentsInterface {
  h1: React.FC;
  h2: React.FC;
  h3: React.FC;
  h4: React.FC;
  p: React.FC;
  pre: React.FC;
  code: React.FC;
  div: React.FC;
  Image: React.FC<ImageProps>;
}

interface MDXComponentProps {
  className?: string;
  [x: string]: any;
}

const MDXComponents: MDXComponentsInterface = {
  h1: ({ className, ...props }: MDXComponentProps) => (
    <h1 className={className} {...props} />
  ),
  h2: ({ className, ...props }: MDXComponentProps) => (
    <h2 className={className} {...props} />
  ),
  h3: ({ className, ...props }: MDXComponentProps) => (
    <h3 className={className} {...props} />
  ),
  h4: ({ className, ...props }: MDXComponentProps) => (
    <h4 className={className} {...props} />
  ),
  p: ({ className, ...props }: MDXComponentProps) => (
    <p className={className} {...props} />
  ),
  pre: ({ className, ...props }: MDXComponentProps) => (
    <pre className={className} {...props} />
  ),
  code: ({ className, ...props }: MDXComponentProps) => (
    <code className={className} {...props} />
  ),
  div: ({ className, ...props }: MDXComponentProps) => (
    <div className={className} {...props} />
  ),
  Image: ({ className, ...props }: ImageProps) => (
    <Image className={className} {...props} />
  ),
};

interface MDXProps {
  code: string;
}

const MDXConfig: React.FC<MDXProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <Component components={MDXComponents as any} />
  );
};

export default MDXConfig;
