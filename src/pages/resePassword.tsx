import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaKey, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface resetPassword {
  password: string;
  comfirmPassword: string;
}

function ResetPassword() {
  const logischema = yup.object().shape({
    password: yup
      .string()
      .required("password is required")
      .min(6, "less than 6 characters")
      .max(12, "more that 12 character"),
    comfirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "password does not match")
      .required("comfirm password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPassword>({
    resolver: yupResolver(logischema),
  });
  const navigation = useNavigate();

  const reset = async (data: resetPassword) => {
    try {
      console.log(data);
      navigation("/Login");
    } catch (error) {}
  };

  return (
    <>
      <main className="w-full h-screen bg-cyan-50 flex items-center justify-center ">
        <div className="  rounded-2xl  bg-cyan-50 shadow-xl px-6  py-12 ">
          <form onSubmit={handleSubmit(reset)}>
            <div className="flex flex-col gap-3 text-gray-600 items-center">
              <div className="flex flex-col gap-1 justify-center items-center gap-2">
                <span className="bg-green-100 p-6 rounded-full">
                  <FaKey className=" text-3xl " />
                </span>

                <h1 className="text-2xl text-center  text-gray-800 ">
                  Reset password
                </h1>
                <p className=" max-w-[280px] text-center ">
                  {" "}
                  Reset password to secure your account
                </p>
              </div>
              <div className="flex flex-col relative">
                {/* <label htmlFor="password">passsword</label> */}
                <FaLock className="absolute left-1 top-1.5 " />

                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded pl-6 py-0.5"
                />
                <p className="text-red-600 text-xs">
                  {errors.password?.message}
                </p>
              </div>
              <div className="flex flex-col relative">
                {/*  <label htmlFor="comfirm-password">Comfirm passsword</label> */}
                <FaLock className="absolute left-1 top-1.5 " />

                <input
                  type="password"
                  id="comfirm-password"
                  {...register("comfirmPassword")}
                  placeholder="comfirm new password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded pl-6 py-0.5"
                />

                <p className="text-red-600 text-xs">
                  {errors.comfirmPassword?.message}
                </p>
              </div>
              <button className="bg-green-900 hover:bg-green-700 w-full py-1 rounded cursor-pointer my-2 text-white">
                Reset password
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
export default ResetPassword;
