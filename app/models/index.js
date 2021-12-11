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
const Device = require("./devices.model.js")(sequelize, Sequelize);
const ActiveDevice = require("./active_devices.model.js")(sequelize, Sequelize)
const User = require("./user.model.js")(sequelize, Sequelize);
const ActiveCode = require("./active_code.model.js")(sequelize, Sequelize);

//Device Relationships
Device.hasOne(ActiveDevice , {foreignKey: 'deviceId', 'as' : 'active_device'}); // Will add companyId to user
ActiveCode.hasOne(ActiveDevice , {foreignKey: 'codeId', 'as' : 'active_device'}); // Will add companyId to user


//Active Device Relationships
ActiveDevice.belongsTo(Device , {foreignKey: 'deviceId', 'as' : 'device'}); // Will add companyId to user
ActiveDevice.belongsTo(ActiveCode , {foreignKey: 'codeId', 'as' : 'code'}); // Will add companyId to user


module.exports = {
    sequelize , 
    Sequelize,
    User,
    Device,
    ActiveCode,
    ActiveDevice
};



