// models/index.js
import sequelize from "../config/db.js";
import Coder from "./Coder.js";
import Discussion from "./Discussion.js";
import DiscussionReply from "./DiscussionReply.js";
import DiscussionLike from "./DiscussionLike.js";

// Associations

Coder.hasMany(Discussion, { foreignKey: "coderId" });
Coder.hasMany(DiscussionReply, { foreignKey: "coderId" });
Coder.hasMany(DiscussionLike, { foreignKey: "coderId" });

Discussion.belongsTo(Coder, { as: "author", foreignKey: "coderId" });
Discussion.hasMany(DiscussionReply, { foreignKey: "discussionId", as: "replies" });
Discussion.hasMany(DiscussionLike, { foreignKey: "discussionId", as: "likes" });

DiscussionReply.belongsTo(Coder, { as: "author", foreignKey: "coderId" });
DiscussionReply.belongsTo(Discussion, { foreignKey: "discussionId" });

DiscussionLike.belongsTo(Coder, { foreignKey: "coderId" });
DiscussionLike.belongsTo(Discussion, { foreignKey: "discussionId" });

export { sequelize, Coder, Discussion, DiscussionReply, DiscussionLike };
