import { logger } from '../../config/AppLogger';
import ForecastVarGateway from '../../dataprovider/gateway/ForecastVarGateway';
import { ForecastVarRequest } from '../../dataprovider/request/ForecastVarRequest';
import { ForecastVarResponse } from '../../dataprovider/response/ForecastVarResponse';
import { Assets } from '../../db/model';
import AssetsConstants from '../../utils/constants/AssetsConstants';
import BaseService from './BaseService';

export default class ForecastVarService implements BaseService {
  public constructor(private readonly gateway: ForecastVarGateway) {}

  public async execute() {
    const tickersRequest: ForecastVarRequest = {
      tickers: AssetsConstants.ASSETS,
    };

    const response: ForecastVarResponse = await this.gateway.execute(
      tickersRequest
    );

    if (!response) {
      logger.warn("Failed to get Forecast VAR data - skipping update");
      return;
    }

    try {
      for (const allocation of response.data) {
        await Assets.upsert({
          ticker: allocation.ativo,
          historicalAnnualReturn:
            allocation.historical_metrics["Retorno Anualizado (%)"],
          historicalAnnualVolatility:
            allocation.historical_metrics["Volatilidade Anualizada (%)"],
          forecastAnnualReturn:
            allocation.forecast_metrics["Retorno Anualizado (%)"],
          forecastAnnualVolatility:
            allocation.forecast_metrics["Volatilidade Anualizada (%)"],
          forecastVarAllocation: allocation.forecast_allocation,
        });
      }
    } catch (e) {
      logger.error("Failed to update forecast data", e);
    }
  }
}
