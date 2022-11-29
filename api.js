const express = require("express");
const api = express();
const { indexController, notFoundController } = require("./controllers");
const { AppStarter } = require("./utils");
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

api.all("*", notFoundController);

api.listen(port, AppStarter(port));
