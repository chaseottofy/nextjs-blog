'use client';
import { ThemeProvider } from 'next-themes';
const NextThemeProvider = ({ children }: { children: React.ReactNode; }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default NextThemeProvider;