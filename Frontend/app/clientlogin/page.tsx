"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormValues {
  username: string;
  password: string;
}
const ClientLogin = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;
  // const [data, setData] = useState("");
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");
  const onSubmit = (data: any) => {
    // alert(JSON.stringify(data));
    console.log(data);
    axios
      .post("https://e-rocket-backend.onrender.com/clientlogin", data)
      .then((res) => {
        console.log(res);
        if (res.data.Login) {
          const name = res.data.name;
          router.push(`/clientdetail/${name}}`);
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-purple-300 w-screen h-screen flex items-center justify-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col max-w-xl w-full py-20 rounded-2xl space-y-5 items-center"
      >
        <h1 className="text-2xl font-primary text-gray-600">Client Sign In</h1>
        <input
          {...register("username")}
          placeholder="User name"
          className="px-4 py-3 bg-[#F2F7FF] text-primary md:w-[300px] focus:border focus:outline-none focus:border-primary rounded-md"
        />

        <input
          {...register("password")}
          placeholder="Password"
          className="px-4 py-3 bg-[#F2F7FF] text-primary md:w-[300px] focus:border focus:outline-none focus:border-primary rounded-md"
        />
        <p>{error && error}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-400 text-white text-sm px-[18px] py-3 font-bold w-fit rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out flex items-center space-x-1 disabled:bg-tertiary disabled:text-secondary"
        >
          {/* {isSubmitting && (
            <span className="spinner-border spinne spinner-border-sm mr-1"></span>
          )} */}
          Login
        </button>
      </form>
    </div>
  );
};

export default ClientLogin;
