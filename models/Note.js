import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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

export default Note;