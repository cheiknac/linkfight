import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize/client.js';

const sponsor = sequelize.define(
    "sponsor",
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            references: {
                model: 'users',
                key: 'id',
            },      
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
        tableName: "sponsor",
        timestamps: false,
    }
);

export default sponsor;
