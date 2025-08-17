// models/Project.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // your Sequelize instance

const Project = sequelize.define('Project', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT,
    },
    budget: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM('todo', 'inProgress', 'done'),
        defaultValue: 'todo',
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'projects',
    timestamps: true,
});

module.exports = Project;
