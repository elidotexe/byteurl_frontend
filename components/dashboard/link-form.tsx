"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinkType, User } from "@/types";

import { linkSchema } from "@/lib/validations/link";
import { createLink, getLink } from "@/app/api/links";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

import { Icons } from "@/components/icons";
import axios, { AxiosError } from "axios";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

type FormData = z.infer<typeof linkSchema>;

const UserNameForm = ({ user, className, ...props }: UserNameFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const pathname = usePathname();
  const match = pathname.match(/\/(\d+)$/);

  let linkId: number = 0;
  if (match) {
    linkId = parseInt(match[1], 10);
  }

  const { data: link } = useQuery<LinkType, Error>({
    queryKey: ["links"],
    queryFn: async () => {
      if (linkId === 0) {
        return {};
      }
      const { data } = await getLink(user.id, linkId, user.token);
      return data;
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      originalUrl: "",
    },
  });

  const { mutateAsync: submitLinkMutation, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      return createLink({
        title: data.title,
        originalUrl: data.originalUrl,
        userId: user.id,
        token: user.token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });

      router.push("/dashboard");
      return toast({
        title:
          linkId === 0
            ? "Link successfully created!"
            : "Link successfully updated!",
      });
    },
    onError: (err: AxiosError) => {
      const errorMessage = (err.response?.data as { message?: string })
        ?.message;

      if (errorMessage) {
        return toast({
          title: `${errorMessage.charAt(0)?.toUpperCase()}${errorMessage.slice(
            1
          )}!`,
          description: "Please try again later.",
          variant: "destructive",
        });
      }

      return toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitLinkMutation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setValue("title", "");
      setValue("originalUrl", "");
    }
  };

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>
            Enter your title that you wish to be displayed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="title">
              Title
            </Label>
            <Input
              className="w-[400px]"
              type="text"
              id="title"
              size={32}
              placeholder={link?.title ?? "Title"}
              {...register("title")}
              onChange={(e) => {
                setValue("title", e.target.value);
              }}
            />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Link</CardTitle>
          <CardDescription>
            Enter your link that you wish to be shortened.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="originalUrl">
              Link
            </Label>
            <Input
              className="w-[400px]"
              type="text"
              id="originalUrl"
              size={32}
              placeholder={link?.originalUrl ?? "https://example.com"}
              {...register("originalUrl")}
              onChange={(e) => {
                setValue("originalUrl", e.target.value);
              }}
            />
            {errors?.originalUrl && (
              <p className="px-1 text-xs text-red-600">
                {errors.originalUrl?.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <button
            className={cn(buttonVariants(), className)}
            type="submit"
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserNameForm;
