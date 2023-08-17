"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormValues {
  username: string;
  password: string;
}
const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  // const [data, setData] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (data: any) => {
    // alert(JSON.stringify(data));
    console.log(data);
    axios
      .post("http://localhost:8081/login", data)
      .then((res) => {
        // console.log(res),
        if (res.data.Status === "Success") {
          router.push("/dashboard");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} placeholder="User name" />

        <input {...register("password")} placeholder="password" />
        <p>{error && error}</p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
