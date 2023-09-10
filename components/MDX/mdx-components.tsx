// @ts-ignore
// @eslint-
'use client';

// import * as React from 'react';
// import Image from 'next/image';
import React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import styles from './MDX-components.module.css';

interface MDXComponents {
  h1: React.FC;
  h2: React.FC;
  h3: React.FC;
  h4: React.FC;
  p: React.FC;
  pre: React.FC;
  code: React.FC;
  // Image: React.FC;
}

interface MDXComponentProps {
  className?: string;
  [x: string]: any;
}

const MDXComponents: MDXComponents = {
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
  // Image,
};

interface MDXProps {
  code: string;
}

const MDX: React.FC<MDXProps> = ({ code }) => {
  const Component = useMDXComponent(code);
  return (
    <div className={styles.mdx}>
      <Component components={
        MDXComponents as any
      }
      />
    </div>
  );
};

export default MDX;
