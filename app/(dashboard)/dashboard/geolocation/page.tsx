import { redirect } from "next/navigation";

import getCurrentUser from "@/lib/session";

import { DatePickerWithRange } from "@/components/dashboard/data-picker-range";
import { Metadata } from "next";
import GeoLocation from "@/components/dashboard/geolocation";
import DashboardShell from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";

export const metadata: Metadata = {
  title: "Geolocation",
  description: "Get insights into where your audience is located.",
};

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

export default GeoLocationPage;
