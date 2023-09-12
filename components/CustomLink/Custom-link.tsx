import Link from 'next/link';
import React from 'react';

interface LinkProps {
  href: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<LinkProps> = ({
  href,
  title,
  className,
  children,
}) => (
  <Link
    className={className}
    href={href}
    title={title}
    target='_blank'
    rel='noopener noreferrer'
  >
    {children}
  </Link>
);

export default CustomLink;
