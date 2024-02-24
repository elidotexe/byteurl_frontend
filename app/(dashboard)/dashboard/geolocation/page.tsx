import Link from "next/link";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import getCurrentUser from "@/lib/session";

import { Icons } from "@/components/icons";
import DashboardShell from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";
import GeoLocation from "@/components/dashboard/geolocation";
import { DatePickerWithRange } from "@/components/dashboard/data-picker-range";

const GeoLocationPage = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Geolocation"
        text="Get insights into where your audience is located."
      >
        <DatePickerWithRange />
      </DashboardHeader>
      <GeoLocation user={user} />
    </DashboardShell>
  );
};

// <Link className={cn(buttonVariants())} href="/dashboard/editor/0">
//   <Icons.add className="mr-2 h-4 w-4" />
//   New link
// </Link>

export default GeoLocationPage;
