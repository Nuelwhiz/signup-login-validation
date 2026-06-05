import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ForgotValidation from "../validations/forgot";
import { initialForgotVal } from "../constant/formInitialVal";

export const useReisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialForgotVal,
    resolver: yupResolver(ForgotValidation),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
