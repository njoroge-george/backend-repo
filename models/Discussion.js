import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Discussion = sequelize.define(
  "Discussion",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    coderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "discussions",
    timestamps: true,
  }
);

export default Discussion;
