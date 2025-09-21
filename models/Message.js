// models/Message.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Room from './Room.js';

const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false }
}, {
    tableName: 'messages',
    timestamps: true
});

// Associations
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

Room.hasMany(Message, { foreignKey: 'roomId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });

export default Message;
