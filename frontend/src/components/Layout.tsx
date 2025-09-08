import type { ReactNode } from "react";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import AIChat from "./chat/AIChat"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        {/* centralized page container — all pages render inside this */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
          {children}
        </div>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}
