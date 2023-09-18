require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const { error } = require("console");

const app = express();

app.use(
  cors({
    origin: "https://e-rocket-frontend.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DATABASE,
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

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM clients where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get Client error in SQL" });
    return res.json({ status: "Success", Result: result });
  });
});

// app.get("/get/:username", (req, res) => {
//   const username = req.params.username;
//   const sql = "SELECT * FROM clients where username = ?";
//   con.query(sql, [username], (err, result) => {
//     if (err) return res.json({ Error: "Get Client error in SQL" });
//     console.log(result);
//     return res.json({ status: "Success", Result: result });
//   });
// });

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  let sql = "UPDATE clients SET ";
  const updates = [];

  if (req.body.password) {
    updates.push("password = ?");
  }
  if (req.body.total_progress) {
    updates.push("total_progress = ?");
  }

  if (updates.length === 0) {
    return res.json({ Error: "No fields to update provided" });
  }

  sql += updates.join(", ");
  sql += " WHERE id = ?";

  const values = updates.map((field) => req.body[field.split(" ")[0]]);
  values.push(id);

  con.query(sql, values, (err, result) => {
    if (err) return res.json({ Error: "Update Client error in SQL" });
    return res.json({ status: "Success", Result: result });
  });

  // con.query(sql, [req.body.])
  console.log(req.body);
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM clients WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Delete Client error in SQL" });
    return res.json({ status: "Success", Result: result });
  });
});

// const verifyUser = (req, res, next) => {
//   const token = req.header("Authorization");
//   // const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Error: "You are not Authenticated" });
//   } else {
//     jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//       if (err) return res.json({ Error: "Wrong Token" });
//       req.userId = decoded.id; ////CGPT Store the user ID in the request object for later use
//       next();
//     });
//   }
// };
app.get("/dashboard", (req, res) => {
  if (req.session.username) {
    return res.json({ valid: true, username: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});
// app.get("/dashboard/clients", verifyUser, (req, res) => {
//   return res.json({ Status: "Success" });
// });

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  con.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) return res.json({ Error: "Error in Server" });
    if (result.length > 0) {
      req.session.username = result[0].username;
      console.log(req.session.username);
      // const id = result[0].id;
      // const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: "1d" });
      // res.cookie("token", token, {
      //   domain: "https://e-rocket-frontend.vercel.app",
      // });
      return res.json({ Login: true, username: req.session.username });
    } else {
      return res.json({ Login: false });
    }
  });
});

app.post("/clientlogin", (req, res) => {
  const sql = "SELECT * FROM clients WHERE username = ? AND password = ?";
  con.query(sql, [req.body.username, req.body.password], (err, result) => {
    if (err) return res.json({ Error: "Error in Server" });
    console.log(result);
    if (result.length > 0) {
      req.session.name = result[0].name;
      // console.log(req.session.name);
      // const id = result[0].id;
      // const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: "1d" });
      // res.cookie("token", token, {
      //   domain: "https://e-rocket-frontend.vercel.app",
      // });
      return res.json({ Login: true, name: req.session.name });
    } else {
      return res.json({ Login: false });
    }
  });
});

app.get("/client/:name", (req, res) => {
  const name = req.params.name;
  const sql = "SELECT * FROM clients WHERE name = ?";
  con.query(sql, [name], (err, result) => {
    if (err) return res.json({ Error: "Get client error in SQL" });
    return res.json({ status: "Success", Result: result });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});
app.post("/addclient", (req, res) => {
  console.log(req.body);
  const sqlAddClient =
    "INSERT INTO clients (`name`, `username`, `password`, `address`, `emissions_target`, `total_commitments`, `total_ghg_savings`, `total_progress`) VALUES (?)";
  // bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
  //   if (err) return res.json({ Error: "Error hashing password" });
  const values = [
    req.body.name,
    req.body.username,
    req.body.password,
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
  // });
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  const sqlSignUp =
    "INSERT INTO signup (`company_name`, `full_name`, `email`, `address`, `message`) VALUES (?)";

  const values = [
    req.body.company_name,
    req.body.full_name,
    req.body.email,
    req.body.address,
    req.body.message,
  ];
  con.query(sqlSignUp, [values], (err, result) => {
    if (err) return res.json({ Error: "Error in Adding Signup" });
    return res.json({ Status: "Success" });
  });
});

app.get("/registrants", (req, res) => {
  const sql = "SELECT * FROM signup";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get Signup error in SQL" });
    return res.json({ status: "Success", Result: result });
  });
});

app.listen(8081, () => {
  console.log("Running");
});
