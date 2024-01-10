import { redirect } from "next/navigation";
import getCurrentUser from "@/lib/session";

import DashboardShell from "@/components/dashboard/shell";
import DashboardHeader from "@/components/dashboard/header";
import LinkForm from "@/components/dashboard/link-form";

interface EditorPageProps {
  params: { linkId: number };
}

const EditorPage = async ({ params }: EditorPageProps) => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Link creation"
        text="Create a new link or edit an existing one."
      />
      <div className="grid gap-10">
        <LinkForm user={user} />
      </div>
    </DashboardShell>
  );
};

export default EditorPage;
