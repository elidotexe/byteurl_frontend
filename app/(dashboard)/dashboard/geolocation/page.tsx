import Link from "next/link";

import { Icons } from "@/components/icons";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { Button } from "@/components/ui/button";
import DashboardShell from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";

const GeoLocation = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Geolocation"
        text="Learn about your audience by tracking the progress of your links."
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="link" />
        <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any links yet. Start creating links.
        </EmptyPlaceholder.Description>
        <Button variant="outline" asChild>
          <Link href="/dashboard/editor/0">
            <Icons.add className="mr-2 h-4 w-4" />
            New link
          </Link>
        </Button>
      </EmptyPlaceholder>
    </DashboardShell>
  );
};

export default GeoLocation;
