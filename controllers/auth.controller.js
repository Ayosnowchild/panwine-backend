const { User } = require("../models");
const bcrypt = require("bcryptjs");

const { validateSignupData } = require("../models/validators/auth.validator");

const SignupController = async (req, res) => {
  try {
    const { err } = validateSignupData(req.body);
    if (err) {
      return res.status(400).json(err);
    }
    let userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);
    console.log(salt);
    req.body.password = hash;
    const user = await User.create(req.body);
    res.status(201).json({
      message: "account created",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

module.exports = {
  SignupController,
};
