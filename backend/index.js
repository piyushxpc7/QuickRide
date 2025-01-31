const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/userRoutes");
const app = express();
app.use(express.json());
dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION ���� terminating server..");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true, // Ensures the URL parser is using the new method (no longer required in Mongoose 6)
    useUnifiedTopology: true, // Ensures the connection uses the new unified topology engine
  })
  .then((con) => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.use("/api/v1/users", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION 👋👋 terminating server..");
  server.close(() => {
    process.exit(1);
  });
});
