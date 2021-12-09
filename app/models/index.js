const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //   operatorsAliases: false,
  port: 25060,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
//db.user_devices = require("./user_device.model.js")(sequelize, Sequelize);
//db.device_codes = require("./active_devices.model.js")(sequelize, Sequelize);
db.active_codes = require("./active_code.model.js")(sequelize, Sequelize);
db.devices = require("./devices.model.js")(sequelize, Sequelize);
db.active_devices = require("./active_devices.model.js")(sequelize, Sequelize);

module.exports = db;
