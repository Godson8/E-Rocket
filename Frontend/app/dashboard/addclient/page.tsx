"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthProtection } from "../../../hooks/useAuthProtection";

const Page = () => {
  // useAuthProtection();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("https://e-rocket-backend.onrender.com/dashboard")
      .then((res) => {
        if (res.data.valid) {
          // User is authenticated, continue rendering the dashboard
        } else {
          router.push("/login"); // Redirect to the login page if not authenticated
        }
        console.log(res);
      })
      .catch((error) => {
        // router.push("/login"); // Handle network errors by redirecting to login
        console.error(error);
      });
  }, []);
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
    axios
      .post("https://e-rocket-backend.onrender.com/addclient", data)
      .then((res) => {
        router.push("/dashboard/clients");
      });
  };
  return (
    <div className="flex justify-center w-full mt-16 md:mt-[100px]">
      <div className="max-w-2xl w-full p-5">
        <h2 className="text-lg font-primary text-gray-600 pb-3">Add Client</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="font-secondary text-sm">
              Company Name
            </label>
            <input
              {...register("name")}
              // placeholder="Company Name"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="font-secondary text-sm">
              User Name
            </label>
            <input
              {...register("username")}
              // placeholder="User name"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-secondary text-sm">
              Password
            </label>
            <input
              {...register("password")}
              // placeholder="Password"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="address" className="font-secondary text-sm">
              Address
            </label>
            <input
              {...register("address")}
              // placeholder="Address"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="emissions_target"
              className="font-secondary text-sm"
            >
              Emissions Target
            </label>
            <input
              {...register("emissions_target")}
              // placeholder="Emissions Target"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="total_commitments"
              className="font-secondary text-sm"
            >
              Total Commitments
            </label>
            <input
              {...register("total_commitments")}
              // placeholder="Total Commitments"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="total_ghg_savings"
              className="font-secondary text-sm"
            >
              Total GHG Savings
            </label>
            <input
              {...register("total_ghg_savings")}
              // placeholder="Total GHG Savings"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="total_progress" className="font-secondary text-sm">
              Total Progress
            </label>
            <input
              {...register("total_progress")}
              // placeholder="Total Progress"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            />
          </div>

          <button
            type="submit"
            // disabled={isSubmitting}
            className="bg-green-400 text-white text-sm px-[18px] py-3 font-bold w-fit rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out flex items-center space-x-1 disabled:bg-tertiary disabled:text-secondary"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
