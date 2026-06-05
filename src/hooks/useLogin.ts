import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidation from "../validations/signIn";
import { initialLoginVaue } from "../constant/formInitialVal";
import type { registered } from "../types/auth";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialLoginVaue,
    resolver: yupResolver(LoginValidation),
  });

  return {
    register,
    handleSubmit,
    errors,
  };

  const onSubmit = async(data: registered)
};
