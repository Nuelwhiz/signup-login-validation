import { useSelector } from "react-redux";
/* 
interface user {
  name: string;
  age: number;
  email: string;
} */
export default function Profile() {
  const user = useSelector((state: any) => state.user.value);

  return (
    <>
      <div className="flex flex-col items-center w-full  ">
        {" "}
        <h1>name: {user.name} </h1>
        <h1>age: {user.age}</h1>
        <h1>email: {user.email}</h1>
      </div>
    </>
  );
}
