import axios, { AxiosError } from 'axios';

import { logger } from '../../config/AppLogger';
import UrlConstants from '../../utils/constants/UrlConstants';
import { ForecastLSTMRequest, ForecastSARIMARequest } from '../request/ForecastRequest';
import { ForecastResponse } from '../response/ForecastResponse';

interface APIErrorResponse {
  detail: string;
}

export class ForecastGateway {
  private handleError(error: AxiosError<APIErrorResponse>) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`API Error: ${error.response.status}`, {
        data: error.response.data,
        status: error.response.status,
      });
      throw new Error(error.response.data?.detail || "API Error");
    } else if (error.request) {
      // The request was made but no response was received
      logger.error("No response received from API", error.request);
      throw new Error("No response from forecast service");
    } else {
      // Something happened in setting up the request
      logger.error("Error setting up request", error.message);
      throw new Error("Error making forecast request");
    }
  }

  public async executeLSTM(
    request: ForecastLSTMRequest
  ): Promise<ForecastResponse> {
    const url = UrlConstants.PATH_FORECASTLSTM;
    logger.info(`Making request to: ${url}`);

    try {
      const response = await axios.post<ForecastResponse>(url, request);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<APIErrorResponse>);
      throw error;
    }
  }

  public async executeSARIMA(
    request: ForecastSARIMARequest
  ): Promise<ForecastResponse> {
    const url = UrlConstants.PATH_FORECASTSARIMA;
    logger.info(`Making request to: ${url}`);

    try {
      const response = await axios.post<ForecastResponse>(url, request);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<APIErrorResponse>);
      throw error;
    }
  }
}
