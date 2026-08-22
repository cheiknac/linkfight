import 'dotenv/config';
import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import sequelize from '../database/sequelize/client.js';

class Sportprofil extends Model {}

Sportprofil.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
        },

        biography: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
           },            
        },

        categorie: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
           },
        },

        discipline: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
           },
        },

        club: {
            type: DataTypes.STRING,

        },

        zipcode_club: {
            type: DataTypes.STRING(20),
            validate: {
                is: /^[0-9]{5}$/, // Regex pour valider un code postal français à 5 chiffres
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
        sequelize,
        modelName: "Sportprofil",
        tableName: "sportprofil",
        timestamps: false,
    }
);

export default Sportprofil;