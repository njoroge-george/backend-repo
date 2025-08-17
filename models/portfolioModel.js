// models/portfolio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Portfolio = sequelize.define('Portfolio', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  skills: {
    type: DataTypes.JSON, // Array of skills
  },
  projects: {
    type: DataTypes.JSON, // Array of objects with title/description
  },
  contact_email: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'portfolio',
  timestamps: false
});

module.exports = Portfolio;
