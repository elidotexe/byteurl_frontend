"use client";

import React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import PaddingContainer from "@/components/layout/PaddingContainer";

interface NavProps {
  items?: MainNavItem[];
}

const Nav = ({ items }: NavProps) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <nav>
      <PaddingContainer>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="gap-1 font-bold mr-4 flex">
              <div className="mr-1">
                <LinkIcon />
              </div>
              <span className="hidden md:inline-block font-bold">
                {siteConfig.name}
              </span>
              <span className="md:hidden font-bold">Menu</span>
            </div>

            {items?.length ? (
              <ul className="hidden md:flex space-x-6 text-sm text-gray-500">
                {items?.map((item, index) => (
                  <li
                    key={index}
                    className="text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
                  >
                    <Link href={item.disabled ? "#" : item.href}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <Button
            className="bg-secondary hover:bg-secondary/80 h-9 rounded-md px-4 border-none text-sm font-medium transition-colors"
            variant="outline"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </PaddingContainer>
    </nav>
  );
};

export default Nav;
