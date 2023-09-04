"use client";

import {
  getMDXComponent,
} from 'next-contentlayer/hooks';

import "@code-hike/mdx/dist/index.css";


interface MDXProps {
  code: string;
}
export function MDXComponents({ code }: MDXProps) {
  const Content = getMDXComponent(code);
  return (
    <>
      <Content />
    </>
  );
};