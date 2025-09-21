import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // adjust path if needed

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "admin",
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "user", // lowercase is common in MySQL
        timestamps: true,   // createdAt, updatedAt
    }
);

export default User;
