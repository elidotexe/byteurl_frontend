"use client";

import React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";
import { Atom, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import PaddingContainer from "@/components/layout/padding-container";
import MobileNav from "./mobile-nav";

interface NavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

const Nav = ({ items, children }: NavProps) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <nav>
      <PaddingContainer>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Link className="hidden gap-1 font-bold mr-4 md:flex" href="/">
              <div className="mr-1">
                <Atom />
              </div>
              <span className="hidden md:inline-block font-bold">
                {siteConfig.name}
              </span>
              <span className="md:hidden font-bold">Menu</span>
            </Link>

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
            <button
              className="flex items-center space-x-2 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X /> : <Atom />}
              <span className="font-bold">Menu</span>
            </button>
          </div>
          {showMobileMenu && items && (
            <MobileNav items={items}>{children}</MobileNav>
          )}

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
