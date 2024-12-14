import { logger } from "../../config/AppLogger";
import ForecastVarGateway from "../../dataprovider/gateway/ForecastVarGateway";
import { ForecastVarRequest } from "../../dataprovider/request/ForecastVarRequest";
import { ForecastVarResponse } from "../../dataprovider/response/ForecastVarResponse";
import Forecast from "../../db/model/Forecast";
import { EfficientFrontier } from "../../db/model/EfficientFrontier";
import AssetsConstants from "../../utils/constants/AssetsConstants";
import BaseService from "./BaseService";
import { Op } from "sequelize";

export default class ForecastVarService implements BaseService {
    public constructor(
        private readonly gateway: ForecastVarGateway
    ) { }

    public async execute(){
        const tickersRequest: ForecastVarRequest = {tickers: AssetsConstants.ASSETS};

        const response: ForecastVarResponse = await this.gateway.execute(tickersRequest);

        await Forecast.update({isActive: false}, {where: {isActive: true}});
        try{
            for(const allocation of response.forecast_allocation) {
                await Forecast.upsert({
                    ticker: allocation.Ativo,
                    allocation: allocation["Peso Sugerido (%)"],
                    isActive: true,
                    historicalAnnualReturn: response.historical_metrics["Retorno Anualizado (%)"][allocation.Ativo] || null,
                    historicalAnnualVolatility: response.historical_metrics["Volatilidade Anualizada (%)"][allocation.Ativo] || null,
                    forecastAnnualReturn: response.forecast_metrics["Retorno Anualizado (%)"][allocation.Ativo] || null,
                    forecastAnnualVolatility: response.forecast_metrics["Volatilidade Anualizada (%)"][allocation.Ativo] || null
                });
            }
        } catch(e){
            logger.error("Certifique que o serviço de ativos esteja rodando!!! Erro -> ", e);

            throw e;
        }
        
    }
}