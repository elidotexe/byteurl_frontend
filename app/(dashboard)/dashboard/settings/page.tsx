import { notFound } from "next/navigation";

import getCurrentUser from "@/lib/session";

import { Metadata } from "next";
import DashboardShell from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";
import UserNameForm from "@/components/dashboard/user-name-form";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and website settings",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) return notFound();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ name: user.name, id: user.id }} />
      </div>
    </DashboardShell>
  );
};

export default SettingsPage;
