import type { Icon } from "lucide-react";

import { Icons } from "@components/Icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
};

export type DashboardConfig = {
  mainNav: NavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type User = {
  name: string;
  email: string;
  id: number;
  token: string;
};

export type LinkType = {
  id: number;
  title: string;
  originalUrl: string;
  shortenUrl: string;
  clicks: number;
  createdAt?: string;
  updatedAt: string;
  userId?: number;
  token?: string;
};

export type LinkTypeData = {
  title: string;
  originalUrl: string;
  userId: number;
  token: string;
};

export interface LinksWithRedirectHistory {
  id: number;
  userId: number;
  title: string;
  originalUrl: string;
  shortenUrl: string;
  clicks: number;
  redirectHistory: {
    id: number;
    linkId: number;
    device: string;
    browser: string;
    ipAddress: string;
    location: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
