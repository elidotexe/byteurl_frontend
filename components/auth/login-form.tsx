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

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
  email: z.string().min(5, "Email is too short").email("Email is invalid"),
  password: z.string().min(8, "Password is too short"),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (v: z.infer<typeof FormSchema>) => {
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
        title: `${errorObject.error}!`,
        description: "Please try again",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Please try again",
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
