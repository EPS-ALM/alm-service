import axios from "axios";
import AssetsConstants from "../../utils/constants/AssetsConstants";
import { ForecastVarRequest } from "../request/ForecastVarRequest";
import { ForecastVarResponse } from "../response/ForecastVarResponse";
import UrlConstants from "../../utils/constants/UrlConstants";
import { logger } from "../../config/AppLogger";

export default class ForecastVarGateway {
    public async execute(tickers: ForecastVarRequest): Promise<ForecastVarResponse>{
        const url = UrlConstants.PATH_MARKOVITZ;

        const response: ForecastVarResponse = await axios.post(url, tickers).then(response => {
            return response.data;
        }).catch(error => {
            logger.error(error, "Erro ao chamar alm-assets forecast_var")
            return null
        })
        return response;
    }
}