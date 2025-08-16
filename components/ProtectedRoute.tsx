"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import { useAppSelector } from "@/redux/features/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
  fallbackRoute?: string; 
}

type User = {
  role: "admin" | "user";
} | null | undefined | Record<string, never>;

export const ProtectedRoute = ({
  children,
  requiredRole,
  fallbackRoute,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const userRaw = useAppSelector(useCurrentUser);
  const user: User = userRaw && typeof userRaw === "object" && "role" in userRaw
    ? (userRaw as { role: "admin" | "user" })
    : null;
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Simulate async user check
    if (user !== undefined) {
      if (!user) {
        router.replace("/login"); // not logged in → redirect to login
      } else if (requiredRole && user.role !== requiredRole) {
        // logged in but wrong role → redirect based on role
        if (fallbackRoute) {
          router.replace(fallbackRoute);
        } else {
          router.replace(user.role === "admin" ? "/admin" : "/courses");
        }
      }
      setChecking(false);
    }
  }, [user, requiredRole, fallbackRoute, router]);

  // While checking, or redirecting, show loader
  if (checking || !user || (requiredRole && user.role !== requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return <>{children}</>;
};
