import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import DashboardHeader from "@/components/dashboard/header";
import LinkItem from "@/components/dashboard/link-item";
import { Icons } from "@/components/icons";

const DashboardPage = () => {
  // const links = [{ id: 1, link: "localhost:3000", title: "Hello" }] as any[];
  const links = [] as any[];

  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <Link className={cn(buttonVariants())} href="/editor">
          <Icons.add className="mr-2 h-4 w-4" />
          New link
        </Link>
      </DashboardHeader>
      <div>
        {links?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="link" />
            <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any links yet. Start creating links.
            </EmptyPlaceholder.Description>
            <Button variant="outline" asChild>
              <Link href="/editor">
                <Icons.add className="mr-2 h-4 w-4" />
                New link
              </Link>
            </Button>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
};

export default DashboardPage;
