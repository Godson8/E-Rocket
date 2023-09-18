"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuthProtection } from "../../../hooks/useAuthProtection";
import { useRouter } from "next/navigation";

const Registrants = () => {
  // useAuthProtection();
  const router = useRouter();
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

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    axios
      .get("https://e-rocket-backend.onrender.com/registrants")
      .then((res) => {
        if (res.data.status === "Success") {
          setData(res.data.Result);
          console.log(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(data);
  return (
    <div className="container">
      <h1>Registrants</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {data.map((registrants: any, index: any) => (
            <tr key={index}>
              <td>{registrants.company_name}</td>
              <td>{registrants.full_name}</td>
              <td>{registrants.email}</td>
              <td>{registrants.address}</td>
              <td>{registrants.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registrants;
