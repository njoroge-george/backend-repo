import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Coder from "./Coder.js";
import Challenge from "./Challenge.js";
import Room from "./Room.js";

const Leaderboard = sequelize.define(
  "Leaderboard",
  {
    solved: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "leaderboard", // ✅ belongs in options
    timestamps: true,         // ✅ enables createdAt and updatedAt
  }
);

// 🔗 Relations
Coder.belongsToMany(Challenge, { through: Leaderboard });
Challenge.belongsToMany(Coder, { through: Leaderboard });

Leaderboard.belongsTo(Coder);
Leaderboard.belongsTo(Challenge);
Leaderboard.belongsTo(Room);

export default Leaderboard;
