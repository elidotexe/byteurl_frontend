import { Skeleton } from "@/components/ui/skeleton";
import DashboardShell from "@/components/dashboard/shell";
import ItemSkeleton from "@/components/dashboard/item-skeleton";

const DashboardLoading = () => {
  return (
    <DashboardShell>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-3/4" />
      <ItemSkeleton />
    </DashboardShell>
  );
};

export default DashboardLoading;
