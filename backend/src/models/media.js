import 'dotenv/config';
import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize/client.js';

const Media = sequelize.define(
    "Media",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
        },

        media_name: {
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
        tableName: "media",
        timestamps: false,
    }
);

export default Media;   