const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Note = sequelize.define('Note', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = Note;
