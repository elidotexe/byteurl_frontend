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

  const userAgent = getUserAgent();
  const { browser, device } = userAgent;

  const sendRedirectData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirect/${pathname}/click`,
        {
          browser: browser,
          device: device,
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (redirect && !isLoading) {
      sendRedirectData();
      window.location.href = redirect;
    }
  }, [redirect, isLoading]);

  if (isError) return notFound();

  return <></>;
};

export default Redirect;
