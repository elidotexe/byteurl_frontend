import DashboardHeader from "@/components/dashboard/header";
import LinkCreateButton from "@/components/dashboard/link-create-button";
import { DashboardShell } from "@/components/dashboard/shell";

const DashboardPage = () => {
  const posts = [];

  return (
    <DashboardShell>
      <DashboardHeader heading="Links" text="Create and manage links.">
        <LinkCreateButton />
      </DashboardHeader>
    </DashboardShell>
  );
};

// <div>
//        {posts?.length ? (
//          <div className="divide-y divide-border rounded-md border">
//            {posts.map((post) => (
//              <PostItem key={post.id} post={post} />
//            ))}
//          </div>
//        ) : (
//          <EmptyPlaceholder>
//            <EmptyPlaceholder.Icon name="post" />
//            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
//            <EmptyPlaceholder.Description>
//              You don&apos;t have any posts yet. Start creating content.
//            </EmptyPlaceholder.Description>
//            <PostCreateButton variant="outline" />
//          </EmptyPlaceholder>
//        )}
//      </div>

export default DashboardPage;
