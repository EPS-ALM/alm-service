require('dotenv/config');


if (process.env.NODE_ENV === 'development') {
    const dbConfig = {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
    };

    module.exports = dbConfig;
} else {
    const dbConfig = {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    };

    module.exports = dbConfig;
}
