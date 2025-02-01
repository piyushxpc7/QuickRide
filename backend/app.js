const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const ridesRouter = require("./routes/ridesRoutes");
const globalErrorHandler = require("./controllers/errorController");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());




app.use("/api/users", userRouter);
app.use('/api/rides', ridesRouter)

app.all('*',(req , res,next)=>{
    const err = new AppError(`Can't find ${req.originalUrl} on this server`,404);
    next(err);
})

app.use(globalErrorHandler)

module.exports = app;