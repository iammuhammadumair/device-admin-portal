import authRoutes from "./auth.routes";
import activeCodeRoutes from "./active_code.routes";
import activeDeviceRoutes from "./active_device.routes";
import secretInfoRoutes from "./secretinfo";
import deviceRoutes from "./device.routes";
import fileUploadRoutes from "./file_upload.routes";

import passport from "../../app/auth/passport.js";
import authenticate from "../middlewares/authentication.middleware";
const authValidation = (req, res, next) => authenticate(req, res, next);
export default (app) => {
  authRoutes(app);
  activeCodeRoutes(app, authValidation);
  deviceRoutes(app, authValidation);
  activeDeviceRoutes(app, authValidation);
  secretInfoRoutes(app, authValidation);
  fileUploadRoutes(app, authValidation);
};
