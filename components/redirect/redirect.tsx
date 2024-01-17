"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const Redirect = () => {
  let pathname = usePathname();
  // Remove leading slash if present
  if (pathname.startsWith("/")) {
    pathname = pathname.substring(1);
  }

  const { data: redirect } = useQuery({
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

  return <div>Current pathname: {pathname}</div>;
};

export default Redirect;
