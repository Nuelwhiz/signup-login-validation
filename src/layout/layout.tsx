import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logout } from "../authThunk/authSlice";
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function DashBordLayout() {
  const [open, setOpen] = useState(true);
  function tuggle() {
    setOpen((prev) => !prev);
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    navigate("/Login");
  };
  const location = useLocation();

  return (
    <>
      <main className="">
        <div className="flex  bg-slate-800 lg:h-screen w-full  ">
          <aside
            className={` hidden md:flex flex-col gap-5  h-full bg-slate-700 border-r 
               border-slate-300  transition-all duration-300  ${open ? "w-[20%]" : "w-[10%]"}`}
          >
            <button
              className=" w-fit  rounded ml-6 mt-2 cursor-pointer"
              onClick={tuggle}
            >
              {open ? (
                <PanelLeftClose
                  size={42}
                  className="text-gray-400 active:text-gray-300"
                />
              ) : (
                <PanelLeftOpen
                  size={42}
                  className="text-gray-400 active:text-gray-300"
                />
              )}
            </button>

            <div className={` flex flex-col  ${open ? "pr-15" : "pr-5"}`}>
              <Link
                to="user"
                className={`px-4 py-2 rounded-r-2xl flex items-center  ${
                  location.pathname.includes("/user")
                    ? "bg-gray-500 text-white"
                    : "text-slate-400 hover:bg-gray-600"
                }`}
              >
                User
              </Link>

              <Link
                to="notify"
                className={`   px-4 py-2 rounded-r-2xl ${
                  location.pathname.includes("/notify")
                    ? "bg-gray-500 text-white"
                    : "text-slate-400 hover:bg-gray-600"
                }`}
              >
                Notification
              </Link>
              <Link
                to="coin"
                className={`px-4 py-2 rounded-r-2xl  ${
                  location.pathname.includes("/coin")
                    ? "bg-gray-500 text-white"
                    : "text-slate-400 hover:bg-gray-600"
                }`}
              >
                Coins
              </Link>

              <button
                onClick={handleLogout}
                className="mt-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition w-fit ml-2 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </aside>
          <section className="flex flex-1 overflow-hidden  flex-col  gap-5 h-full   ">
            <header className="h-14 w-full border-b border-slate-300 bg-slate-700  flex items-center flex-wrap justify-between  px-5 ">
              <div className="h-8 w-40 md:w-70 bg-slate-400  rounded "></div>
              <div className="flex items-center gap-3 ">
                <div className="h-8 w-6 md:w-8 bg-slate-400  rounded  "></div>
                <div className="h-8 w-6 mm:w-8 bg-slate-400  rounded  "></div>
                <div className="h-8 w-8 md:w-12 bg-slate-400  rounded  "></div>

                <div className="h-8 w-6 md:w-8 bg-slate-400  rounded  "></div>
                <div className="h-8 w-6 md:w-8 bg-slate-400  rounded  "></div>
                <div className="h-8 w-6 md:w-8 bg-slate-400  rounded  "></div>
              </div>
            </header>
            {/* card section */}

            <section className="flex   flex-wrap md:flex-nowrap jusify-center items-center px-5 gap-4 ">
              <div
                className="h-fit w-full md:w-[45%]  rounded p-2 flex flex-1 justify text-white
                   "
              >
                <Outlet />
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}
