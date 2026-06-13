import * as yup from "yup"
export const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email("Not an email").required("Email is required"),
  });