
export default (sequelize, Sequelize) => {
  const User = sequelize.define("tkapp_user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    platform_id :{
        type : Sequelize.INTEGER,
        allowNull:true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reset_token: {
        type : Sequelize.TEXT,
        allowNull: true
    }
    
  },{ timestamps: true,
    underscored: true});

  return User;
};
