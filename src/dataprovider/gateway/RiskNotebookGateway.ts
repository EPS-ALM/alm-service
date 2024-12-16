import axios from "axios";
import UrlConstants from "../../utils/constants/UrlConstants";
import { RiskNotebookResponse } from "../response/RiskNotebookResponse";
import BaseGateway from "./BaseGateway";
import { logger } from "../../config/AppLogger";

export default class RiskNotebookGateway extends BaseGateway{
    public async execute(notebookName: string): Promise<RiskNotebookResponse>{
        const baseUrl = UrlConstants.PATH_RISK_NOTEBOOK;

        const urlWithParams = this.buildRiskUrl(baseUrl, notebookName)

        const response: RiskNotebookResponse = await axios.get(urlWithParams).then(response => {
            return response.data;
        }).catch(error => {
            logger.error(error, "Erro ao chamar alm-assets markowitz")
            return null
        })

        return response;
    }
}