import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface registered {
  name: string;
  email: string;
  password: string;
  comfirmPassword: string;
}

function Signup() {
  const schema = yup.object().shape({
    name: yup.string().required("your full name is required"),
    email: yup.string().email("Not an email").required("Email ir required"),
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
  } = useForm<registered>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();


  const onSubmit = async (data: registered) => {
    //https://api-coders.ipglobalreits.com/api/
    try {
      const res = await axios("");
      console.log(data);
      navigate("/Login");
    } catch (error) {}
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
                <FaUser className="absolute left-1 top-1.5 " />

                <input
                  type="text"
                  {...register("name")}
                  id="name"
                  placeholder="Full Name"
                  autoComplete="name"
                  className=" pl-6 py-0.5 w-70 border border-gray-300 rounded"
                />
                <p className="text-red-600 text-xs">{errors.name?.message}</p>
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
              <div className="flex flex-col relative">
                {/*  <label htmlFor="comfirm-password">Comfirm passsword</label> */}
                <FaLock className="absolute left-1 top-1.5 " />

                <input
                  type="password"
                  id="comfirm-password"
                  {...register("comfirmPassword")}
                  placeholder="comfirm password"
                  autoComplete="new-password"
                  className=" w-70 border border-gray-300 rounded pl-6 py-0.5"
                />
                <p className="text-red-600 text-xs">
                  {errors.comfirmPassword?.message}
                </p>
              </div>
              <div className=" flex items-center">
                <div className=" flex items-center">
                  <input
                    type="checkbox"
                    id="agree"
                    className=" border border-gray-300 rounded"
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
