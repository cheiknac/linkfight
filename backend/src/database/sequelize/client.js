import 'dotenv/config';
import Sequelize from 'sequelize';

if (!process.env.PG_URL) {
    throw new Error ("La variable d'environnement PG_URL est manquant !");
}

const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    logging: false,
});

export default sequelize;