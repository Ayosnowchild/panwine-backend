const { User } = require("../models");
const ejs = require("ejs");
const path = require("path");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const { SendEmail } = require("./services");

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

const RequestPasswordResetController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "email is required" });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: " user not found" });
    }
    const templatePath = path.join(process.cwd(), "/views/index.ejs");
    console.log(templatePath);
    let resetToken = crypto.randomBytes(24).toString("hex");
    console.log(resetToken);
    user.resetToken = resetToken;
    await user.save();
    const url = process.env.FRONTEND_URL + "/password-reset/" + resetToken;
    const body = await ejs.renderFile(templatePath, { user, url });
    // console.log(body);
    SendEmail({
      receiver: user.email,
      subject: "Panwine Password Reset",
      body: body,
    });
    res.status(200).json({
      message: "pasword reset sent, check your email",
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
  RequestPasswordResetController,
};
