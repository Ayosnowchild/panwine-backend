const express = require("express");
const api = express();
const path = require("path");
const {
  indexController,
  notFoundController,
  authController,
  productController,
  categoryController,
  middleware,
} = require("./controllers");
const { AppStarter } = require("./utils");
const {
  validateSignUpMiddlewareData,
  validateLoginMiddlewareData,
  validatePasswordChangeMiddlewareData,
} = require("./controllers/validators/auth.validator");
const {
  validateProductMiddleware,
  validateProductUpdateMiddleware,
} = require("./controllers/validators/product.validator");
const { ChangePasswordController } = require("./controllers/auth.controller");
const port = 7070;
// form reading middleware configuration
api.use(express.json());

// middleware to read formdata/urlencoded reqbody
api.use(
  express.urlencoded({
    extended: true,
  })
);
api.use(express.static(path.join(__dirname, "public")));
api.get("/", indexController);

api.post(
  "/signup",
  validateSignUpMiddlewareData,
  authController.SignupController
);
// api.post("/signup", authController.SignupController);
api.post("/login", validateLoginMiddlewareData, authController.loginController);

api.put(
  "/password",
  validatePasswordChangeMiddlewareData,
  middleware.isTokenValid,
  authController.ChangePasswordController
);

api.post("/forgot-password", authController.RequestPasswordResetController);

api.get("/category", categoryController.FetchAll);
api.get("/category/:id", categoryController.FetchById);
api.post("/category", middleware.isUserAdmin, categoryController.Create);
api.put("/category/:id", middleware.isUserAdmin, categoryController.Update);
api.delete("/category/:id", middleware.isUserAdmin, categoryController.Delete);

api.post(
  "/product",
  middleware.isUserAdmin,
  validateProductMiddleware,
  productController.Create
);
api.get("/product", productController.FetchAll);
api.get("/product/:id", productController.FetchById);
api.put(
  "/product/:id",
  middleware.isUserAdmin,
  validateProductUpdateMiddleware,
  productController.Update
);
api.delete("/product/:id", middleware.isUserAdmin, productController.Delete);

api.all("*", notFoundController);

api.listen(port, AppStarter(port));
