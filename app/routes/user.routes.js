module.exports = app => {
    const userDevices = require("../controllers/user_device.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User Device
    router.post("/", userDevices.create);
  
    // Retrieve all userDevices
    router.get("/", userDevices.findAll);
  
    // Retrieve all published userDevices
    router.get("/published", userDevices.findAllPublished);
  
    // Retrieve a single User Device with id
    router.get("/:id", userDevices.findOne);
  
    // Update a User Device with id
    router.put("/:id", userDevices.update);
  
    // Delete a User Device with id
    router.delete("/:id", userDevices.delete);
  
    // Delete all userDevices
    router.delete("/", userDevices.deleteAll);
  
    app.use('/api/users', router);
  };