"use client";

import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Link from "next/link";
import axios from "axios";

const Clients = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/allclients")
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
      <Button title="Add new client" filled href="/dashboard/addclient" />
      <h1>Clintelle</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>User Name</th>
            <th>Address</th>
            <th>Emissions target</th>
            <th>Total commitments</th>
            <th>Total GHG Savings</th>
            <th>Total Progress</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody>
          {data.map((clientelle: any, index: any) => (
            <tr key={index}>
              <td>{clientelle.name}</td>
              <td>{clientelle.username}</td>
              <td>{clientelle.address}</td>
              <td>{clientelle.emissions_target}</td>
              <td>{clientelle.total_commitments}</td>
              <td>{clientelle.total_ghg_savings}</td>
              <td>{clientelle.total_progress}</td>
              <td>
                <button>edit</button>
                <button>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
