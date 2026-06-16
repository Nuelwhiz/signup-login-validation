import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LockIcon, KeyIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { resetPassword } from "../authThunk/authThunk";
import { useAppDispatch } from "../hooks/hooks";
import { resetPasswordSchema } from "../validations/resetValidation";
//import { ToastContainer, toast } from "react-toastify";

interface resetPassword {
  // email: string;
  password: string;
  comfirmPassword: string;
}

function ResetPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [comfirmShowPassword, setComfirmShowPassword] =
    useState<boolean>(false);

  //type FormData = yup.InferType<typeof schema>;
  const navigation = useNavigate();
  const { token } = useParams();
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPassword>({
    resolver: yupResolver(resetPasswordSchema),
  });
  const dispatch = useAppDispatch();

  //reset password
  const reset = async (data: resetPassword) => {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      await dispatch(
        resetPassword({
          password: data.password,
          token,
        }),
      ).unwrap();
      toast.success("Password reset successfully. Redirecting...");
      setTimeout(() => {
        navigation("/Login");
      }, 2000);
    } catch (error: any) {
      toast.error(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="w-full h-screen bg-cyan-50 flex items-center justify-center ">
        <div className="  rounded-2xl  bg-cyan-50 shadow-xl px-6  py-12 ">
          <form onSubmit={handleSubmit(reset)}>
            <div className="flex flex-col gap-3 text-gray-600 items-center">
              <div className="flex flex-col  justify-center items-center gap-2">
                <span className="bg-green-100 p-6 rounded-full">
                  <KeyIcon size={30} className=" text-3xl " />
                </span>

                <h1 className="text-2xl text-center  text-gray-800 ">
                  Reset password
                </h1>
                <p className=" max-w-70 text-center ">
                  {" "}
                  Reset password to secure your account
                </p>
              </div>

              {/*  */}
              <div>
                {/* <input
                  type="email"
                  id="email"
                  {...register("email")}
                  autoComplete="email"
                  className=" pl-6 py-0.5 w-70 border border-gray-300 rounded-2xl hidden"
                /> */}
              </div>
              {/*  */}
              <div className="flex flex-col relative">
                {/* <label htmlFor="password">passsword</label> */}
                <LockIcon size={17} className="absolute left-2 top-1.5 " />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded-2xl pl-7 py-0.5"
                />
                <p className="text-red-600 text-xs">
                  {errors.password?.message}
                </p>
                <span
                  className="absolute top-1.5 right-2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                </span>
              </div>
              <div className="flex flex-col relative">
                {/*  <label htmlFor="comfirm-password">Comfirm passsword</label> */}
                <LockIcon size={17} className="absolute left-2 top-1.5 " />

                <input
                  type={comfirmShowPassword ? "text" : "password"}
                  id="comfirm-password"
                  {...register("comfirmPassword")}
                  placeholder="comfirm new password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded-2xl pl-7 py-0.5"
                />

                <p className="text-red-600 text-xs">
                  {errors.comfirmPassword?.message}
                </p>
                <span
                  className="absolute top-1.5 right-2 cursor-pointer"
                  onClick={() => setComfirmShowPassword((prev) => !prev)}
                >
                  {comfirmShowPassword ? (
                    <Eye size={17} />
                  ) : (
                    <EyeOff size={17} />
                  )}
                </span>
              </div>
              <button className="bg-green-900 hover:bg-green-700 w-full py-1 rounded cursor-pointer my-2 text-white">
                {loading ? "loading..." : "Reset password"}
              </button>
              {msg && <p className="text-green-600 text-xs">{msg}</p>}

              {!token && <p className="text-red-600 text-xs">invalid code</p>}
              <div className="flex items-center justify-between ">
                <div className="flex-1 w-50 border border-gray-200 rounded "></div>
                <span className="px-3">OR</span>
                <div className="flex-1  border-gray-200 border rounded"></div>
              </div>

              <Link className=" text-sm text-green-600" to="/Login">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
export default ResetPassword;
