import React from 'react';

interface ButtonProps {
  title?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  title,
  className,
  onClick,
  disabled,
  children,
}) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
    aria-label='button'
    type='button'
  >
    {children || title}
  </button>
);

export default Button;
