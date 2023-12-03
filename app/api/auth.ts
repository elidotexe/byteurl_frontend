import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`http://localhost:8080/api/login`, {
    email,
    password,
  });
  return response;
};
