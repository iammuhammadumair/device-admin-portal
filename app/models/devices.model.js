export default (sequelize, Sequelize) => {
	const Devices = sequelize.define(
		"tkapp_devices",
		{
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "tkapp_users",
					key: "id",
				},
			},
			home_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			mac_code: {
				type: Sequelize.STRING,
			},
			serial_code: {
				type: Sequelize.STRING,
			},
			// created_at: {
			//   type: Sequelize.DATE,
			//   default: new Date(),
			// },
			// updated_at: {
			//   type: Sequelize.DATE,
			//   default: new Date(),
			// },
		},
		{ timestamps: true, underscored: true }
	);

	return Devices;
};
// db.devices.belongsTo(db.active_devices);
