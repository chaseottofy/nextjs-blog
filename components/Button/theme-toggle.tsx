'use client';

import { useMemo } from 'react';
import { useHasMounted } from 'hooks/use-has-mounted';
import { useTheme as useNextTheme } from 'next-themes';
import Button from 'components/Button/Button';

interface ThemeToggleProps {
  className?: string;
  children?: React.ReactNode;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  children,
}) => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useNextTheme();
  const isDark = useMemo(() => theme === 'dark', [theme]);

  if (!hasMounted) {
    return null;
  }

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
