import type {
  initialSignupPayload,
  initialForgotVal,
  initialLoginVaue,
  initialResetVal,
} from "../constant/formInitialVal";
import { get, post, patch, pop } from "../config/request";

export const authService = {
  login: (data: initialLoginVaue) => post("/auth/signin", data),

  register: (data: initialSignupPayload) => post("/auth/signup", data),

  forgotPassword: (data: initialForgotVal) =>
    post("/auth/forgot-password", data),

  resetPassword: (data: initialResetVal) => patch("/auth/reset-password", data),

  getUser: () => get("/user"),
};
