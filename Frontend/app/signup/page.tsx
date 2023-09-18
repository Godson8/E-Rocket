"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Page = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const onSubmit = (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("company_name", data.name);
    formData.append("full_name", data.username);
    formData.append("email", data.password);
    formData.append("address", data.address);
    formData.append("message", data.address);
    axios
      .post("https://e-rocket-backend.onrender.com/signup", data)
      .then((res) => {
        if (res.data.Status === "Success") {
          // Clear the form input values after successful POST
          reset(); // Reset the form to initial empty values
          setOpen(true);
        }
        // Handle other responses here
      })
      .catch((error) => {
        console.error(error);
        // Handle error responses here
      });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Header />
      <div className="flex justify-center w-full mt-16 md:mt-[100px]">
        <div className="max-w-2xl w-full p-5">
          <h2 className="text-2xl font-primary text-center text-gray-600 pb-3">
            Sign Up
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="company_name" className="font-secondary text-sm">
                Company Name
              </label>
              <input
                {...register("company_name", { required: true })}
                // placeholder="Company Name"
                className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md font-primary text-slate-600"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="full_name" className="font-secondary text-sm">
                Full Name
              </label>
              <input
                {...register("full_name", { required: true })}
                // placeholder="Full name"
                className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md font-primary text-slate-600"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="font-secondary text-sm">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                // placeholder="Email"
                className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md font-primary text-slate-600"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="address" className="font-secondary text-sm">
                Address
              </label>
              <input
                {...register("address", { required: true })}
                // placeholder="Address"
                className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md font-primary text-slate-600"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="message" className="font-secondary text-sm">
                Message
              </label>
              <textarea
                rows={5}
                {...register("message", { required: true })}
                // placeholder="message"
                className="px-4 py-3 bg-[#F2F7FF] text-primary w-full focus:border focus:outline-none focus:border-primary rounded-md font-primary text-slate-600 resize-none"
              />
            </div>

            <button
              type="submit"
              // disabled={isSubmitting}
              className="bg-green-400 text-white text-sm px-[18px] py-3 font-bold w-fit rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out flex items-center space-x-1 disabled:bg-tertiary disabled:text-secondary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Success</AlertTitle>
          Thank you. Our team will get in touch with you as soon as possible 😊
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>
          Sorry, please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Page;
