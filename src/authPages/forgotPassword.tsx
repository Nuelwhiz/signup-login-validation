import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LockIcon, MailIcon } from "lucide-react";
import { useAppDispatch } from "../hooks/hooks";
import { forgotPassword } from "../authThunk/authSlice";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "../validations/forgotValidation";

interface forgotMail {
  email: string;
}
function ForgotPassword() {
  // const [successMsg, setSuccessMsg] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [resendMsg, setResendMsg] = useState<boolean>(false);
  const [resentMsg, setResentMsg] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotMail>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  //60s count
  useEffect(() => {
    if (!resentMsg) return;
    if (timer === 0) {
      setResendMsg(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, resentMsg]);

  //const [codeDisplay, setCodeDisplay] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //request
  const forgotPassCode = async (data: forgotMail) => {
    const resetDetail = {
      email: data.email,
    };
    try {
      await dispatch(forgotPassword({ email: data.email }));
      toast.success("verification code has been sent to your email", {
        position: "top-center",
      });
      //console.log(res.data);
      setResentMsg(true);
      setTimer(60);
      setResendMsg(false);
      //navigate("/ResetPassword");
    } catch (error: any) {
      toast.error("something went wrong!", { position: "top-center" });
      console.log(error.response.data);
    }
  };

  return (
    <>
      <main className="w-full h-screen bg-cyan-50 flex items-center justify-center ">
        <div className="  rounded-2xl  bg-cyan-50 shadow-xl px-6  py-12 ">
          <form onSubmit={handleSubmit(forgotPassCode)}>
            <div className="flex flex-col gap-3 text-gray-600 items-center">
              <div className="flex flex-col  justify-center items-center gap-2">
                <span className="bg-green-100 p-6 rounded-full">
                  <LockIcon size={30} />
                </span>

                <h1 className="text-2xl text-center  text-gray-800 ">
                  Forgot password?
                </h1>
                <p className=" max-w-70 text-center ">
                  No worries, enter email address and we'll send you a link to
                  reset password
                </p>
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

              <button
                disabled={!resendMsg && resentMsg}
                className={` w-full py-1 rounded  
                  my-3 text-white ${!resendMsg && !resentMsg ? "bg-green-900  hover:bg-green-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
              >
                {resentMsg
                  ? resendMsg
                    ? "Resend code"
                    : `Resend in ${timer}s`
                  : "Send code"}
              </button>

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
export default ForgotPassword;
