// tutorial.routes
module.exports = (app) => {
  require("./user_device.routes")(app);
  require("./user.routes")(app);
  require("./device_code.routes")(app);
  require("./register.routes")(app);
  require("./login.routes")(app);
  require("./active_code.routes")(app);
  require("./file_upload.routes")(app);
  require("./secretinfo")(app);
};
