import cron from 'node-cron';
import { logger } from './config/AppLogger';
import { markowitz } from './routines/MarkowitzRoutine';

export class CronJobs {
    constructor() { }

    scheduleJobs() {
        cron.schedule("0 0 1 * *", async () => {
            try {
                await markowitz();
            } catch (e) {
                logger.error(e, `Erro ao atualizar alocações de ativos`);
            }
        });
    }
}