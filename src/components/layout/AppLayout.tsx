"use client";

import Header from "./Header";
import { Breadcrumbs } from "./Breadcrumbs";
import Sidebar from "./Sidebar";
// import MobileSidebar from "./MobileSidebar"; // Placeholder for future
import MobileNav from "./MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Sidebar state for future expansion

  return (
    <div className="min-h-screen bg-nordic-50">
      <Header />
      {/* Breadcrumbs */}
      <div className="pt-2 pb-1 px-4 sm:px-6 lg:px-8 lg:pl-72">
        <Breadcrumbs />
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:pt-16 z-30">
        <Sidebar />
      </div>
      {/* Main Content */}
      <main className="lg:pl-64 pt-16 pb-20 lg:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
