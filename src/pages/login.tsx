import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Signing {
  email: string;
  password: string;
}

function Login() {
  const logischema = yup.object().shape({
    email: yup.string().email("Not an email").required("Email ir required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "less than 6 characters")
      .max(12, "more that 12 character"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signing>({
    resolver: yupResolver(logischema),
  });
  const navigation = useNavigate();
  

  const login = async (data: Signing) => {
    try {
      console.log(data);
      navigation("/Home");
    } catch (error) {}
  };
  return (
    <>
      <main className="w-full h-screen bg-cyan-50 flex items-center justify-center ">
        <div className="  rounded-2xl  bg-cyan-50 shadow-xl px-6  py-12 ">
          <form onSubmit={handleSubmit(login)}>
            <div className="flex flex-col gap-3 text-gray-600">
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl  text-gray-800 ">Log in</h1>
                <p>welcome! please enter your details</p>
              </div>
              <div className="flex flex-col relative">
                {/* <label htmlFor="email">Email address</label> */}
                <MdEmail className="absolute left-1 top-1.5 " />

                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Enter email"
                  autoComplete="email"
                  className=" pl-6 py-0.5 w-70 border border-gray-300 rounded"
                />
                <p className="text-red-600 text-xs">{errors.email?.message}</p>
              </div>
              <div className="flex flex-col relative">
                {/* <label htmlFor="password">passsword</label> */}
                <FaLock className="absolute left-1 top-1.5 " />

                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded pl-6 py-0.5"
                />
                <p className="text-red-600 text-xs">
                  {errors.password?.message}
                </p>
              </div>
              <div className="flex justify-between">
                <div className="">
                  <input
                    type="checkbox"
                    id="remember"
                    className=" border border-gray-300 rounded "
                  />
                  <label htmlFor="remember" className="pl-1">
                    Remember
                  </label>
                </div>
                <Link className="text-sm text-green-600" to="/ForgotPassword">
                  ForgotPassword?
                </Link>
              </div>
              <button className="bg-green-900  hover:bg-green-700 transition w-full py-1 rounded cursor-pointer my-2 text-white">
                Login
              </button>

              <div className="flex items-center justify-between ">
                <div className="flex-1 w-50 border border-gray-200 rounded "></div>
                <span className="px-3">OR</span>
                <div className="flex-1  border-gray-200 border rounded"></div>
              </div>
              <p className="text-center">
                {" "}
                Dont have an account?{" "}
                <Link className=" text-sm text-green-600" to="/Signup">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
export default Login;
