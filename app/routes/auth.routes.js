// const requestValidator = require("../middlewares/request_validator.middleware.js");
import requestValidator from "../middlewares/request_validator.middleware.js";
import signupSchema from "../schemas/signup.schema.js";

import { login, register } from "../controllers/auth.controller.js";

import { Router } from "express";

export default (app) => {
  //   const auth = require("../controllers/auth.controller.js");

  var router = Router();

  router.post("/login", login);
  router.post("/signup", requestValidator(signupSchema), register);

  app.use("/api", router);
};
