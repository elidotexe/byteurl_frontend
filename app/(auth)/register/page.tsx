import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import RegisterForm from "@/components/auth/register-form";
import { Icons } from "@/components/icons";

const RegisterPage = () => {
  return (
    <div>
      <div className="container mx-auto px-6">
        <div className="relative">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute top-8 right-0"
            )}
            href="/login"
          >
            <>Login</>
          </Link>
          <div className="flex justify-center flex-col items-center h-screen">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <div className="flex items-center justify-center">
                  <Icons.logo />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your details below to create your account
                </p>
              </div>
              <div className="grid grid-6">
                <RegisterForm />
              </div>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  className="hover:text-brand underline underline-offset-4"
                  href="#"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="hover:text-brand underline underline-offset-4"
                  href="#"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
