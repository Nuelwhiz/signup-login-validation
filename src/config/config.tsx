import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

 // AXIOS INSTANCE BUILDER

export const buildInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 500000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
  });

   // REQUEST INTERCEPTOR
  
   
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
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

 // RESPONSE CLEANER

export const extractResponseData = ({ data, status }: AxiosResponse): any => {
  if (data?.message === "unauthorized access") {
    console.log("unauthorized access");
  }
  if (status >= 400) {
    throw new Error(data?.message || "Request failed");
  }
  return data; //  always return clean payload
};

 // ERROR HANDLER

export const errBody = (err: any) => {
  //  Unauthorized handling
  if (err?.response?.status === 401) {
    console.log("log me out");
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  //  Network error
  if (err?.code === "ERR_NETWORK") {
    throw new Error("Network Error, try again later");
  }

  //  Extract message safely
  const errMsg =
    err?.response?.data?.message || err?.message || "Something went wrong";

  throw new Error(errMsg); // consistent error type
};

 // EXPORT READY INSTANCE

export const api = buildInstance();
