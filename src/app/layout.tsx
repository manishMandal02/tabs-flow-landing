import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

export const metadata: Metadata = {
  title: 'Manage Tabs Like a Pro!! | TabsFlow',
  description: 'Manage Tabs Like a Pro!!'
};

import type { ReactNode } from 'react';
import HeaderNav from '@/components/header-nav';
import Footer from '@/components/footer';

const poppins = Poppins({
  subsets: ['latin-ext', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} overflow-x-hidden overflow-y-auto relative h-screen w-screen`}>
        {children}
      </body>
    </html>
  );
}
