// models/Entry.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // your configured Sequelize instance

const Entry = sequelize.define('Entry', {
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'entries',
    timestamps: false,
});

module.exports = Entry;