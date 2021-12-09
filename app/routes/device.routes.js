module.exports = (app) => {
  const devices = require("../controllers/devices.controller.js");

  var router = require("express").Router();

  // Create a new devices
  router.post("/", devices.create);

  // Retrieve all devices
  router.get("/", devices.findAll);

  // Retrieve all published devices
  //router.get("/published", devices.findAllPublished);

  // Retrieve a single  devices with id
  router.get("/:id", devices.findOne);

  // Update a devices with id
  router.put("/:id", devices.update);

  // Delete a devices with id
  router.delete("/:id", devices.delete);

  // Delete all devices
  router.delete("/", devices.deleteAll);

  app.use("/api/devices", router);
};
