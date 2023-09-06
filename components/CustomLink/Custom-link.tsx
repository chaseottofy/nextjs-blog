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
  <a
    className={className}
    href={href}
    title={title}
    rel='noopener noreferrer'
    target='_blank'
  >
    {children}
  </a>
);

export default CustomLink;
