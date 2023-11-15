"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
  password: z.string().min(4, "Password is too short"),
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

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (values.email === "admin@example.com" && values.password === "secret") {
      // router.push("/dashboard");

      return toast({
        title: "You have successfully logged in!",
      });
    } else {
      toast({
        title: "Invalid credentials",
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
                  placeholder="name@example.com"
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
