const { User } = require("../models");

const SignupController = async (req, res) => {
  try {
    let userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const user = new User(req.body);
    const token = user.generateToken();
    await user.save();
    return res.status(201).json({
      message: "account created",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        fullName: user.fullName,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const loginController = async (req, res) => {
  try {
    let userExist = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (!userExist) {
      return res.status(404).json({
        message: "You have no account, signup instaed",
      });
    }
    const passwordCorrect = userExist.checkPassword(req.body.password);
    if (!passwordCorrect) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
    const token = userExist.generateToken();
    return res.status(200).json({
      message: "login succesful",
      token,
      user: {
        _id: userExist._id,
        fullName: userExist.fullName,
        email: userExist.email,
        phone: userExist.phone,
        username: userExist.username,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server issues",
    });
  }
};

const ChangePasswordController = async (req, res, next) => {
  try {
    const { password, oldPassword } = req.body;
    const user = await User.findById(req.user._id);
    let passwordCorrect = user.checkPassword(oldPassword);
    if (!passwordCorrect) {
      return res.status(400).json({
        message: "password incorrect",
      });
    }
    user.password = password;
    user.save();
    return res.status(200).json({
      message: "password changed",
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
  loginController,
  ChangePasswordController,
};
