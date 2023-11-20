import axios from "axios";

const linksApi = axios.create({
  baseURL: "http://localhost:3000/app/api/",
});

export const getLinks = async () => {
  const response = await linksApi.get("/db.json");
  return response.data;
};

export const addLink = async (link: any) => {
  return await linksApi.post("/links", link);
};

export const updateLink = async (link: any) => {
  return await linksApi.put(`/links/${link.id}`, link);
};

export const deleteLink = async ({ id }: any) => {
  return await linksApi.delete(`/links/${id}`, id);
};

export default linksApi;
