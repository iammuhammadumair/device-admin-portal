const requestValidator = require("../middlewares/request_validator.middleware.js");
const signupSchema = require("../schemas/signup.schema.js");

module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  router.post("/login", auth.login);
  router.post("/signup",requestValidator(signupSchema) ,  auth.register);

  app.use("/api", router);
};
