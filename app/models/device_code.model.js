module.exports = (sequelize, Sequelize) => {
  const DeviceCode = sequelize.define("tkapp_device_code", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return DeviceCode;
};
