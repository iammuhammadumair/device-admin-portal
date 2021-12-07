module.exports = (sequelize, Sequelize) => {
  const ActiveCode = sequelize.define("tkapp_active_code", {
    stdate: {
      type: Sequelize.DATEONLY,
    },
    endate: {
      type: Sequelize.DATEONLY,
    },
    codename: {
      type: Sequelize.STRING,
    },
    // device_Id: {
    //   type: Sequelize.STRING,
    // },
  });

  return ActiveCode;
};
