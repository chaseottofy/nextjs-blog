import React from 'react';

interface LinkProps {
  href: string;
  title: string;
  className?: string; // This is made optional, you can remove the "?" if you want it to be required.
  children?: React.ReactNode; // To allow for a child element
}

const CustomLink: React.FC<LinkProps> = ({
  href, title, className, children,
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
