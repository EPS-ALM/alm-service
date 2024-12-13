import express from 'express';
import { routes } from './routes/routes';
import errorHandler from './config/ErrorHandler';
import { CronJobs } from './cron';
import { Assets, Cash, Clients, EfficientFrontier } from './db/model';
import { markowitz } from './routines/MarkowitzRoutine';
import { populate } from 'dotenv';

require('dotenv').config();

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
        const cronJobs = new CronJobs();
        cronJobs.scheduleJobs();

        await this.populateDatabase();
        await markowitz();
    }

    async dbInit() {
        await Assets.sync({ alter: this.isDev });
        await EfficientFrontier.sync({ alter: this.isDev });
        await Cash.sync({ alter: this.isDev });
        await Clients.sync({ alter: this.isDev });
    }

    async populateDatabase() {
        const cashDb = await Cash.findOne();
        
        if(!cashDb){
            await Cash.create({
                invested: 100000,
                inCash: 0
            });
        }

        const clientsDb = await Clients.findOne();
        
        if(!clientsDb){
            await Clients.create({
                number: 10,
            });
        }
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