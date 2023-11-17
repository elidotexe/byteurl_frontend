import Link from "next/link";

import { dashboardConfig } from "@/config/dashboard";

import { Button } from "@/components/ui/button";
import Nav from "@/components/navigation/nav";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import Footer from "@/components/navigation/footer";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Nav items={dashboardConfig.mainNav} />
          <Button
            className="bg-secondary hover:bg-secondary/80 h-9 rounded-md px-4 border-none text-sm font-medium transition-colors"
            variant="outline"
            asChild
          >
            <Link href="/">Sign out</Link>
          </Button>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
