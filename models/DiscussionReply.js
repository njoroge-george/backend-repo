// models/DiscussionReply.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DiscussionReply = sequelize.define(
  "DiscussionReply",
  {
    body: DataTypes.TEXT,
  },
  { tableName: "discussion_replies", timestamps: true }
);

export default DiscussionReply;
