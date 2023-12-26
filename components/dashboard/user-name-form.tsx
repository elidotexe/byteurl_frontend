"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { User } from "@/types";

import { updateUsername } from "@/app/api/users";
import { userNameSchema } from "@/lib/validations/user";
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

type FormData = z.infer<typeof userNameSchema>;

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
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);

    if (session?.user.token === undefined) {
      setIsSaving(false);

      return toast({
        title: "User is not defined.",
        variant: "destructive",
      });
    }

    try {
      const response = await updateUsername(
        user.id,
        data.name,
        session.user.token
      );

      setIsSaving(false);

      if (response.status === 200) {
        toast({
          description: "Your name has been updated.",
        });

        router.refresh();
        return;
      }

      return toast({
        title: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
    } catch (err: any) {
      setIsSaving(false);

      if (err.response?.status === 401) {
        await signOut({
          callbackUrl: "/login",
        });

        return toast({
          title: "You are not authorized to perform this action.",
          variant: "destructive",
        });
      }

      return toast({
        title: `${err.response?.data?.message
          ?.charAt(0)
          ?.toUpperCase()}${err.response?.data?.message?.slice(1)}!`,
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
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
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              className="w-[400px]"
              type="text"
              id="name"
              size={32}
              {...register("name")}
              onChange={(e) => {
                setValue("name", e.target.value);
              }}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            className={cn(buttonVariants(), className)}
            type="submit"
            disabled={isSaving}
            onClick={() => {
              const { name } = getValues();
              update({ name });
            }}
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
