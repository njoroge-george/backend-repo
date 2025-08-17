// models/Fitness.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // or wherever your sequelize instance is

const Fitness = sequelize.define('Fitness', {
    workout_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    workout_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
  name: {
      type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Fitness; // Make sure you export the model directly