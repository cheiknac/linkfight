import 'dotenv/config';
import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import sequelize from '../database/sequelize/client.js';

class Images extends Model {}

Images.init(
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