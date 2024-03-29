"use client";

import Link from "next/link";

import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "../ui/use-toast";

import { Metadata } from "next";
import { LinksWithRedirectHistory, User } from "@/types";
import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";
import { Icons } from "@/components/icons";
import ItemSkeleton from "./item-skeleton";
import MapBoxComponent from "./map-box";

export const metadata: Metadata = {
  title: "Geolocation",
  description: "Get insights into where your audience is located.",
};

interface UserLinksProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

const GeoLocation = ({ user }: UserLinksProps) => {
  const {
    data: linksWithRedirectHistory,
    isLoading,
    error,
  } = useQuery<LinksWithRedirectHistory[], AxiosError>({
    queryKey: ["linksHistory"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/history`
      );

      return response.data;
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

  const locations = linksWithRedirectHistory?.flatMap((link) =>
    link.redirectHistory
      .filter((history) => history.location !== "Unknown")
      .map((history) => history.location)
      .filter((loco, index, self) => self.indexOf(loco) === index)
  );

  return (
    <>
      {locations?.length ? (
        <div className="max-h-[70vh]">
          <MapBoxComponent locations={locations} />
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="link" />
          <EmptyPlaceholder.Title>No links created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any links yet. Start creating links.
          </EmptyPlaceholder.Description>
          <Button variant="outline" asChild>
            <Link href="/dashboard/editor/0">
              <Icons.add className="mr-2 h-4 w-4" />
              New link
            </Link>
          </Button>
        </EmptyPlaceholder>
      )}
    </>
  );
};

export default GeoLocation;
