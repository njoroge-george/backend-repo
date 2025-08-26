// models/Message.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Message = sequelize.define('Message', {
    username: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'messages',
    timestamps: false,
});

export default Message;
