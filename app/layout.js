import './globals.css';
import StyledComponentsRegistry from '@/lib/AntRegistry';
import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/fonts.css';
import { Merriweather } from 'next/font/google';

const publicSans = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'Brag Zone',
  description: 'Own your glory',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={publicSans.className}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
