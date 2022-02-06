import authRoutes from "./auth.routes.js";
import activeCodeRoutes from "./active_code.routes.js";
import activeDeviceRoutes from "./active_device.routes.js";
import secretInfoRoutes from "./secretinfo.js";
import deviceRoutes from "./device.routes.js";
import fileUploadRoutes from "./file_upload.routes.js";
import settingRoutes from "./setting.routes.js";

// import passport from "../../app/auth/passport.js";
import authenticate from "../middlewares/authentication.middleware.js";
const authValidation = (req, res, next) => authenticate(req, res, next);
console.log('auth =>' , authValidation)
export default (app) => {
  authRoutes(app);
  activeCodeRoutes(app, authValidation);
  deviceRoutes(app, authValidation);
  activeDeviceRoutes(app, authValidation);
  secretInfoRoutes(app, authValidation);
  fileUploadRoutes(app, authValidation);
  settingRoutes(app,  authValidation);
  

};
