import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Grade = sequelize.define('Grade', {
    form: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 4 }
    },
    term: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 3 }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'grades',
});

export default Grade;