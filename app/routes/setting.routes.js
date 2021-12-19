import { Router } from "express";
import {
  create,
  verifyStatus,
  password,
} from "../controllers/setting.controller.js";
import requestValidator from "../middlewares/request_validator.middleware.js";
import changePasswordSchema from "../schemas/change_password.schema.js";
export default (app, middleware) => {
  var router = Router();

  // Create a new devices
  router.post("/", create);
  router.post("/verify-request", verifyStatus);
  router.post("/password",
  [middleware, requestValidator(changePasswordSchema)],
  password);

  app.use(
    "/api/settings",
    router
  );
};
