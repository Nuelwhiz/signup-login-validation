/* import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { themeChanger } from "../features/theme";

export default function Color() {
  const [color, setColor] = useState<string>("");
  const dispatch = useDispatch();
  const changeCol = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };
  //const user = useSelector((state: any) => state.user.value);

  return (
    <>
      <div className="flex flex-col items-center w-full  mt-2 ">
        <input
          type="text"
          onChange={changeCol}
          className="bg-amber-200 border border-b-black rounded-2xl px-2"
        />
        <button
          onClick={() => {
            dispatch(themeChanger(color));
          }}
        >
          {" "}
          change color
        </button>
      </div>
    </>
  );
}
 */