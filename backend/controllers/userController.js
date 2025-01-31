const User = require("../models/userModels");
const createSignToken = require("../utils/createSignToken");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
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
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
