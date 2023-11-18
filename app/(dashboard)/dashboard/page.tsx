import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import DashboardHeader from "@/components/dashboard/header";
import LinkCreateButton from "@/components/dashboard/link-create-button";
import LinkItem from "@/components/dashboard/link-item";
import { DashboardShell } from "@/components/dashboard/shell";

const DashboardPage = () => {
  const links = [{ id: 1, link: "localhost:3000", title: "Hello" }] as any[];
  // const links = [] as any[];

  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <LinkCreateButton />
      </DashboardHeader>
      <div>
        {links?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {links.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="link" />
            <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any links yet. Start creating links.
            </EmptyPlaceholder.Description>
            <LinkCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
};

export default DashboardPage;
