import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { DashboardShell } from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";
import { Icons } from "@/components/icons";
import LinkList from "@/components/dashboard/link-list";

const DashboardPage = () => {
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <Link className={cn(buttonVariants())} href="/dashboard/editor">
          <Icons.add className="mr-2 h-4 w-4" />
          New link
        </Link>
      </DashboardHeader>
      <LinkList />
    </DashboardShell>
  );
};

export default DashboardPage;
