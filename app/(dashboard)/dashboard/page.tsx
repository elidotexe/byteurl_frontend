import Link from "next/link";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";
import getCurrentUser from "@/lib/session";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import DashboardShell from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";
import LinkList from "@/components/dashboard/link-list";

const DashboardPage = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <Link className={cn(buttonVariants())} href="/dashboard/editor/0">
          <Icons.add className="mr-2 h-4 w-4" />
          New link
        </Link>
      </DashboardHeader>
      <LinkList user={user} />
    </DashboardShell>
  );
};

export default DashboardPage;
