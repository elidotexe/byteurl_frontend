"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getUsername } from "@/app/api/users";
import { toast } from "../ui/use-toast";

import { User } from "@/types";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface UserAvatarProps extends AvatarProps {
  user: User;
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  const [avatarUsername, setAvatarUsername] = useState<string>("");

  const { data: username, error } = useQuery<string, AxiosError>({
    queryKey: ["username"],
    queryFn: async () => {
      var response = await getUsername(user.id, user.token);
      return response.name as string;
    },
  });

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

  useEffect(() => {
    if (username) {
      setAvatarUsername(username);
    }
  }, [username]);

  console.log(avatarUsername);

  return (
    <Avatar {...props}>
      <AvatarFallback>
        <span className="sr-only">{avatarUsername}</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
