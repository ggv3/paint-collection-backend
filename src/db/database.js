const Sequelize = require('sequelize');

require('dotenv').config();

const initDatabase = () => {
	const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
		host: process.env.DBHOST,
		dialect: process.env.DBDIALECT
	});

	sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});

	class Paint extends Sequelize.Model {}
	Paint.init(
		{
			id: { type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
			name: { type: Sequelize.STRING(100), field: 'name', allowNull: false },
			amount: { type: Sequelize.INTEGER, field: 'amount', defaultValue: 0 }
		},
		{ sequelize, modelName: 'paint' }
	);

	Paint.sync({ force: true });
};

exports.initDatabase = initDatabase;
