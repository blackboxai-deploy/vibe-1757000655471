import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daily Planner - Stay Organized',
  description: 'A simple and effective daily planner to help you track tasks and stay productive.',
  keywords: ['planner', 'tasks', 'productivity', 'daily planner', 'todo'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="daily-planner-theme">
          <div id="root">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}