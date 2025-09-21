// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    isOnline: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    tableName: 'users',
    timestamps: true
});

export default User;
