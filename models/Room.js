import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Coder from "./Coder.js";

const Room = sequelize.define(
  "Room",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "rooms",     // ✅ belongs in options
    timestamps: true,       // ✅ belongs in options
  }
);

// 🔗 Relationships
Room.hasMany(Coder, { onDelete: "CASCADE" });
Coder.belongsTo(Room);

export default Room;
