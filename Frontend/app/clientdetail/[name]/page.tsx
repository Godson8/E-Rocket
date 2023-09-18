"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function ClientDetail() {
  const [clients, setClients] = useState<any[]>([]);
  const { name } = useParams();
  // // const encodedEmail = name.split('@')[0];
  let encodedName = "";
  // Check if email is a string and split it
  if (typeof name === "string") {
    // encodedName = name.split("%")[0];
    const cleanedName = name.replace(/%7D$/, "");
    encodedName = decodeURIComponent(cleanedName);
  }
  console.log(name);
  console.log(encodedName);
  useEffect(() => {
    axios
      .get(`https://e-rocket-backend.onrender.com/client/${encodedName}`)

      .then((res) => {
        setClients(res.data.Result);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(clients);

  return (
    <div className="container mt-8">
      {/* {clients.map((client) => client.name)} */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>Logged in as {clients[0]?.username}</caption>
          <TableHead>
            <TableRow>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell align="right">Emmissions Target</StyledTableCell>
              <StyledTableCell align="right">
                Total Commitmments (Gallons)
              </StyledTableCell>
              <StyledTableCell align="right">
                Total GHG Savings (g CO2e/MJ)
              </StyledTableCell>
              <StyledTableCell align="right">Total Progress</StyledTableCell>
              <StyledTableCell align="right">
                {clients[0]?.name}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((client, index) => (
              <TableRow
                key={client.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="right">{client.emissions_target}</TableCell>
                <TableCell align="right">{client.total_commitments}</TableCell>
                <TableCell align="right">{client.total_ghg_savings}</TableCell>
                <TableCell align="right">{client.total_progress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClientDetail;
