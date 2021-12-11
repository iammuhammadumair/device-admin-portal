const db  =  require('./index');


module.exports = (sequelize, Sequelize) => {
  const Devices = sequelize.define("tkapp_devices", {
    name: {
      type: Sequelize.STRING,
    },
    deviceImg: {
      type: Sequelize.STRING,
    },
  });
  
  return Devices;
};
// db.devices.belongsTo(db.active_devices);



