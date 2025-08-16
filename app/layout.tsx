import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CourseProvider } from '@/contexts/CourseContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { Toaster } from 'sonner';
import ReduxProvider from './ReduxProvider';


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
          <CourseProvider>
            <ProgressProvider>
         
              {children}
            </ProgressProvider>
          </CourseProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}