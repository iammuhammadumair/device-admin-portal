export default (sequelize, Sequelize) => {
	const UserKeys = sequelize.define(
		"tkms_user_keys",
		{
			tkms_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			userid: {
				type: Sequelize.INTEGER,
			},
			platform: {
				type: Sequelize.STRING(64),
			},
			platform_userid: {
				type: Sequelize.STRING(64),
				allowNull:true

			},
			api_key_clientid: {
				type: Sequelize.STRING(64),
				allowNull:true
			},
			api_secret_key: {
				type: Sequelize.STRING(255),
				allowNull:true
			},
			auth_code: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			refresh_token: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			redirectURI: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
		},
		{
			timestamps: false,
			// freezeTableName: true,
		}
	);

	return UserKeys;
};
