// models/Account.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Account = sequelize.define("Account", {
    accountNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pin: {
        type: DataTypes.STRING,
        allowNull: false, // 🔑 (later hash with bcrypt)
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
    },
}, {
    tableName: "accounts",
    timestamps: true,
});

export default Account;
