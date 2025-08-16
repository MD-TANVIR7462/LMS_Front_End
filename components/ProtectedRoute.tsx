'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loading } from '@/components/ui/loading';
import { useAppSelector } from '@/redux/features/hooks';
import { useCurrentUser } from '@/redux/features/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const router = useRouter();
  const user = useAppSelector(useCurrentUser);
  console.log(user,"protected")
  const isLoading = user === undefined; // or use a loading flag from Redux

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        router.push(user.role === 'admin' ? '/admin' : '/courses');
      }
    }
  }, [user, isLoading, router, requiredRole]);

  if (isLoading || !user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};
