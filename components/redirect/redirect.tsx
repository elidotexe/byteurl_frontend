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

  const getLocation = async (ipAddress: string) => {
    try {
      const response = await axios.get(
        `https://ipinfo.io/${ipAddress}?token=${process.env.NEXT_PUBLIC_IP_TOKEN}`
      );

      const { loc } = response.data;

      const [latitude, longitude] = loc.split(",").map(Number);
      return `${latitude},${longitude}`;
    } catch (err) {
      console.error("Error getting location:", err);
      return "Unknown";
    }
  };

  const sendRedirectData = async (ipAddress: string, location: string) => {
    try {
      const response = await sendRedirect(
        pathname,
        getUserAgent().browser,
        getUserAgent().device,
        ipAddress,
        location
      );

      return response.data;
    } catch (err) {
      console.error(`Error sending redirect data: ${err}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (redirect) {
        try {
          const ipAddress = await getIpAddress();
          const location = await getLocation(ipAddress);

          await sendRedirectData(ipAddress, location);

          window.location.href = redirect;
        } catch (err) {
          console.error("Error fetching or sending redirect data:", err);
        }
      }
    };

    fetchData();
  }, [redirect, isLoading]);

  if (isLoading) return <Loader />;
  if (isError) return notFound();

  return <></>;
};

export default Redirect;
