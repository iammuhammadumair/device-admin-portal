import {Router} from "express";
import {findOne , findAll , create , update , destroy , destroyAll , availables, initialRequirement} from "../controllers/device.controller.js";
export default (app  , middleware) => {

  var router = Router();

  // Create a new devices
  router.post("/", create);
  router.post("/initial-requirement", initialRequirement);

  // Retrieve all devices
  router.get("/", findAll);

  // Retrieve all published devices
  //router.get("/published", findAllPublished);

  // Retrieve a single  devices with id
  router.get("/availables", availables);

  // Retrieve a single  devices with id
  router.get("/:id", findOne);

  // Update a devices with id
  router.put("/:id", update);

  // Delete a devices with id
  router.delete("/:id", destroy);

  // Delete all devices
  router.delete("/", destroyAll);

  app.use("/api/devices",  middleware , router);
};
