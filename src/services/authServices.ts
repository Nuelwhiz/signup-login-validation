 
import { get, post, patch, pop } from "../config/request"

export const authService = {
  login: (data:  ) =>
    post("/auth/signin", data),

  register: (data:  ) =>
    post("/auth/signup", data),

  forgotPassword: (data: ) =>
    post("/auth/forgot-password", data),

  resetPassword: (data: ) =>
    patch("/auth/reset-password", data),

  getUser: () =>
    get("/user"), 
};
