import axios from 'axios';

import { logger } from '../../config/AppLogger';
import UrlConstants from '../../utils/constants/UrlConstants';
import { RiskNotebookResponse } from '../response/RiskNotebookResponse';
import BaseGateway from './BaseGateway';

export default class RiskNotebookGateway extends BaseGateway {
  public async execute(notebookName: string): Promise<RiskNotebookResponse> {
    const baseUrl = UrlConstants.PATH_RISK_NOTEBOOK;

    const urlWithParams = this.buildRiskUrl(baseUrl, notebookName);
    logger.info(`Making request to: ${urlWithParams}`);

    const response: RiskNotebookResponse = await axios
      .get(urlWithParams)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        logger.error(error, "Erro ao chamar alm-risk notebook");
        return null;
      });

    return response;
  }
}
