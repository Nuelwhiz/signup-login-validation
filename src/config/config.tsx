import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

export const buildInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 300000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    transformRequest: [(data) => JSON.stringify(data)],
  });

  // REQUEST INTERCEPTOR
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // RESPONSE INTERCEPTOR
  instance.interceptors.response.use(
    (response) => extractResponseData(response),
    (error) => errBody(error),
  );

  return instance;
};
//respons
export const extractResponseData = ({ data }: AxiosResponse): any => {
  return data;
};

//error handler
export const errBody = (err: any) => {
  // Unauthorized
  if (err?.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  // Network Error
  if (err?.code === "ERR_NETWORK") {
    throw new Error("Network Error, try again later");
  }

  const errMsg =
    err?.response?.data?.message || err?.message || "Something went wrong";

  throw new Error(errMsg);
};

export const api = buildInstance();
