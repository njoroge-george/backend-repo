import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AIChat = sequelize.define(
    "AIChat",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userMessage: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        aiResponse: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "AIChats",      // name of table in DB
        timestamps: true,          // adds createdAt and updatedAt
        freezeTableName: true,     // prevent pluralization by Sequelize
    }
);

// Automatically create the table if it doesn’t exist
AIChat.sync({ alter: true })
    .then(() => console.log("AIChat table created or updated"))
    .catch((err) => console.error("Error creating AIChat table:", err));

export default AIChat;
