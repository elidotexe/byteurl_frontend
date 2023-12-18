"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { User } from "@/types";

import { linkSchema } from "@/lib/validations/link";
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

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User;
}

type FormData = z.infer<typeof linkSchema>;

const UserNameForm = ({ user, className, ...props }: UserNameFormProps) => {
  const router = useRouter();

  const { data: session, update } = useSession();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      originalUrl: "",
    },
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onSubmit = async (data: FormData) => {};

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
              placeholder="Title"
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
              placeholder="https://example.com"
              {...register("originalUrl")}
              onChange={(e) => {
                setValue("originalUrl", e.target.value);
              }}
            />
            {errors?.title && (
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
            disabled={isSaving}
          >
            {isSaving && (
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
