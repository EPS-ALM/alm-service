import express from 'express';
import { routes } from './routes/routes';
import errorHandler from './config/ErrorHandler';

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

class App {
    public server: express.Application;
    isDev = process.env.NODE_ENV === 'development'

    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
        this.swagger();
        this.server.use(errorHandler);
        this.init();
    }

    async init() {
        await this.dbInit();
    }

    async dbInit() {
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    swagger() {
        this.server.use(
            '/swagger',
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );
    }

}

export default new App().server;