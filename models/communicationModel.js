// models/communication.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Communication = sequelize.define('Communication', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    contact_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    direction: {
        type: DataTypes.ENUM('inbound', 'outbound'),
        allowNull: false,
        defaultValue: 'outbound'
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    channel_metadata: {
        type: DataTypes.JSON,
        allowNull: true
    },
    occurred_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'communications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Communication;
