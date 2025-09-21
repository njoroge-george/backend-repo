import { DataTypes }  from'sequelize';
import sequelize from'../config/db.js';

const Coder = sequelize.define('Coder', {
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
}, {
    tableName: 'coder',
    timestamps: true
});

export default Coder;
