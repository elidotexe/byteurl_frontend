import axios from "axios";
import { LinkTypeData, LinkType } from "@/types";

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

export const getLink = async (
  userId: number,
  linkId: number,
  token: string
) => {
  const response = await linkApi.get(`${userId}/links/${linkId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const createLink = async (linkData: LinkTypeData) => {
  const { title, originalUrl, userId, token } = linkData;

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

export const updateLink = async (link: LinkTypeData, linkId: number) => {
  const { title, originalUrl, userId, token } = link;

  const response = await linkApi.patch(
    `${userId}/links/${linkId}`,
    { title, originalUrl },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
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
