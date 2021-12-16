import { Router } from "express";
import {
  findOne,
  create,
  findAll,
  destroy,
  destroyAll,
  update,
} from "../controllers/active_device.controller.js";
export default (app , middleware) => {
  const router = Router();
  // Create a new active_device
  router.post("/", create);

  // Retrieve all active_device
  router.get("/", findAll);

  // Retrieve all published active_device
  //router.get("/published", findAllPublished);

  // Retrieve a single  active_device with id
  router.get("/available", findOne);

  // Retrieve a single  active_device with id
  router.get("/:id", findOne);

  // Update a active_device with id
  router.put("/:id", update);

  // Delete a active_device with id
  router.delete("/:id", destroy);

  // Delete all active_device
  router.delete("/", destroyAll);

  app.use("/api/active-devices", middleware , router);
};
