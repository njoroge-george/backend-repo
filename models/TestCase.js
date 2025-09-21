import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Challenge from "./Challenge.js";

const TestCase = sequelize.define("TestCase", {
  input: { type: DataTypes.TEXT, allowNull: false },
  expectedOutput: { type: DataTypes.TEXT, allowNull: false },
  challengeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Challenge,
      key: "id",
    },
    onDelete: "CASCADE",
  },
}, {
  tableName: "TestCases", // ✅ optional: match your actual DB table name
});

Challenge.hasMany(TestCase, { foreignKey: "challengeId" });
TestCase.belongsTo(Challenge, { foreignKey: "challengeId" });

export default TestCase;
