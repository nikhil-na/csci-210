const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const { dot } = require("node:test/reporters");

//db connection
mongoose
  .connect(process.env.DBURI)
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });

//routes
app.use(userRoutes);
