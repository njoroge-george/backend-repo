import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Coder = sequelize.define(
  "Coder",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    muted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "coders",     // ✅ belongs in options
    timestamps: true,        // ✅ enables createdAt and updatedAt
  }
);

export default Coder;
