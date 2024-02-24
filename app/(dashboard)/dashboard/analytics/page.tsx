import { redirect } from "next/navigation";

import getCurrentUser from "@/lib/session";

import DashboardShell from "@/components/dashboard/shell";
import Analytics from "@/components/dashboard/analytics";

const AnalyticsPage = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  return (
    <DashboardShell>
      <Analytics user={user} />
    </DashboardShell>
  );
};

export default AnalyticsPage;
