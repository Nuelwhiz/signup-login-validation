import { post, get } from "../config/request";

export const authService = {
  register: (data: any) => post("/auth/sign-up", data),

  login: (data: { email: string; password: string }) =>
    post("/auth/sign-in", data),

  getUser: () => get("/auth/user"),

  forgotPassword: (data: { email: string }) =>
    post("/auth/forgot-password", data),

  resetPassword: (data: { password: string; token: string }) =>
    post("/auth/reset-password", data),
};