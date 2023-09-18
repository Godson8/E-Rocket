"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthProtection } from "../../../../hooks/useAuthProtection";

interface pageProps {
  params: { id: number };
}

const Page = ({ params }: any) => {
  // useAuthProtection();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { id } = useParams();
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
  useEffect(() => {
    axios
      .get("https://e-rocket-backend.onrender.com/get/" + id)
      .then((res) => {
        console.log("Fetched Data:", res.data.Result[0]);
        console.log("Fetched Data:", res);
        setData({
          ...data,
          name: res.data.Result[0].name,
          username: res.data.Result[0].username,
          password: res.data.Result[0].password,
          address: res.data.Result[0].address,
          emissions_target: res.data.Result[0].emissions_target,
          total_commitments: res.data.Result[0].total_commitments,
          total_ghg_savings: res.data.Result[0].total_ghg_savings,
          total_progress: res.data.Result[0].total_progress,
        });
        console.log(res);
        console.log(`${params.id}`);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("username", data.username);
    // formData.append("password", data.password);
    // formData.append("address", data.address);
    // formData.append("emissions_target", data.emissions_target);
    // formData.append("total_commitments", data.total_commitments);
    // formData.append("total_ghg_savings", data.total_ghg_savings);
    // formData.append("total_progress", data.total_progress);
    axios
      .put("https://e-rocket-backend.onrender.com/update/" + params.id, data)
      .then((res) => {
        if (res.data.status === "Success") {
          router.push("/dashboard/clients");
        }
      })
      .catch((err) => console.log(err));
  };

  const [data, setData] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    emissions_target: "",
    total_commitments: "",
    total_ghg_savings: "",
    total_progress: "",
  });

  console.log(data);
  return (
    <div className="flex justify-center w-full mt-16 md:mt-[100px]">
      <div className="max-w-2xl w-full p-5">
        <h2 className="text-lg font-primary text-gray-600 pb-3">
          Update Client {params.id}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <input
            {...register("name")}
            placeholder="Company Name"
            className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            value={data.name}
          />
          <input
            {...register("username")}
            placeholder="User name"
            className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            value={data.username}
          />
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="font-secondary text-sm">
              Password
            </label>
            <input
              {...register("password")}
              placeholder="Password"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
              defaultValue={data.password}
            />
          </div>
          <input
            {...register("address")}
            placeholder="Address"
            className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            value={data.address}
          />
          <input
            {...register("emissions_target")}
            placeholder="Emissions Target"
            className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            value={data.emissions_target}
          />
          <input
            {...register("total_commitments")}
            placeholder="Total Commitments"
            className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            value={data.total_commitments}
          />
          <input
            {...register("total_ghg_savings")}
            placeholder="Total GHG Savings"
            className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
            value={data.total_ghg_savings}
          />
          <div className="flex flex-col space-y-1">
            <label htmlFor="total_progress" className="font-secondary text-sm">
              Total Progress
            </label>
            <input
              {...register("total_progress")}
              placeholder="Total Progress"
              className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md"
              defaultValue={data.total_progress}
            />
          </div>
          <button
            type="submit"
            // disabled={isSubmitting}
            className="bg-green-400 text-white text-sm px-[18px] py-3 font-bold w-fit rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out flex items-center space-x-1 disabled:bg-tertiary disabled:text-secondary"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
