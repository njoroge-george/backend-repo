import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Document = sequelize.define("Document", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT("long"), // ✅ use TEXT("long") for big docs
        allowNull: false,
    },
}, {
    tableName: "documents",   // ✅ ensures table name is correct
    timestamps: true,
});

export default Document;
