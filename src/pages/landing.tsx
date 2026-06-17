import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <main className="h-screen w-full bg-cyan-50 relative ">
        <header className="w-full p-4 flex justify-end">
          <Link
            to="/Login"
            className="bg-green-900 px-4 py-2 rounded-2xl text-white"
          >
            login/signup
          </Link>
        </header>

        <h1> welcome to my page</h1>
      </main>
    </>
  );
}
export default Landing;
