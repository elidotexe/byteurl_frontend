import axios from "axios";
import { CreateLinkTypeData } from "@/types";

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

export const createLink = async (createLinkData: CreateLinkTypeData) => {
  const { title, originalUrl, userId, token } = createLinkData;

  const response = await linkApi.put(
    `${userId}/links/0`,
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

export const deleteLink = async (
  userId: number,
  linkId: number,
  token: string
) => {
  return await linkApi.delete(`${userId}/links/${linkId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default linkApi;
