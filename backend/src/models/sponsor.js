import 'dotenv/config';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize/client.js';

class Sponsor extends Model {}

Sponsor.init(

    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,    
            allowNull: false,
        },
        
        company_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        position: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        
        website: {
            type: DataTypes.STRING(255),
        },

    },
    {
        sequelize,
        modelName: "Sponsor",
        tableName: "sponsor",
        timestamps: false,
    }
);

export default Sponsor;
