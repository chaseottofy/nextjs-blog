'use client';
import { ThemeProvider } from 'next-themes';
const NextThemeProvider = ({ children }: { children: React.ReactNode; }) => {
  return (
    <ThemeProvider
      enableSystem={false}
      disableTransitionOnChange
      defaultTheme='dark'
    >
      {children}
    </ThemeProvider>
  )
};

export default NextThemeProvider;