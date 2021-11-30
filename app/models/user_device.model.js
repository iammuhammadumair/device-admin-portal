module.exports = (sequelize, Sequelize) => {
  const Device = sequelize.define("tkapp_device", {
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

  return Device;
};
