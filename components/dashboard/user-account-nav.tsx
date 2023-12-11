"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./user-avatar";

// interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
//   user: Pick<User, "name" | "email">;
// }

const UserAccountNav = () => {
  const { data: session, status, update } = useSession();
  const user = session?.user;
  console.log("user:", user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          // user={{ name: user?.name || undefined }}
          user={user}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
