"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Monitor,
  Menu,
  X,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: Users },
  // { name: "Profile", href: "/equipment", icon: Contact },
  { name: "Courses", href: "/admin/courses", icon: Monitor },
];

const userNavigation = [
  // { name: "Dashboard", href: "/", icon: Users },
  // { name: "Profile", href: "/equipment", icon: Contact },
  { name: "Courses", href: "/courses", icon: Monitor },
];

export function Sidebar() {
 ;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  console.log(user);
  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="h-10 w-10">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href={"/admin"} className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary mr-2" />
              <span className="font-bold text-xl text-gray-900">LMS</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {user?.role &&
              (() => {
                const navigation = user.role === "admin" ? adminNavigation : userNavigation;

                return navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors hover:bg-blue-400"
                        
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                });
              })()}
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500/10 p-3 hover:bg-red-500/20 transition-colors duration-200 text-red-500 hover:text-red-600 font-semibold"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
}
