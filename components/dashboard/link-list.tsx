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
  const { data: links, isLoading } = useQuery<LinkType[], Error>({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await getAllLinks(user.id, user.token);
      return response as LinkType[];
    },
  });

  if (isLoading) return <ItemSkeleton />;

  const linksWithExtraParam =
    (Array.isArray(links) &&
      links.map((link: LinkType) => ({
        ...link,
        token: user.token,
      }))) ||
    [];

  const sortedLinks = linksWithExtraParam.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateB - dateA;
  });

  return (
    <>
      {links?.length ? (
        <>
          <LinkItem links={sortedLinks} columns={tableColumns} />
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
