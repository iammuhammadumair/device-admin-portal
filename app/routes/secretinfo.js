module.exports = (app) => {
  //const userAuth = require("../controllers/user.controller.js");

  const passport = require("passport");
  var router = require("express").Router();

  // Create a new User Device
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send("HELLO MOHSIN");
    }
  );

  app.use("/api/secretinfo", router);
};
