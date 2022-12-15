const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    username: String,
    phone: String,
    password: String,
    resetToken: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

userSchema.method("generateToken", function () {
  let token = JWT.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.JWT_SECRET,
    { issuer: "http://loaclhost:7070", expiresIn: "6h" }
  );
  return token;
});

userSchema.method("checkPassword", function (password) {
  let valid = bcrypt.compareSync(password, this.password);
  return valid;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
