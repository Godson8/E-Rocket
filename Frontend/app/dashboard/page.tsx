"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .get("https://e-rocket-backend.onrender.com/dashboard")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.username);
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

  return <div>Logging</div>;
};

export default Page;
