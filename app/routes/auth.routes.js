import requestValidator from "../middlewares/request_validator.middleware.js";
import signupSchema from "../schemas/signup.schema.js";

import { login, register , requestForgotPassword, resetPassword } from "../controllers/auth.controller.js";

import { Router } from "express";
import changePasswordSchema from "../schemas/change_password.schema.js";

export default (app) => {
  //   const auth = require("../controllers/auth.controller.js");

  var router = Router();

  router.post("/login", login);
  router.post("/signup", requestValidator(signupSchema), register);
  router.post("/forgot-password", requestForgotPassword);
  router.post("/reset-password", requestValidator(changePasswordSchema), resetPassword);


  app.use("/api", router);
};
