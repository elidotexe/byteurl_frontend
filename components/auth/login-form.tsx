"use client";

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
import { LoginSchema } from "@/lib/validations/auth";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (v: z.infer<typeof LoginSchema>) => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: v.email,
        password: v.password,
      });

      console.log("response", response);

      if (response?.status === 200) {
        router.push("/dashboard");
        return toast({
          title: "You have successfully logged in!",
        });
      }

      const errorObject = JSON.parse(response?.error ?? "{}");

      return toast({
        title: `${errorObject.error
          .charAt(0)
          .toUpperCase()}${errorObject.error.slice(1)}!`,
        description: "Please try again",
        variant: "destructive",
      });
    } catch (err: any) {
      console.error(err);
      toast({
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
            <FormItem className="mb-6">
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

        <Button className="w-full" type="submit">
          Sign In with Email
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
