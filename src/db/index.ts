import { Dialect, Sequelize } from 'sequelize';
import dbConfig from '../config/dbConfig';

let db: Sequelize;

if (process.env.NODE_ENV === 'development') {
    db = new Sequelize(dbConfig.url as string, {
        logging: false
    });
} else {
    db = new Sequelize(dbConfig.url as string, {
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}


export default db;
