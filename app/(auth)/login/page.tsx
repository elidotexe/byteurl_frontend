import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import LoginForm from "@/components/auth/login-form";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Login | ByteURL",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="relative">
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "absolute top-8")}
          href="/"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          <>Back</>
        </Link>
        <div className="flex justify-center flex-col items-center h-screen">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex items-center justify-center">
                <Icons.logo />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </div>
            <div className="grid grid-6">
              <LoginForm />
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                className="hover:text-brand underline underline-offset-4"
                href="/register"
              >
                Don't have an account? Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
