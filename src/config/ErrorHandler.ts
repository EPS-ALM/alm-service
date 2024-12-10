import e, { Request, Response, NextFunction } from 'express';
import { logger } from './AppLogger';
import ErrorResponse from './ErrorResponse';

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Erro Interno."
  if (err.message) {
    logger.error(err)
  }
  res.status(status).send({
    message: message
  });

}

export default errorHandler;