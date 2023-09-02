import '../styles/global.scss';
import styles from './layout.module.css';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import {
  NeueMontreal,
  BasementExpanded,
  MelodyMedium,
  BasementBlack
} from '../utils/get-local-fonts';
import ThemeProvider from '../providers/next-theme-provider';

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
      <head>
        <meta name="color-scheme" content="dark" />
        <link type="image/png" href="/favicon-32x32.png" rel="icon" sizes="32x32" />
        <title>Blog</title>
      </head>
      <body
        className={`${NeueMontreal.className} ${BasementExpanded.variable} ${MelodyMedium.variable} ${BasementBlack.variable}`}
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