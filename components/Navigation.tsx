"use client";

import { useAuth } from "@/contexts/AuthContext";

import { LayoutDashboard, BookOpen, GraduationCap, User } from "lucide-react";

export const Navigation = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
  ];

  const userNavItems = [{ href: "/courses", label: "My Courses", icon: GraduationCap }];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-sm text-gray-700">{user.name}</span>
              <span className="ml-2 px-2 py-1 text-xs bg-primary text-white rounded-full">{user.role}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
