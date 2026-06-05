import * as yup from "yup";

export default yup.object().shape({
    // email: yup.string().required(),
    password: yup
      .string()
      .required("password is required")
      .min(6, "less than 6 characters")
      .max(12, "more that 12 character"),
    comfirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "password does not match")
      .required("comfirm password")
  });
  