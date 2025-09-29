
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Coder from "./Coder.js";
import Room from "./Room.js";

const Challenge = sequelize.define(
  "Challenge",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    testcase: {
      type: DataTypes.TEXT, // e.g. solve() === "Hello"
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "easy",
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("tags");
        return raw ? raw.split(",") : [];
      },
      set(val) {
        this.setDataValue("tags", Array.isArray(val) ? val.join(",") : val);
      },
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    successRate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "challenge",
    timestamps: true,
  }
);

// 🔗 Relationships
Room.hasMany(Challenge, { onDelete: "CASCADE" });
Challenge.belongsTo(Room);

Coder.belongsToMany(Challenge, { through: "CoderChallenges" });
Challenge.belongsToMany(Coder, { through: "CoderChallenges" });

export default Challenge;
