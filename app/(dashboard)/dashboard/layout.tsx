import { dashboardConfig } from "@/config/dashboard";

import Nav from "@/components/navigation/nav";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import Footer from "@/components/navigation/footer";
import UserAccountNav from "@/components/dashboard/user-account-nav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const user = { name: "John Doe", image: null, email: "example@website.com" };

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Nav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{ name: user.name, image: user.image, email: user.email }}
          />
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
      <Footer className="border-t" />
    </div>
  );
};

export default DashboardLayout;
