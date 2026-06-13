import * as yup from "yup"

export const logischema = yup.object().shape({
    email: yup.string().email("Not an email").required("Email ir required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "less than 8 characters")
      .max(20, "more that 20 character"),
  });