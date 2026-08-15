import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize/client.js';

const Images = sequelize.define(
    "Images",
    {
        id_sportprofil: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            references: {
                model: 'sportprofil',
                key: 'id',
            },
            allowNull: false,
        },

        url: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        
},
    {   
        sequelize,
        modelName: "Images",
        tableName: "images",
        timestamps: false,
    }
);

export default Images;