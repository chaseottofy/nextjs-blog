'use client';

import { useMemo } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

import joinClasses from '@/utils/join-classes';

import styles from './theme-toggle.module.css';

interface ThemeToggleInterface {
  hasMounted: boolean;
}

const ThemeToggle: React.FC<ThemeToggleInterface> = ({
  hasMounted,
}) => {
  const { theme, setTheme } = useNextTheme();
  const isDark = useMemo(() => theme === 'dark', [theme]);
  const labelTitle = `Toggle ${hasMounted && isDark ? 'light' : 'dark'} mode`;

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={styles.toggleContainer}>
      <label
        htmlFor='themeToggle'
        className={
          hasMounted && isDark
            ? joinClasses(styles, ['toggleLabel', 'checked'])
            : styles.toggleLabel
        }
        title={labelTitle}
        aria-label={labelTitle}
      >
        <input
          type='checkbox'
          id='themeToggle'
          checked={hasMounted && isDark}
          className={styles.hiddenCheckbox}
          onChange={() => {
            setTheme(isDark ? 'light' : 'dark');
          }}
        />
      </label>
    </div>
  );
};

export default ThemeToggle;
