// backend-repo/models/backendcodeModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BackendCode = sequelize.define("BackendCode", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    code: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: "codes",
    timestamps: true,
});

export default BackendCode;
