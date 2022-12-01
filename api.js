const express = require("express");
const api = express();
const {
  indexController,
  notFoundController,
  authController,
} = require("./controllers");
const { AppStarter } = require("./utils");
const {
  validateSignUpMiddlewareData,
} = require("./models/validators/auth.validator");
const port = 7070;
// form reading middleware configuration
api.use(express.json());

// middleware to read formdata/urlencoded reqbody
api.use(
  express.urlencoded({
    extended: true,
  })
);

api.get("/", indexController);

api.post(
  "/signup",
  validateSignUpMiddlewareData,
  authController.SignupController
);
// api.post("/signup", authController.SignupController);

api.all("*", notFoundController);

api.listen(port, AppStarter(port));
