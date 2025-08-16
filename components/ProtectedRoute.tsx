'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from '@/components/ui/loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {

  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!user) {
  //       router.push('/login');
  //       return;
  //     }

  //     if (requiredRole && user.role !== requiredRole) {
  //       router.push(user.role === 'admin' ? '/admin' : '/courses');
  //       return;
  //     }
  //   }
  // }, [user, isLoading, router, requiredRole]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Loading size="lg" />
  //     </div>
  //   );
  // }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};