// models/learningModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// Courses Table
const Course = sequelize.define('Course', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Courses',
    timestamps: true
});

// Resources Table
const Resource = sequelize.define('Resource', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Resources',
    timestamps: true
});

// Achievements Table
const Achievement = sequelize.define('Achievement', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Achievements',
    timestamps: true
});

// PracticeLogs Table
const PracticeLog = sequelize.define('PracticeLog', {
    activity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'PracticeLogs',
    timestamps: true
});

// Export all in one object
export {
    Course,
    Resource,
    Achievement,
    PracticeLog
};