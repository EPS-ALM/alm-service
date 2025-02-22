import { Request, Response } from 'express';

import { logger } from '../../config/AppLogger';
import { ForecastService } from '../../core/service/ForecastService';
import { ForecastGateway } from '../../dataprovider/gateway/ForecastGateway';
import BaseModule from './BaseModule';

export class ForecastModule extends BaseModule {
  private service: ForecastService;

  constructor() {
    super();
    const gateway = new ForecastGateway();
    this.service = new ForecastService(gateway);
  }

  public execute(status: number) {
    return async (req: Request, res: Response) => {
      await this.executeImpl(req, res, status);
    };
  }

  protected handleError(error: any, res: Response): void {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }

  protected async executeImpl(
    req: Request,
    res: Response,
    status: number
  ): Promise<void> {
    try {
      const forecastType = req.params.type;
      const request = req.body;

      const result = await this.service.execute({
        type: forecastType,
        request: request,
      });

      res.status(status).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

export const getForecastModule = () => new ForecastModule();
