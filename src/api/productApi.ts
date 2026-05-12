import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getAllProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
