import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@/types";

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user as User;
};

export default getCurrentUser;
