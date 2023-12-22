import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard/shell";
import { Icons } from "@/components/icons";
import DashboardHeader from "@/components/dashboard/header";
import LinkItem from "@/components/dashboard/link-item";

const DashboardLoading = () => {
  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <Link className={cn(buttonVariants())} href="/dashboard/editor">
          <Icons.add className="mr-2 h-4 w-4" />
          New link
        </Link>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
      </div>
    </DashboardShell>
  );
};

export default DashboardLoading;
