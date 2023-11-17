import Link from "next/link";

import { formatDate } from "@/lib/utils";

interface LinkItemProps {
  link: any;
}

const LinkItem = ({ link }: LinkItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${link.id}`}
          className="font-semibold hover:underline"
        >
          {link.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(link.createdAt?.toDateString())}
          </p>
        </div>
      </div>
    </div>
  );
};
// <PostOperations post={{ id: post.id, title: post.title }} />

export default LinkItem;
