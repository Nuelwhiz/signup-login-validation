import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface forgotMail {
  email: string;
}

function ForgotPassword() {
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [resendMsg, setResendMsg] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().email("Not an email").required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotMail>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let interval: number;
    if (successMsg && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setResendMsg(true);
    }
    return () => clearInterval(interval);
  }, [timer, successMsg]);
  //

  //const [codeDisplay, setCodeDisplay] = useState<boolean>(false);
  const navigate = useNavigate();

  const forgotPassCode = async (data: forgotMail) => {
    const resetDetail = {
      email: data.email,
    };
    try {
      const res = await axios.post(
        "https://api-coders.ipglobalreits.com/api/auth/forgot-password",
        resetDetail,
      );
      console.log(res.data);
      setSuccessMsg("verification code has been sent to your email");
      setTimer(60);
      setResendMsg(false);
      // navigate("/ResetPassword");
    } catch (error) {}
  };

  return (
    <>
      <main className="w-full h-screen bg-cyan-50 flex items-center justify-center ">
        <div className="  rounded-2xl  bg-cyan-50 shadow-xl px-6  py-12 ">
          <form onSubmit={handleSubmit(forgotPassCode)}>
            <div className="flex flex-col gap-3 text-gray-600 items-center">
              <div className="flex flex-col gap-1 justify-center items-center gap-2">
                <span className="bg-green-100 p-6 rounded-full">
                  <FaLock className=" text-3xl " />
                </span>

                <h1 className="text-2xl text-center  text-gray-800 ">
                  Forgot password?
                </h1>
                <p className=" max-w-[280px] text-center ">
                  No worries, enter email address and we'll send you a link to
                  reset password
                </p>
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
                  className=" pl-6 py-0.5 w-70 border border-gray-300 rounded-2xl"
                />
                <p className="text-red-600 text-xs">{errors.email?.message}</p>
              </div>

              <button
                disabled={!resendMsg && successMsg !== ""}
                className={` hover:bg-green-700 w-full py-1 rounded cursor-pointer my-3 text-white ${!resendMsg && successMsg !== "" ? "bg-gray-400" : "bg-green-900"}`}
              >
                {successMsg
                  ? resendMsg
                    ? "Resend code"
                    : `Resend in ${timer}s`
                  : "Send code"}
              </button>
              {successMsg && <p className="text-green-600"> {successMsg}</p>}

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
