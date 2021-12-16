import { Router } from "express";
import {
  create,
  findAll,
  findOne,
  update,
  destroy,
  destroyAll,
} from "../controllers/active_code.controller.js";

// import {Router} from
export default (app ,  middleware) => {
  const router = Router();
  //   var router = require("express").Router();

  // Create a new active_code
  router.post("/", create);

  // Retrieve all active_code
  router.get("/", findAll);

  // Retrieve all published active_code
  //router.get("/published", findAllPublished);

  // Retrieve a single  active_code with id
  router.get("/:id", findOne);

  // Update a active_code with id
  router.put("/:id", update);

  // Delete a active_code with id
  router.delete("/:id", destroy);

  // Delete all active_code
  router.delete("/", destroyAll);

  app.use("/api/codes",middleware, router);
};
