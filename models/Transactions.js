// models/Transaction.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Account from "./Account.js";

const Transaction = sequelize.define("Transaction", {
    type: {
        type: DataTypes.ENUM("DEPOSIT", "WITHDRAW"),
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: "transactions",
    timestamps: true,
});

// Relations
Account.hasMany(Transaction, { foreignKey: "accountId", as: "transactions" });
Transaction.belongsTo(Account, { foreignKey: "accountId", as: "account" });

export default Transaction;
