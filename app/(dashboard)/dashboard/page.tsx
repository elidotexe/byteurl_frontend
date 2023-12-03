import Link from "next/link";

import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import { DashboardShell } from "@/components/dashboard/shell";
import { Icons } from "@/components/icons";
import DashboardHeader from "@/components/dashboard/header";
import LinkList from "@/components/dashboard/link-list";

const DashboardPage = async () => {
  const session = await getServerSession(options);

  if (!session) redirect("/login");

  return (
    <DashboardShell>
      {session ? (
        <>
          <DashboardHeader heading="Links" text="Create and manage links.">
            <Link className={cn(buttonVariants())} href="/dashboard/editor">
              <Icons.add className="mr-2 h-4 w-4" />
              New link
            </Link>
          </DashboardHeader>
          <LinkList />
        </>
      ) : (
        <div>You are not logged in!</div>
      )}
    </DashboardShell>
  );
};

export default DashboardPage;
