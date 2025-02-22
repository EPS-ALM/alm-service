import axios from 'axios';

import { logger } from '../../config/AppLogger';
import UrlConstants from '../../utils/constants/UrlConstants';
import { ForecastVarRequest } from '../request/ForecastVarRequest';
import { ForecastVarResponse } from '../response/ForecastVarResponse';

export default class ForecastVarGateway {
  public async execute(
    tickers: ForecastVarRequest
  ): Promise<ForecastVarResponse> {
    const url = UrlConstants.PATH_FORECASTVAR;
    logger.info(`Making request to: ${url}`);

    const response: ForecastVarResponse = await axios
      .post(url, tickers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        logger.error(error, "Erro ao chamar alm-assets forecast_var");
        return null;
      });
    return response;
  }
}
