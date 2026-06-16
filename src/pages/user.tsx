import { useSelector } from "react-redux";
//import { logout } from "../authThunk/authSlice";
//import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

function User() {
  const selectUser = (state: any) => state.auth.user;
  //const selectAuth = (state: any) => state.auth;

  const user = useSelector(selectUser);

  return (
    <div className="">
      <h1 className="text-2xl font-bold">welcome back {user?.fullname}</h1>

      {/*  DISPLAY USER DATA */}
      {user ? (
        <div className="mt-5">
          <h2 className="text-green-600 text-xl"> user details </h2>

          <p>
            <strong className="text-amber-100">Name:</strong>{" "}
            {user?.fullname || "No name"}
          </p>
          <p>
            <strong className="text-amber-100">Email:</strong> {user?.email}
          </p>

          <p>
            <strong className="text-amber-100">phone:</strong> {user?.phone}
          </p>

          <p>
            <strong className="text-amber-100">country:</strong> {user?.country}
          </p>

          {/* If your API returns more fields */}
          <p>
            <strong className="text-amber-100">ID:</strong> {user?.id}
          </p>
        </div>
      ) : (
        <p className="text-red-500 mt-5">No user logged in</p>
      )}
    </div>
  );
}

export default User;
