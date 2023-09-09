'use client';

import { useMemo } from 'react';
import Button from 'components/Button/Button';
import { useTheme as useNextTheme } from 'next-themes';

interface ThemeToggleProps {
  className?: string;
  children?: React.ReactNode;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  children,
}) => {
  const { theme, setTheme } = useNextTheme();
  const isDark = useMemo(() => theme === 'dark', [theme]);

  return (
    <Button
      className={className}
      title={isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
      onClick={() => {
        const updatedTheme = isDark ? 'light' : 'dark';
        setTheme(updatedTheme);
      }}
    >
      {children}
    </Button>
  );
};

export default ThemeToggle;
