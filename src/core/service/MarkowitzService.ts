import { logger } from '../../config/AppLogger';
import MarkowitzGateway from '../../dataprovider/gateway/MarkowitzGateway';
import { MarkowitzRequest } from '../../dataprovider/request/MarkowitzRequest';
import { MarkowitzResponse } from '../../dataprovider/response/MarkowitzResponse';
import { Assets } from '../../db/model/Assets';
import { EfficientFrontier } from '../../db/model/EfficientFrontier';
import AssetsConstants from '../../utils/constants/AssetsConstants';
import BaseService from './BaseService';

export default class MarkowitzService implements BaseService {
  public constructor(private readonly gateway: MarkowitzGateway) {}

  public async execute() {
    const tickersRequest: MarkowitzRequest = {
      tickers: AssetsConstants.ASSETS,
    };

    const response: MarkowitzResponse = await this.gateway.execute(
      tickersRequest
    );

    if (!response) {
      logger.warn("Failed to get Markowitz data - skipping portfolio update");
      return;
    }

    await Assets.update({ isActive: false }, { where: { isActive: true } });
    try {
      for (const asset of response.portfolio) {
        await Assets.upsert({
          ticker: asset.ticker,
          markowitzAllocation: asset.allocation,
          isActive: true,
        });
      }
    } catch (e) {
      logger.error("Failed to update assets", e);
    }

    const efDb = await EfficientFrontier.findOne();

    if (!efDb) {
      await EfficientFrontier.create({
        base64: response.plot_base64,
      });
    } else {
      await EfficientFrontier.update(
        { base64: response.plot_base64 },
        { where: { id: efDb.id } }
      );
    }
  }
}
