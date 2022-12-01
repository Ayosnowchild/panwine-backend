const authController = require("./auth.controller");

const indexController = (req, res) => {
  res.status(200).json({
    message: "hello from my api",
  });
};

const notFoundController = (req, res) => {
  res.status(400).json({
    message: "page not found",
  });
};

module.exports = { indexController, notFoundController, authController };
