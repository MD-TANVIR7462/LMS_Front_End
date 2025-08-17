import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


import { Toaster } from 'sonner';
import ReduxProvider from './ReduxProvider';
import { ProgressProvider } from '@/contexts/ProgressContext';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LMS Platform - Learning Management System',
  description: 'A comprehensive learning management system for course creation and student learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" expand={false} />
        <ReduxProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}