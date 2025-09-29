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
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "success", "fail", "accepted", "rejected"),
      defaultValue: "pending",
    },
    runtime: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    passedTests: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalTests: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    evaluatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "submissions",
    timestamps: true,
  }
);

// 🔗 Associations
Coder.hasMany(Submission);
Submission.belongsTo(Coder);

Challenge.hasMany(Submission);
Submission.belongsTo(Challenge);

export default Submission;
