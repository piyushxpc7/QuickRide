const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3, // Minimum length of username
      maxlength: 50, // Maximum length of username
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please provide an email"],
      // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;