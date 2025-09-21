import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Coder from "./Coder.js";
import Challenge from "./Challenge.js";

const Submission = sequelize.define(
    "Submission",
    {
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Pending", "Accepted", "Rejected"),
            defaultValue: "Pending",
        },
        passedTests: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        totalTests: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        score: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
        },
        evaluatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "submission",
        timestamps: true,
    }
);

// Associations
Coder.hasMany(Submission, { foreignKey: "coderId" });
Submission.belongsTo(Coder, { foreignKey: "coderId" });

Challenge.hasMany(Submission, { foreignKey: "challengeId" });
Submission.belongsTo(Challenge, { foreignKey: "challengeId" });

export default Submission;
