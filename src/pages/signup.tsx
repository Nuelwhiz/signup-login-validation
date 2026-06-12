import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../features/hooks";
import { registerUser } from "../features/authSlice";
import Country from "../country/countries.json";
import {
  Eye,
  EyeOff,
  LockIcon,
  PhoneIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface registered {
  fullname: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  comfirmPassword: string;
}

function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [comfirmShowPassword, setComfirmShowPassword] =
    useState<boolean>(false);

  const schema = yup.object().shape({
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registered>({
    resolver: yupResolver(schema),
  });
  const countries = Object.keys(Country)?.map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: registered) => {
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
      //navigate("/Login");
    } catch (error) {
      toast.error("reistration failed");
    }
  };

  return (
    <>
      <main className="w-full h-screen bg-cyan-50 flex items-center justify-center ">
        <div className="  rounded-2xl  bg-cyan-50 shadow-xl px-6  py-12 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 text-gray-600">
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl  text-gray-800 ">Signup</h1>
                <p>Create account to get started</p>
              </div>

              <div className="flex flex-col relative">
                {/*   <label htmlFor="name">Name</label> */}
                <UserIcon size={17} className="absolute left-1 top-1.5 " />

                <input
                  type="text"
                  {...register("fullname")}
                  id="name"
                  placeholder="Full Name"
                  autoComplete="name"
                  className=" pl-6 py-0.5 w-70 border border-gray-300 rounded-2xl"
                />
                <p className="text-red-600 text-xs">
                  {errors.fullname?.message}
                </p>
              </div>
              <div className="flex flex-col relative">
                {/* <label htmlFor="email">Email address</label> */}
                <MailIcon size={17} className="absolute left-1 top-1.5 " />

                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Enter email"
                  autoComplete="email"
                  className=" pl-6 py-0.5 w-70 border border-gray-300 rounded-2xl"
                />
                <p className="text-red-600 text-xs">{errors.email?.message}</p>
              </div>

              {/*  */}
              <div className="flex flex-col relative">
                <select
                  className="w-full border border-gray-300 rounded-2xl py-0.5 "
                  {...register("country")}
                >
                  <option value="" defaultChecked className="text-gray-100">
                    {" "}
                    Choose country
                  </option>
                  {countries}
                </select>
              </div>

              {/*start  */}
              <div className="flex flex-col relative">
                {/* <label htmlFor="email">Email address</label> */}
                {/* <MdEmail className="absolute left-1 top-1.5 " /> */}
                <PhoneIcon size={17} className="absolute left-1 top-1.5 " />

                <input
                  type="tel"
                  id=""
                  {...register("phone")}
                  placeholder="Enter phone number"
                  autoComplete="phone"
                  className=" pl-6 py-0.5 w-70 border border-gray-300 rounded-2xl"
                />

                <p className="text-red-600 text-xs">{errors.phone?.message}</p>
              </div>

              {/* end */}
              <div className="flex flex-col relative">
                {/* <label htmlFor="password">passsword</label> */}
                <LockIcon size={17} className="absolute left-1 top-1.5 " />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded-2xl pl-6 py-0.5"
                />
                <span
                  className="absolute top-1.5 right-1 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                </span>

                <p className="text-red-600 text-xs">
                  {errors.password?.message}
                </p>
              </div>
              <div className="flex flex-col relative">
                {/*  <label htmlFor="comfirm-password">Comfirm passsword</label> */}
                <LockIcon size={17} className="absolute left-1 top-1.5 " />

                <input
                  type={comfirmShowPassword ? "text" : "password"}
                  id="comfirm-password"
                  {...register("comfirmPassword")}
                  placeholder="comfirm password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded-2xl pl-6 py-0.5"
                />

                <span
                  className="absolute top-1.5 right-1 cursor-pointer"
                  onClick={() => setComfirmShowPassword((prev) => !prev)}
                >
                  {comfirmShowPassword ? (
                    <Eye size={17} />
                  ) : (
                    <EyeOff size={17} />
                  )}
                </span>
                <p className="text-red-600 text-xs">
                  {errors.comfirmPassword?.message}
                </p>
              </div>
              <div className=" flex items-center">
                <div className=" flex items-center">
                  <input
                    type="checkbox"
                    id="agree"
                    className=" border border-gray-300 rounded-2xl"
                  />
                  <label
                    htmlFor="agree"
                    className="
                 text-sm pl-1"
                  >
                    agree to
                  </label>
                </div>
                <Link className="text-sm text-green-600 pl-2" to="">
                  Terms & privacy policy
                </Link>
              </div>
              <button className="bg-green-900 hover:bg-green-700 w-full py-1 rounded cursor-pointer my-1 text-white">
                Signup
              </button>

              <p>{!errors && "registers successfully"}</p>

              <div className="flex items-center justify-between ">
                <div className="flex-1 w-50 border border-gray-200 rounded "></div>
                <span className="px-3">OR</span>
                <div className="flex-1  border-gray-200 border rounded"></div>
              </div>
              <p className="text-center">
                {" "}
                Already have an account?
                <Link className=" text-sm text-green-600" to="/Login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
export default Signup;
