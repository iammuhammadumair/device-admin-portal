export default (sequelize, Sequelize) => {
  const ActiveDevices = sequelize.define("tkapp_active_devices", {
    device_id: {
      type: Sequelize.STRING,
    },
    code_id: {
      type: Sequelize.STRING,
    },
    active_date: {
      type: Sequelize.DATEONLY,
    },
  },{ timestamps: true,
    underscored: true});

  return ActiveDevices;
};
