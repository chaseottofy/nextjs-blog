import React from 'react';

interface ButtonProps {
  title?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  title = 'Button',
  className,
  onClick,
  disabled = false,
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
