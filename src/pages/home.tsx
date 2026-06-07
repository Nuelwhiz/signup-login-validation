import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/Login");
  };

  return (
    <div className="p-5">
      {/*  <Link to="/" className="bg-green-900 px-4 py-2 rounded-2xl text-white">
        back to landing page
      </Link> */}
      <h1 className="text-2xl font-bold">Home Page......</h1>

      {/*  DISPLAY USER DATA */}
      {user ? (
        <div className="mt-5">
          <h2 className="text-green-600 text-xl">Welcome user </h2>

          <p>
            <strong>Name:</strong> {user?.fullname || "No name"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>phone:</strong> {user?.phone}
          </p>

          <p>
            <strong>country:</strong> {user?.country}
          </p>

          {/* If your API returns more fields */}
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>users profile</p>
        </div>
      ) : (
        <p className="text-red-500 mt-5">No user logged in</p>
      )}

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="mt-5 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
