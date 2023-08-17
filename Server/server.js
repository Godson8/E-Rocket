const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// const cookieParser = require("cookieParser");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
// app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "erocket",
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection:", err); // Print the error message
  } else {
    console.log("Connected");
  }
});

app.get("/allclients", (req, res) => {
  const sql = "SELECT * FROM clients";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get Client error in SQL" });
    return res.json({ status: "Success", Result: result });
  });
});
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users Where username = ? AND password = ?";
  con.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err)
      return res.json({ Error: "Error in Server", Error: "Error in running" });
    if (result.length > 0) {
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong username or password" });
    }
  });
});

app.post("/addclient", (req, res) => {
  console.log(req.body);
  const sqlAddClient =
    "INSERT INTO clients (`name`, `username`, `password`, `address`, `emissions_target`, `total_commitments`, `total_ghg_savings`, `total_progress`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error hashing password" });
    const values = [
      req.body.name,
      req.body.username,
      hash,
      req.body.address,
      req.body.emissions_target,
      req.body.total_commitments,
      req.body.total_ghg_savings,
      req.body.total_progress,
    ];
    con.query(sqlAddClient, [values], (err, result) => {
      if (err) return res.json({ Error: "Error in Adding Client" });
      return res.json({ Status: "Success" });
    });
  });
});

app.listen(8081, () => {
  console.log("Running");
});
