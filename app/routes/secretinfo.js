import passport from "passport";
import { Router } from "express";
export default (app , middleware) => {
  const router = Router();
  //const userAuth = require("../controllers/user.controller.js");

  // Create a new User Device
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send("HELLO MOHSIN");
    }
  );

  app.use("/api/secretinfo",middleware, router);
};
