"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { AxiosError } from "axios";

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
  const { data: session, update } = useSession();

  const router = useRouter();
  const queryClient = useQueryClient();

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

  const { mutateAsync: submitUsernameMutation, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      try {
        if (session?.user.token === undefined) {
          toast({
            title: "User is not defined.",
            variant: "destructive",
          });

          throw new Error("User is not defined.");
        }

        return updateUsername(user.id, data.name, session.user.token);
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["username"] });
      queryClient.invalidateQueries({ queryKey: ["username"] });

      router.refresh();
      return toast({
        description: "Your name has been updated.",
      });
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        signOut({
          callbackUrl: "/login",
        });
      }

      const errorMessage = (err.response?.data as { message?: string })
        ?.message;
      console.error(errorMessage || "An error occured.", err);

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
      await submitUsernameMutation(data);
    } catch (err) {
      console.error(err);
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
            disabled={isPending}
            onClick={() => {
              const { name } = getValues();
              update({ name });
            }}
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
