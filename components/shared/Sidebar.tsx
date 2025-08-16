"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, Monitor, Menu, X, LogOut, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: Users },
  { name: "Courses", href: "/admin/courses", icon: Monitor },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Toast-based logout confirmation
  const handleLogout = () => {
    toast.custom((t) => (
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-zinc-900 text-sm border border-zinc-300 dark:border-zinc-700 px-4 py-3 rounded-lg shadow-lg w-full max-w-lg">
        <span className="text-zinc-900 dark:text-zinc-100">
          Are you sure you want to sign out?
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              toast.dismiss(t);
              toast.info("Logout canceled.");
            }}
            className="px-3 py-1 rounded-md text-sm bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            No
          </button>
          <button
            onClick={() => {
              toast.dismiss(t);
              dispatch(logout());
              toast.success("Signed out successfully.");
              router.push("/login");
            }}
            className="px-2 py-1 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10"
        >
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
            {adminNavigation.map((item) => (
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
            ))}
          </nav>

          {/* Logout Button */}
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
