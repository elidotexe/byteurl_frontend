import axios from "axios";

// `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/links`

const linkApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/users/`,
});

export const getAllLinks = async (userId: number, accessToken: string) => {
  const response = await linkApi.get(`${userId}/links`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const addLink = async (link: any) => {
  return await linkApi.post("/links", link);
};

export const updateLink = async (link: any) => {
  return await linkApi.put(`/links/${link.id}`, link);
};

export const deleteLink = async ({ id }: any) => {
  return await linkApi.delete(`/links/${id}`, id);
};

export default linkApi;
