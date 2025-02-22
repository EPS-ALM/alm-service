import { ForecastGateway } from '../../dataprovider/gateway/ForecastGateway';
import { ForecastLSTMRequest, ForecastSARIMARequest } from '../../dataprovider/request/ForecastRequest';
import { ForecastResponse } from '../../dataprovider/response/ForecastResponse';
import BaseService from './BaseService';

export class ForecastService implements BaseService {
  constructor(private readonly gateway: ForecastGateway) {}

  public async execute(params: {
    [key: string]: any;
  }): Promise<ForecastResponse> {
    const { type, request } = params;

    if (type === "lstm") {
      return await this.executeLSTM(request as ForecastLSTMRequest);
    } else if (type === "sarima") {
      return await this.executeSARIMA(request as ForecastSARIMARequest);
    } else {
      throw new Error("Invalid forecast type");
    }
  }

  public async executeLSTM(
    request: ForecastLSTMRequest
  ): Promise<ForecastResponse> {
    try {
      return await this.gateway.executeLSTM(request);
    } catch (error) {
      throw error;
    }
  }

  public async executeSARIMA(
    request: ForecastSARIMARequest
  ): Promise<ForecastResponse> {
    try {
      return await this.gateway.executeSARIMA(request);
    } catch (error) {
      throw error;
    }
  }
}
