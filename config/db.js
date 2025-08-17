const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true, // Set to `true` to enable SQL query logging
});

sequelize.authenticate()
    .then(() => console.log('✅ MySQL connection has been established successfully.'))
    .catch((err) => console.error('❌ Unable to connect to the database:', err));

module.exports = sequelize;
