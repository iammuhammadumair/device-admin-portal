module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("tkapp_user", {
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

  return User;
};
