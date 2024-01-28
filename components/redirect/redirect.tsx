"use client";

import { notFound, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserAgent } from "@/lib/user-agent";
import { getRedirect, sendRedirect } from "@/app/api/redirect-data";
import axios from "axios";
import Loader from "../loader";

const Redirect = () => {
  let pathname = usePathname();
  // Remove leading slash if present
  if (pathname.startsWith("/")) {
    pathname = pathname.substring(1);
  }

  const {
    data: redirect,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["redirect"],
    queryFn: async () => {
      const response = await getRedirect(pathname);
      return response.data.originalUrl as string;
    },
  });

  const getIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data.ip;
    } catch (err) {
      console.error(`Error getting IP address: ${err}`);
      return "Unknown";
    }
  };

  const sendRedirectData = async (ipAddress: string) => {
    try {
      const response = await sendRedirect(
        pathname,
        getUserAgent().browser,
        getUserAgent().device,
        ipAddress
      );

      return response.data;
    } catch (err) {
      console.error(`Error sending redirect data: ${err}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined" && redirect && !isLoading) {
        const ipAddress = await getIpAddress();
        sendRedirectData(ipAddress);
        window.location.href = redirect;
      }
    };

    fetchData();
  }, [redirect, isLoading]);

  if (isLoading) return <Loader />;
  if (isError) return notFound();

  return <></>;
};

export default Redirect;
