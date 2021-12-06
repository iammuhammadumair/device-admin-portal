module.exports = (app) => {
  const active_code = require("../controllers/active_code.controller.js");

  var router = require("express").Router();

  // Create a new active_code
  router.post("/", active_code.create);

  // Retrieve all active_code
  router.get("/", active_code.findAll);

  // Retrieve all published active_code
  //router.get("/published", active_code.findAllPublished);

  // Retrieve a single  active_code with id
  router.get("/:id", active_code.findOne);

  // Update a active_code with id
  router.put("/:id", active_code.update);

  // Delete a active_code with id
  router.delete("/:id", active_code.delete);

  // Delete all active_code
  router.delete("/", active_code.deleteAll);

  app.use("/api/active_code", router);
};
