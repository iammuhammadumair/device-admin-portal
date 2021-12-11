module.exports = (app) => {
  const active_device = require("../controllers/active_device.controller.js");

  var router = require("express").Router();

  // Create a new active_device
  router.post("/", active_device.create);

  // Retrieve all active_device
  router.get("/", active_device.findAll);

  // Retrieve all published active_device
  //router.get("/published", active_device.findAllPublished);

  // Retrieve a single  active_device with id
  router.get("/available", active_device.findOne);

  // Retrieve a single  active_device with id
  router.get("/:id", active_device.findOne);

  // Update a active_device with id
  router.put("/:id", active_device.update);

  // Delete a active_device with id
  router.delete("/:id", active_device.delete);

  // Delete all active_device
  router.delete("/", active_device.deleteAll);

  app.use("/api/active-devices", router);
};
