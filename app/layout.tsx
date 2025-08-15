import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { CourseProvider } from '@/contexts/CourseContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { Sidebar } from '@/components/shared/Sidebar';
import { Toaster } from 'sonner';
import { Navigation } from '@/components/Navigation';

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
        <Toaster position="bottom-right" expand={false} />
        <AuthProvider>
          <CourseProvider>
            <ProgressProvider>
              <Navigation/>
              {children}
            </ProgressProvider>
          </CourseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}