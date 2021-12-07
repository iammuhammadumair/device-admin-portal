module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define("tkapp_file", {
    filePath: {
      type: Sequelize.STRING,
    },
  });

  return File;
};
