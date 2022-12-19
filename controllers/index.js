const authController = require("./auth.controller");
const productController = require("./product.controller");
const categoryController = require("./category.controller");
const middleware = require("./middlewares");
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

module.exports = {
  indexController,
  notFoundController,
  authController,
  middleware,
  productController,
  categoryController,
};
