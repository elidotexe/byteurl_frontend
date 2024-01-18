import axios from "axios";

const userApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/`,
});

export const getUsername = async (userId: number, token: string) => {
  const response = await userApi.get(`${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUsername = async (
  userId: number,
  name: string,
  token: string
) => {
  const response = await userApi.patch(
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
