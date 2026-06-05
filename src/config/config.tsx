import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
 
export const buildInstance = () => {
const instance: AxiosInstance = axios.create({
baseURL: process.env.REACT_APP_API_BASE_URL,
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
const token = localStorage.getItem("token");
if (token) {
instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
return instance;
};

//respons
export const extractResponseData = ({ data, status }: AxiosResponse): any => {
if (data?.message === "unauthorized access") {
console.log("unauthorized access");
}
if (status >= 400) {
console.log(data?.message);
throw new Error(data?.message);
}
return data;
};

//erro handler
export const errBody = (err: any) => {
if (err?.response?.statusText === "Unauthorized") {
console.log("log me out");
}
if (err?.code === "ERR_NETWORK") {
throw new Error("Network Error, try again later");
}
const errMsg =
err?.response?.data?.message || err?.message || "Something went wrong";
throw { message: errMsg };
};
