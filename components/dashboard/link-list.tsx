"use client";

import React from "react";
import Link from "next/link";

import { getAllLinks } from "@/app/api/links";
import { tableColumns } from "./table-columns";
import { useQuery } from "@tanstack/react-query";
import { User, LinkType } from "@/types";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { Icons } from "@/components/icons";
import LinkItem from "@/components/dashboard/link-item";
import ItemSkeleton from "./item-skeleton";
import { toast } from "../ui/use-toast";
import { signOut } from "next-auth/react";

interface UserLinksProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

const LinkList = ({ user }: UserLinksProps) => {
  const {
    data: links,
    isLoading,
    error,
  } = useQuery<LinkType[], AxiosError>({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await getAllLinks(user.id, user.token);
      return response as LinkType[];
    },
  });

  if (isLoading) return <ItemSkeleton />;

  if (error?.response?.status === 401) {
    signOut({
      callbackUrl: "/login",
    });

    toast({
      title: "You're not authorized!",
      description: "Please login to your account.",
      variant: "destructive",
    });
  }

  const linksWithExtraParam =
    (Array.isArray(links) &&
      links.map((link: LinkType) => ({
        ...link,
        token: user.token,
      }))) ||
    [];

  const sortedLinks = linksWithExtraParam.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return (
    <>
      {sortedLinks?.length ? (
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
