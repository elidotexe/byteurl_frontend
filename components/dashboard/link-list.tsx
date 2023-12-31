"use client";

import React from "react";
import Link from "next/link";

import { getAllLinks } from "@/app/api/links";
import { tableColumns } from "./table-columns";
import { User, LinkType } from "@/types";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { Icons } from "@/components/icons";
import LinkItem from "@/components/dashboard/link-item";
import ItemSkeleton from "./item-skeleton";
import { useQuery } from "@tanstack/react-query";

interface UserLinksProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

const LinkList = ({ user }: UserLinksProps) => {
  const {
    data: links,
    isLoading,
    isError,
  } = useQuery<LinkType[], Error>({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await getAllLinks(user.id, user.token);
      return response as LinkType[];
    },
  });

  if (isLoading) return <ItemSkeleton />;
  if (isError) return <div>Something went wrong</div>;

  const linksWithExtraParam =
    (links &&
      links.map((link: LinkType) => ({
        ...link,
        token: user.token,
      }))) ||
    [];

  return (
    <>
      {links?.length ? (
        <>
          <LinkItem links={linksWithExtraParam} columns={tableColumns} />
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
