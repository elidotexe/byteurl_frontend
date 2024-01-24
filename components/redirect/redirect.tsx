"use client";

import { notFound, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserAgent } from "@/lib/user-agent";
import axios from "axios";

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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirect/${pathname}`
      );

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirect/${pathname}`,
        {
          browser: getUserAgent().browser,
          device: getUserAgent().device,
          ipAddress: ipAddress,
        }
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

  if (isLoading) return <div>Loading</div>;
  if (isError) return notFound();

  return <></>;
};

export default Redirect;
