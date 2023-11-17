"use client";

import React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { MainNavItem } from "@/types";

import MobileNav from "./mobile-nav";
import { Icons } from "../icons";

interface NavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

const Nav = ({ items, children }: NavProps) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <nav>
      <div className="flex gap-4 items-center">
        <Link className="hidden gap-1 font-bold mr-4 md:flex" href="/">
          <div className="mr-1">
            <Icons.logo />
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
                <Link href={item.disabled ? "#" : item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        ) : null}
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Icons.close /> : <Icons.logo />}
          <span className="font-bold">Menu</span>
        </button>
      </div>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </nav>
  );
};

export default Nav;
