import pino from "pino";

export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    name: 'gambe_server',
    level: 'debug'
});