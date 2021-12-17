import {Router} from "express";
import {findOne , findAll , create , update , destroy , destroyAll , availables} from "../controllers/setting.controller.js";
export default (app  , middleware) => {

  var router = Router();

  // Create a new devices
  router.post("/", create);

  // Retrieve all devices
//   router.get("/", findAll);



  // Retrieve a single  devices with id
  router.get("/:id", findOne);

  // Update a devices with id
//   router.put("/:id", update);

  // Delete a devices with id
//   router.delete("/:id", destroy);

  // Delete all devices
//   router.delete("/", destroyAll);

  app.use("/api/settings",  middleware , router);
};
