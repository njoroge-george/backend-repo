// models/Chord.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Chord = sequelize.define(
    "Chord",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // chord names should be unique, e.g., Cmaj7
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: false,
            // store notes as comma-separated values: e.g. "C,E,G,B"
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            // e.g., Major, Minor, Diminished, Augmented
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            // optional description about the chord
        },
    },
    {
        tableName: "chords",
        timestamps: true, // adds createdAt & updatedAt
    }
);

export default Chord;
