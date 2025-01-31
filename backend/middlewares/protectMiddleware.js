const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new appError("You are not logged in. Please log in to get access.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded;
    next();
  } catch (error) {
    return next(new appError("Invalid token. Please log in again.", 401));
  }
};

module.exports = verifyToken;