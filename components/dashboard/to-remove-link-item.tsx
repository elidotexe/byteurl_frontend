import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { LinkType } from "@/types";

import { Skeleton } from "../ui/skeleton";
import LinkOperations from "./link-operations";

interface LinkItemProps {
  link: LinkType;
}

const LinkItem = ({ link }: LinkItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${link.id}`}
          className="font-semibold hover:underline"
        >
          {link.title || "Untitled Link"}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(link.createdAt)}
          </p>
        </div>
      </div>
      <LinkOperations link={{ id: link.id, title: link.title }} />
    </div>
  );
};

LinkItem.Skeleton = () => {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};

export default LinkItem;
