import type { AxiosRequestConfig } from "axios";
import { api } from "./config";

// GET
export const get = async (url: string, config?: AxiosRequestConfig) => {
  const res = await api.get(url, config);
  return res.data;
};

// POST
export const post = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => {
  const res = await api.post(url, data, config);
  return res.data;
};

// PATCH
export const patch = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) => {
  const res = await api.patch(url, data, config);
  return res.data;
};
