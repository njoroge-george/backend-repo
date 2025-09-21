// models/Challenge.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Challenge = sequelize.define('Challenge', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  difficulty: {
    type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
    defaultValue: 'Easy',
  },
  starterCode: { type: DataTypes.TEXT, allowNull: true },
  tags: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('tags');
      return raw ? raw.split(',').map(tag => tag.trim()) : [];
    },
    set(value) {
      this.setDataValue('tags', Array.isArray(value) ? value.join(',') : value);
    },
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft',
  },

}, {
  tableName: 'challenge',
  timestamps: true,
});

export default Challenge;
