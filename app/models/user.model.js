export default (sequelize, Sequelize) => {
  const User = sequelize.define("tkapp_user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // created_at: {
    //   type: Sequelize.DATE,
    //   default: new Date(),
    // },
    // updated_at: {
    //   type: Sequelize.DATE,
    //   default: new Date(),
    // },
  },{ timestamps: true,
    underscored: true});

  return User;
};
