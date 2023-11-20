"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getLinks } from "@/app/api/links";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import LinkItem from "@/components/dashboard/link-item";
import { Icons } from "@/components/icons";

const LinkList = () => {
  const {
    isLoading,
    isError,
    error,
    data: links,
  } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  console.log({ links });

  return (
    <>
      {links?.length ? (
        <div className="divide-y divide-border rounded-md border">
          {links.map((link: any) => (
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
