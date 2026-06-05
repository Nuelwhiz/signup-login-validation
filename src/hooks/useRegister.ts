import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignupValidation from "../validations/register";
import { initialSignupVaue } from "../constant/formInitialVal";

export const useReisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialSignupVaue,
    resolver: yupResolver(SignupValidation),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
