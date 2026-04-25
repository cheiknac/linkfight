import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Palmares = sequelize.define(
    "Palmares",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        id_sportprofil: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        discipline: {
            type: DataTypes.STRING(50),
        },

        city: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

        country: {
            type: DataTypes.STRING(30),
        },

        date: {
            type: DataTypes.DATEONLY,
        },

        result: {
            type: DataTypes.STRING(255),
        },

},
    {
        timestamps: false,
    }
);

export default Palmares;