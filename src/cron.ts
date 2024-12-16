import cron from 'node-cron';
import { logger } from './config/AppLogger';
import { markowitz } from './routines/MarkowitzRoutine';
import { cashFlow } from './routines/CashFlow';
import { forecastVar } from './routines/ForecastVarRoutine';

export class CronJobs {
    constructor() { }

    scheduleJobs() {
        cron.schedule("0 0 1 * *", async () => {
            try {
                await markowitz();
                await forecastVar();
            } catch (e) {
                logger.error(e, `Erro ao atualizar alocações de ativos`);
            }
        });


        cron.schedule("0 0 1 * *", async () => {
            try {
                await cashFlow();
            } catch (e) {
                logger.error(e, `Erro ao atualizar alocações de ativos`);
            }
        });
    }
}