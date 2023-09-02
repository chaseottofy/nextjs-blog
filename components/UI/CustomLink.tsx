interface LinkProps {
  href: string;
  title: string;
  className?: string;  // This is made optional, you can remove the "?" if you want it to be required.
  children?: React.ReactNode;  // To allow for a child element
}

const CustomLink: React.FC<LinkProps> = ({ href, title, className, children }) => {
  return (
    <a
      className={className}
      href={href}
      title={title}
      rel="noopener"
      target="_blank"
      role="link"
    >
      {children}
    </a>
  );
};

export default CustomLink;
