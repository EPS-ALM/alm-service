import axios from "axios";
import AssetsConstants from "../../utils/constants/AssetsConstants";
import { MarkowitzRequest } from "../request/MarkowitzRequest";
import { MarkowitzResponse } from "../response/MarkowitzResponse";
import UrlConstants from "../../utils/constants/UrlConstants";
import { logger } from "../../config/AppLogger";

export default class MarkowitzGateway {
    public async execute(tickers: MarkowitzRequest): Promise<MarkowitzResponse>{
        const url = UrlConstants.PATH_MARKOVITZ;

        const response: MarkowitzResponse = await axios.post(url, tickers).then(response => {
            return response.data;
        }).catch(error => {
            logger.error(error, "Erro ao chamar alm-assets markowitz")
            return null
        })
        return response;
    }
}