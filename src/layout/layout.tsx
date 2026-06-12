import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function LayoutDashBord() {
  const [open, setOpen] = useState(true);
  function tuggle() {
    setOpen((prev) => !prev);
  }
  return (
    <>
      <main className="">
        <div className="flex  bg-slate-800 lg:h-screen w-full  ">
          <aside
            className={` hidden md:flex flex-col gap-5  h-full bg-slate-700 border-r 
               border-slate-300  transition-all duration-300  ${open ? "w-[20%]" : "w-[10%]"}`}
          >
            <button
              className="h-8 w-8 bg-rose-400  rounded ml-6 mt-2"
              onClick={tuggle}
            ></button>
            <div
              className={`h-8  bg-slate-500  rounded self-center flex px-2 items-center mt-4 ${open ? "w-45" : "w-15"}`}
            >
              <div
                className={`h-4 w-20 bg-slate-400  rounded ${open ? "block" : "hidden"}  `}
              ></div>
            </div>
            <div
              className={`h-4 bg-blue-400  rounded ml-5 ${open ? "w-20" : "w-4"}`}
            ></div>

            <Link to="user" className="text-slate-400">
              users
            </Link>
            <Link to="notify" className="text-slate-400">
              notification
            </Link>
            <Link to="coin" className="text-slate-400">
              coins
            </Link>
          </aside>
          <section className="flex flex-1 overflow-hidden  flex-col  gap-5   ">
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

            <section className="flex  flex-wrap md:flex-nowrap jusify-center items-center px-5 gap-4 ">
              <div
                className="h-54 w-full md:w-[45%]  rounded p-2 flex flex-1 justify text-white
                my-auto   "
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
