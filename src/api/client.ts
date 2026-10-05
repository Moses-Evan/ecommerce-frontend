import axios from "axios";
import { API_ORIGIN, getAccessToken } from "./auth";

const API = axios.create({ baseURL: `${API_ORIGIN}/api` });

API.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
