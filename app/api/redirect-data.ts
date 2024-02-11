import axios from "axios";

const redirectApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/redirect/`,
});

export const getRedirect = async (pathname: string) => {
  const response = await redirectApi.get(`${pathname}`);
  return response;
};

export const sendRedirect = async (
  pathname: string,
  browser: string,
  device: string,
  ipAddress: string,
  location: string
) => {
  const response = await redirectApi.post(`${pathname}`, {
    browser,
    device,
    ipAddress,
    location,
  });

  return response;
};
