import axios from "axios";
import { CreateLinkData } from "@/types";

const linkApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/`,
});

export const getAllLinks = async (userId: number, token: string) => {
  const response = await linkApi.get(`${userId}/links`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createLink = async (createLinkData: CreateLinkData) => {
  const { title, originalUrl, userId, token } = createLinkData;

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/links/0`,
    {
      title,
      originalUrl,
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

export const updateLink = async (link: any) => {
  return await linkApi.put(`/links/${link.id}`, link);
};

export const deleteLink = async ({ id }: any) => {
  return await linkApi.delete(`/links/${id}`, id);
};

export default linkApi;
