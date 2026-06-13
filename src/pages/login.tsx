import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Import, LockIcon, MailIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useAppDispatch } from "../features/hooks";
import { logischema } from "../validations/loginValidation";

function Login() {
  interface Signing {
    email: string;
    password: string;
  }

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signing>({
    resolver: yupResolver(logischema),
  });

  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const handleLogin = async (data: Signing) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      console.log("LOGIN SUCCESS ✔");
      localStorage.setItem("token", result?.token || result?.data?.token);
      navigation("/LayoutDashBord");
      console.log("NAVIGATED ✔");
    } catch (error) {
      console.log("LOGIN FAILED", error);
    }
  };
  /* const handleLogin = async (data: Signing) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful");
      navigation("/Home");
    } else {
      toast.error("Invalid email or password");
    }
  };
 */
  /* 
  const login = async (data: Signing) => {
    const loginDetail = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        "https://api-coders.ipglobalreits.com/api/auth/sign-in",
        loginDetail,
      );

      toast.success("logged in successful", {
        position: "top-center",
      });

      setTimeout(() => {
        navigation("/Home");
      }, 3000);
      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      if (error) {
        toast.error("invalid email or password", {
          position: "top-center",
        });
      }

      
    }
  }; */
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
              <div className="flex flex-col relative">
                {/* <label htmlFor="password">passsword</label> */}
                <LockIcon size={17} className="absolute left-1 top-1.5  " />

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
