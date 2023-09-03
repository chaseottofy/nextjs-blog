import '../styles/global.scss';
import styles from './layout.module.css';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import {
  NeueMontreal,
  BasementExpanded,
} from '../utils/get-local-fonts';
import ThemeProvider from '../providers/next-theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Nextjs blog example',
  keywords: 'nextjs, blog, react, react blog, nextjs blog',
  authors: [{ name: "Chase Ottofy", url: "https://chaseottofy.github.io/Portfolio/" }],
  icons: [
    {
      rel: 'icon',
      url: '/logo.svg',
      sizes: 'any',
      type: 'image/svg+xml'
      // url: '/favicon-32x32.png',
    }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${NeueMontreal.className} ${BasementExpanded.variable}`}
      >
        <ThemeProvider>
          <Header />
          <main className={styles.main}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}