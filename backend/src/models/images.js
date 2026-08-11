import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Palmares = sequelize.define(
    "Palmares",
    {
        id_image: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        id_sportprofil: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        
},
    {   
        tableName: "images",
        timestamps: false,
    }
);

export default Palmares;