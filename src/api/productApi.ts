import { Product } from "../types/Product";
import API from "./client";

type BackendProduct = Omit<Product, "id"> & { id: string | number };

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
