"use client";

import axios from "axios";
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
import { useQuery } from "@tanstack/react-query";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().min(5, "Email is too short").email("Email is invalid"),
  password: z.string().min(8, "Password is too short"),
});

const login = async (email: string, password: string) => {
  const { data } = await axios.post(
    "http://localhost:3000/login",
    {
      email,
      password,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return data;
};

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const router = useRouter();

  const onSubmit = async (v: z.infer<typeof FormSchema>) => {
    setEmail(v.email);
    setPassword(v.password);

    // if (v.email === "admin@example.com" && v.password === "secret") {
    //
    //   // router.push("/dashboard");
    //
    //   return toast({
    //     title: "You have successfully logged in!",
    //   });
    // } else {
    //   toast({
    //     title: "Invalid credentials",
    //     description: "Please try again",
    //   });
    // }
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
