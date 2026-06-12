import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Landing() {
  return (
    <>
      <ToastContainer />
      <main className="h-screen w-full bg-cyan-50 relative ">
        <header className="w-full p-4 flex justify-end">
          <Link
            to="/Login"
            className="bg-green-900 px-4 py-2 rounded-2xl text-white"
          >
            login/signup
          </Link>

          <Link
            to="/User"
            className="bg-green-900 px-4 py-2 rounded-2xl text-white"
          >
            home
          </Link>

          <button
            onClick={() =>
              toast.success("clicked successfully", {
                position: "top-center",
              })
            }
          >
            handle
          </button>
        </header>
      </main>
    </>
  );
}
export default Landing;
