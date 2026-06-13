import * as yup from "yup";
export const signupSchema = yup.object().shape({
  fullname: yup.string().required("your full name is required"),
  email: yup.string().email("Not an email").required("Email ir required"),
  country: yup.string().required("country is required"),
  phone: yup
    .string()
    .required("phone number is require")
    .min(11, "invalid number"),

  password: yup
    .string()
    .required("password is required")
    .min(8, "less than 8 characters")
    .max(20, "more that 20 character"),
  comfirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password does not match")
    .required("comfirm password"),
});
