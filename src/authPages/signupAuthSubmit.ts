import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validations/signupValidation";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/hooks";
import { registerUser } from "../authThunk/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const dispatch = useAppDispatch()
const navigate = useNavigate()
export interface registered {
  fullname: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  comfirmPassword: string;
}
export const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<registered>({
  resolver: yupResolver(signupSchema),
});

export const signupSubmit = async (data: registered) => {
    const signupData = {
      fullname: data.fullname,
      email: data.email,
      country: data.country,
      phone: data.phone,
      password: data.password,
    };
    try {
      await dispatch(registerUser(signupData)).unwrap();
      toast.success("signup successfully");
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      toast.error("reistration failed");
    }
  };

