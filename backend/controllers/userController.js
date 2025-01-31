const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const createSignToken = require("../utils/createSignToken");
const catchAsync = require("../utils/catchAsync");

// register controller
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = await User.create({ username, email, password });
  //  Create a token for the user
  const token = createSignToken(newUser._id);
  // Send the token to the user in a cookie
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    secure: true,
    httpOnly: true,
  });

  res.status(201).json({
    status: "success",
    data: {
      userId: newUser._id,
    },
  });
});

// login controller
exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid email",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid password",
    });
  }

  const token = createSignToken(user._id);
  // Send the token to the user in a cookie
  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      userId: user._id,
    },
  });
});

// logout controller
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "success",
    message: "User logged out",
  });
};

// profile controller
exports.profile = catchAsync(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// update profile controller
exports.updateProfile = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findById(req.userId)
  

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  await user.save({ validateBeforeSave: true });
  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: {
      user,
    },
  });
});
