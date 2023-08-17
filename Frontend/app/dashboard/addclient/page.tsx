"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const onSubmit = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("emissions_target", data.emissions_target);
    formData.append("total_commitments", data.total_commitments);
    formData.append("total_ghg_savings", data.total_ghg_savings);
    formData.append("total_progress", data.total_progress);
    axios.post("http://localhost:8081/addclient", data).then((res) => {
      router.push("/dashboard/clients");
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Company Name" />
        <input {...register("username")} placeholder="User name" />
        <input {...register("password")} placeholder="Password" />
        <input {...register("address")} placeholder="Address" />
        <input
          {...register("emissions_target")}
          placeholder="Emissions Target"
        />
        <input
          {...register("total_commitments")}
          placeholder="Total Commitments"
        />
        <input
          {...register("total_ghg_savings")}
          placeholder="Total GHG Savings"
        />
        <input {...register("total_progress")} placeholder="Total Progress" />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Page;
