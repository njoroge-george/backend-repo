// models/recipe.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Recipe = sequelize.define(
  "Recipe",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    tags: {
      type: DataTypes.JSON, // stores ["dessert", "vegan"]
    },
    stars: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "recipes",
    timestamps: false,
  }
);

module.exports = Recipe;
