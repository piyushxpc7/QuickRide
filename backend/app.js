const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
const router = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());
dotenv.config();




app.use("/api/users", router);

app.all('*',(req , res,next)=>{
    const err = new AppError(`Can't find ${req.originalUrl} on this server`,404);
    next(err);
})

app.use(globalErrorHandler)

module.exports = app;