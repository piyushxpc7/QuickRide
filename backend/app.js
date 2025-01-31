const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/userRoutes");


const app = express();
app.use(express.json());
dotenv.config();




app.use("/api/users", router);

module.exports = app;