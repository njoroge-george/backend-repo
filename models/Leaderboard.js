// models/Leaderboard.js
const Leaderboard = sequelize.define("Leaderboard", {
    coderId: { type: DataTypes.INTEGER, allowNull: false },
    challengeId: { type: DataTypes.INTEGER, allowNull: false },
    bestScore: { type: DataTypes.FLOAT, defaultValue: 0.0 },
});
