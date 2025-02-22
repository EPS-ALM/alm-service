import axios from 'axios';

import { logger } from '../../config/AppLogger';
import UrlConstants from '../../utils/constants/UrlConstants';
import { MarkowitzRequest } from '../request/MarkowitzRequest';
import { MarkowitzResponse } from '../response/MarkowitzResponse';

export default class MarkowitzGateway {
  public async execute(tickers: MarkowitzRequest): Promise<MarkowitzResponse> {
    const url = UrlConstants.PATH_MARKOVITZ;
    logger.info(`Making request to: ${url}`);

    const response: MarkowitzResponse = await axios
      .post(url, tickers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        logger.error(error, "Erro ao chamar alm-assets markowitz");
        return null;
      });
    return response;
  }
}
