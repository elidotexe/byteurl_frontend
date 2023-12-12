import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export default getCurrentUser;
