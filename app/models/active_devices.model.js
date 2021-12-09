module.exports = (sequelize, Sequelize) => {
  const ActiveDevices = sequelize.define("tkapp_active_devices", {
    deviceId: {
      type: Sequelize.STRING,
    },
    codeId: {
      type: Sequelize.STRING,
    },
    activeDate: {
      type: Sequelize.DATEONLY,
    },
  });

  return ActiveDevices;
};
