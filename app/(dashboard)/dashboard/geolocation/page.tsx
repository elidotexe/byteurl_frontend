import Link from "next/link";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import getCurrentUser from "@/lib/session";

import { Icons } from "@/components/icons";
import DashboardShell from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";
import GeoLocation from "@/components/dashboard/geolocation";

const GeoLocationPage = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Geolocation"
        text="Get insights into where your audience is located."
      >
        <Link className={cn(buttonVariants())} href="/dashboard/editor/0">
          <Icons.add className="mr-2 h-4 w-4" />
          New link
        </Link>
      </DashboardHeader>
      <GeoLocation user={user} />
    </DashboardShell>
  );
};

export default GeoLocationPage;
