// backend-repo/models/portfolioModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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

export default Portfolio;