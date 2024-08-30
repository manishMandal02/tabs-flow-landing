import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Manage Tabs Like a Pro!! | TabsFlow',
  description: 'Manage Tabs Like a Pro!!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
