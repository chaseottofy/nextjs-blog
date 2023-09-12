'use client';

import { useMemo, useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { useHasMounted } from 'hooks/use-has-mounted';
import styles from './theme-toggle.module.css';

const ThemeToggle: React.FC = () => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useNextTheme();
  const isDark = useMemo(() => theme === 'dark', [theme]);
  const labelTitle = useMemo(() => (
    isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode'
  ), [theme]);

  useEffect(() => {
    if (!hasMounted) {
      console.log({
        isDark: isDark,
        theme: theme,
        labelTitle: labelTitle,
      });
      return;
    }
  }, []);

  return (
    <div className={styles.toggleContainer}>
      <input
        type="checkbox"
        id="themeToggle"
        checked={!hasMounted ? true : isDark}
        className={styles.hiddenCheckbox}
        onChange={() => {
          setTheme(isDark ? 'light' : 'dark');
        }}
      />
      <label
        htmlFor="themeToggle"
        className={styles.toggleLabel}
        title={
          !hasMounted ? 'Toggle Light Mode' : labelTitle
        }
        aria-label={
          !hasMounted ? 'Toggle Light Mode' : labelTitle
        }
      />
    </div>
  );
};

export default ThemeToggle;
