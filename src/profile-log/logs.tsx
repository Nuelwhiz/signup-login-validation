import { useDispatch } from "react-redux";
import { login, logOut } from "../features/user";

export default function Logs() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex gap-1 justify-center items-center">
        <button
          className="bg-amber-500 p-2.5 "
          onClick={() => {
            dispatch(
              login({ name: "emmanuel", age: 20, email: "emm@gmail.com" }),
            );
          }}
        >
          login user
        </button>
        <button
          className="bg-amber-500 p-2.5 "
          onClick={() => {
            dispatch(logOut());
          }}
        >
          log out
        </button>
      </div>
    </>
  );
}
