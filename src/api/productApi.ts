import axios from "axios";
import { Product } from "../types/Product";

type BackendProduct = Omit<Product, "id"> & { id: string | number };

const API = axios.create({
  baseURL: "https://ql4zl5fz-8080.inc1.devtunnels.ms/api",
});
// const API = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

export const getAllProducts = async () => {
  const response = await API.get<BackendProduct[]>("/products");
  return response.data.map(normalizeProduct);
};

export const getProductById = async (id: string) => {
  const response = await API.get<BackendProduct>(`/products/${id}`);
  return normalizeProduct(response.data);
};

const normalizeProduct = (product: BackendProduct): Product => ({
  ...product,
  id: String(product.id),
});
