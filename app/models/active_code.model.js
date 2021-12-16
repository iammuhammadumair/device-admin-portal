export default (sequelize, Sequelize) => {
  const ActiveCode = sequelize.define("tkapp_active_code", {
    user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tkapp_users",
          key: "id"
        }
    },
    device_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "tkapp_devices",
          key: "id"
        }
    },
    owner_name: {
      type: Sequelize.STRING,
    },
    codename: {
      type: Sequelize.STRING,
    },
    start_date_time: {
      type: Sequelize.DATE,
    },
    end_date_time: {
      type: Sequelize.DATE,
    },
  },{ timestamps: true,
    underscored: true});

  return ActiveCode;
};
