import axios from "axios";

const usersApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/`,
});

export const updateUsername = async (
  userId: number,
  name: string,
  token: string
) => {
  const response = await usersApi.patch(
    `${userId}`,
    {
      name,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
