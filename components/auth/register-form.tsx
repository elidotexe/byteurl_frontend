"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/validations/auth";

import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "../icons";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const onSubmit = async (v: z.infer<typeof RegisterSchema>) => {
    setIsSaving(true);

    if (v.password !== v.confirmPassword) {
      return toast({
        title: "Passwords do not match!",
        description: "Please try again",
        variant: "destructive",
      });
    }

    try {
      const response = await signIn("credentials", {
        redirect: false,
        name: v.name,
        email: v.email,
        password: v.password,
      });

      console.log("response:", response);

      setIsSaving(false);

      if (response?.status === 200) {
        router.push("/dashboard");
        return toast({
          title: "You have successfully created an account!",
        });
      }

      const errorObject = JSON.parse(response?.error ?? "{}");

      return toast({
        title: `${errorObject.error
          .charAt(0)
          .toUpperCase()}${errorObject.error.slice(1)}!`,
        description:
          errorObject.status === 409
            ? "Please try creating an account with a different email"
            : "Please try again",
        variant: "destructive",
      });
    } catch (err: any) {
      console.error(err);
      return toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  id="name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormControl>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Sign In with Email</span>
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
