export default (sequelize, Sequelize) => {
  const Settings = sequelize.define(
    "tkapp_settings",
    {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tkapp_users",
          key: "id",
        },
      },
      platform_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "tkapp_users",
        //   key: "id",
        // },
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: true, underscored: true }
  );

  return Settings;
};
// db.devices.belongsTo(db.active_devices);
