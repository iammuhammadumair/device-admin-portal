import dbConfig  from "../config/db.config.js";

import deviceModel  from "./devices.model";
import activeDeviceModel from "./active_devices.model.js";
import userModel from "./user.model.js";
import activeCodeModel from "./active_code.model.js";


import { Sequelize } from "sequelize";
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
const Device = deviceModel(sequelize, Sequelize);
const ActiveDevice = activeDeviceModel(sequelize, Sequelize)
const User = userModel(sequelize, Sequelize);
const ActiveCode = activeCodeModel(sequelize, Sequelize);

//Device Relationships
Device.hasOne(ActiveDevice , {foreignKey: 'deviceId', 'as' : 'active_device'}); // Will add companyId to user
ActiveCode.hasOne(ActiveDevice , {foreignKey: 'codeId', 'as' : 'active_device'}); // Will add companyId to user
Device.hasOne(ActiveCode , {foreignKey: 'device_id' , as: 'code'});


//Active Device Relationships
ActiveDevice.belongsTo(Device , {foreignKey: 'deviceId', 'as' : 'device'}); // Will add companyId to user
ActiveDevice.belongsTo(ActiveCode , {foreignKey: 'codeId', 'as' : 'code'}); // Will add companyId to user


export  {
    sequelize , 
    Sequelize,
    User,
    Device,
    ActiveCode,
    ActiveDevice
};



