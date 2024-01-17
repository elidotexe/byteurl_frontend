"use client";

import { notFound, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const Redirect = () => {
  let pathname = usePathname();
  // Remove leading slash if present
  if (pathname.startsWith("/")) {
    pathname = pathname.substring(1);
  }

  const { data: redirect, isError } = useQuery({
    queryKey: ["redirect"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirect/${pathname}`
      );

      return response.data.originalUrl as string;
    },
  });

  useEffect(() => {
    if (redirect) {
      window.location.href = redirect;
    }
  }, [redirect]);

  if (isError) return notFound();

  return <></>;
};

export default Redirect;
