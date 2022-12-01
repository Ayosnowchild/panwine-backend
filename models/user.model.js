const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    username: String,
    phone: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
