"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import { getAllLinks } from "@/app/api/links";
import { tableColumns } from "./table-columns";
import { User, LinkType } from "@/types";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { Icons } from "@/components/icons";
import LinkItem from "@/components/dashboard/link-item";

interface UserLinksProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

const LinkList = ({ user }: UserLinksProps) => {
  const [links, setLinks] = React.useState<LinkType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllLinks(user.id, user.token);
        setLinks(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="divide-border-200 divide-y rounded-md border">
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
        <LinkItem.Skeleton />
      </div>
    );
  }

  return (
    <>
      {links?.length ? (
        <>
          <LinkItem links={links} columns={tableColumns} />
        </>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="link" />
          <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any links yet. Start creating links.
          </EmptyPlaceholder.Description>
          <Button variant="outline" asChild>
            <Link href="/dashboard/editor">
              <Icons.add className="mr-2 h-4 w-4" />
              New link
            </Link>
          </Button>
        </EmptyPlaceholder>
      )}
    </>
  );
};

export default LinkList;
