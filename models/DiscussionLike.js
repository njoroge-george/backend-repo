import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Discussion from "./Discussion.js";
import Coder from "./Coder.js";

const DiscussionLike = sequelize.define(
  "DiscussionLike",
  {
    discussionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   
    },
    coderId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
  },
  {
    tableName: "discussion_likes",
    timestamps: true,
  }
);

export default DiscussionLike;
