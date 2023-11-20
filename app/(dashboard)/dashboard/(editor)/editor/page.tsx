import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { DashboardShell } from "@/components/dashboard/shell";
import { Icons } from "@/components/icons";
import DashboardHeader from "@/components/dashboard/header";
import LinkForm from "@/components/dashboard/link-form";

interface EditorPageProps {
  params: { linkId: number };
}

const EditorPage = ({ params }: EditorPageProps) => {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create or edit link">
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "")}
          href="/dashboard"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          <>Back</>
        </Link>
      </DashboardHeader>
      <LinkForm />
    </DashboardShell>
  );
};

export default EditorPage;
