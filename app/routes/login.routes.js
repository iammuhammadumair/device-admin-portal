module.exports = (app) => {
  const userAuth = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User Device
  router.post("/", userAuth.login);

  app.use("/api/login", router);
};
