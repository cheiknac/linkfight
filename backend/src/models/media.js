import 'dotenv/config';
import pkg from 'sequelize';
const { DataTypes, Model } = pkg;
import sequelize from '../database/sequelize/client.js';

class Media extends Model {}

Media.init(
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
        sequelize,
        modelName: "Media",
        tableName: "media",
        timestamps: false,
    }
);

export default Media;   