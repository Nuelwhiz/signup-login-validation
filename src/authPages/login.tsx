import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, LockIcon, MailIcon } from "lucide-react";
import { toast } from "react-toastify";
//import { useDispatch } from "react-redux";
import { loginUser } from "../authThunk/authThunk";
import { useAppDispatch } from "../hooks/hooks";
import { loginSchema } from "../validations/loginValidation";
import { useAuth } from "../context/AuthContext"; // 1. Import your useAuth hook

//LOGIN TYPE
interface Signing {
  email: string;
  password: string;
}
function Login() {
  //SHOW PASSWORD
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //USEFORM HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signing>({
    resolver: yupResolver(loginSchema),
  });
  //LOGIN SUBMIT
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleLogin = async (data: Signing) => {
    setIsLoading(true);

    try {
      const result = await dispatch(loginUser(data)).unwrap();

      console.log("LOGIN SUCCESS:", result);

      toast.success("Login successful");
      const token = result?.token || result?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      navigation("/DashBordLayout");
    } catch (error: any) {
      console.log("LOGIN FAILED:", error);
      toast.error(error?.message || error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <main className="w-full h-screen bg-cyan-50 flex items-center justify-center ">
        <div className="  rounded-2xl  bg-cyan-50 shadow-xl px-6  py-12 ">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-3 text-gray-600">
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl  text-gray-800 ">Log in</h1>
                <p>welcome! please enter your details</p>
              </div>
              <div className="flex flex-col relative">
                {/* <label htmlFor="email">Email address</label> */}
                <MailIcon size={17} className="absolute left-2 top-1.5 " />

                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Enter email"
                  autoComplete="email"
                  className=" pl-7 py-0.5 w-70 border border-gray-300 rounded-2xl"
                />
                <p className="text-red-600 text-xs">{errors.email?.message}</p>
              </div>
              <div className="flex flex-col relative">
                {/* <label htmlFor="password">passsword</label> */}
                <LockIcon size={17} className="absolute left-2 top-1.5  " />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded-2xl pl-7 py-0.5"
                />
                <span
                  className="absolute top-1.5 right-2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                </span>
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

              <button
                disabled={isLoading}
                className="bg-green-900 hover:bg-green-700 transition w-full py-1 rounded cursor-pointer my-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
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
