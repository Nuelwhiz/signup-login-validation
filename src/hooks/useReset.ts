import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import resetValidation from "../validations/reset";
import { initialResetVal } from "../constant/formInitialVal";

export const useReisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialResetVal,
    resolver: yupResolver(resetValidation),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
