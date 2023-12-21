"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getAllLinks } from "@/app/api/links";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { Icons } from "@/components/icons";
import { LinkTypes, User } from "@/types";
import LinkItem from "@/components/dashboard/link-item";

interface UserLinksProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

const LinkList = ({ user }: UserLinksProps) => {
  const router = useRouter();

  const [links, setLinks] = React.useState<LinkTypes[]>([]);

  useEffect(() => {
    (async () => {
      if (user.id === undefined || user.access_token === undefined) {
        return;
      }

      try {
        const response = await getAllLinks(user?.id, user.access_token);
        console.log(response);
        setLinks(response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

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
