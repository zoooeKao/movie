import type { Metadata } from 'next';
import { WatchListProvider } from '@/contexts/watch-list-provider';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '電影數據庫',
  description: '探索電影世界，建立您的專屬待看清單',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <WatchListProvider>
          <div className="bg-background min-h-screen">
            <Header />
            <Toaster />
            <main>{children}</main>
          </div>
        </WatchListProvider>
      </body>
    </html>
  );
}
