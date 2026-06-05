import * as yup from "yup";

export default yup.object().shape({
  email: yup.string().email("Not an email").required("Email is required"),
});
