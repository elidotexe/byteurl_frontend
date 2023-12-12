import getCurrentUser from "@/lib/session";

import { DashboardShell } from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  console.log("hello world");
  console.log(user?.email);

  if (!user) {
    console.log("no user");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">{user?.email}</div>
    </DashboardShell>
  );
};

// <UserNameForm user={{ id: user.id, name: user.name || "" }} />

export default SettingsPage;
