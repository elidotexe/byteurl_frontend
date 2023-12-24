import { Skeleton } from "@/components/ui/skeleton";
import { DashboardShell } from "@/components/dashboard/shell";
import LinkItem from "@/components/dashboard/link-item";

const DashboardLoading = () => {
  return (
    <DashboardShell>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-3/4" />
      <div className="divide-border-200 divide-y rounded-md border">
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
      </div>
    </DashboardShell>
  );
};

export default DashboardLoading;
