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
      <DashboardHeader heading="Create new">
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "absolute top-8")}
          href="/"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          <>Back</>
        </Link>
      </DashboardHeader>
      <LinkForm />
    </DashboardShell>
  );
};

// <DashboardHeader heading="Create new">
//   <Link className={cn(buttonVariants())} href="/editor">
//     Save
//   </Link>
// </DashboardHeader>

export default EditorPage;
