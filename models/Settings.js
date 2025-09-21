// models/Settings.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // your Sequelize instance

const Settings = sequelize.define("Settings", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    theme: {
        type: DataTypes.STRING,
        defaultValue: "light",
    },
    fontSize: {
        type: DataTypes.STRING,
        defaultValue: "medium",
    },
    brightness: {
        type: DataTypes.INTEGER,
        defaultValue: 100, // percent
    },
    language: {
        type: DataTypes.STRING,
        defaultValue: "en",
    },
    notifications: {
        type: DataTypes.JSON, // { email: true, push: false }
        defaultValue: {},
    },
    privacy: {
        type: DataTypes.JSON, // { anonymize: true, autoLogout: 15 }
        defaultValue: {},
    },
    integrations: {
        type: DataTypes.JSON, // { google: true, github: false }
        defaultValue: {},
    },
}, {
    tableName: "settings",
});

export default Settings;
