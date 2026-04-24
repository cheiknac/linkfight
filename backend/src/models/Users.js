import { Datatypes } from 'sequelize';
import sequelize from '../database/sequelize/client.js';

const Users = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        email: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        type: {
            type: DataTypes.ENUM("sponsor", "media", "sportif"),
            allowNull: false,
        },

        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        zip_code: {
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                is: /^[0-9]{5}$/,
            }
        },

        city: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

        avatar: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },

        legals: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        create_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },

        update_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "users",
        timestamps: false,
        underscored: true,
    }

);

export default Users;

