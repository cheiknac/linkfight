import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize/client.js';

const Sportprofil = sequelize.define(
    "Sportprofil",
    {
        id_user: {
            type: DataTypes.INTEGER,
            primary: true,
            allowNull: false,
        },

        biography: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        categorie: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        discipline: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        club: {
            type: DataTypes.STRING,

        },

        zipcode_club: {
            type: DataTypes.STRING(20),
            validate: {
                is: /^[0-9]{5}$/,
        }
        },

        victory: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        defeat: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },

        weight: {
            type: DataTypes.FLOAT,
        },

        weight: {
            type: DataTypes.FLOAT,
        },

        instagram: {
            type: DataTypes.STRING(255),
        },

        tiktok: {
            type: DataTypes.STRING(255),
        },

        snapchat: {
            type: DataTypes.STRING(255),
        },

    },
    {
        tableName: "sportprofil",
        timestamps: false,
    }
);

export default Sportprofil;