import ErrorResponse from "../../config/ErrorResponse";
import RiskNotebookGateway from "../../dataprovider/gateway/RiskNotebookGateway";
import { RiskNotebookResponse } from "../../dataprovider/response/RiskNotebookResponse";
import BaseService from "./BaseService";

export default class GetRiskNotebookService implements BaseService {
    public constructor (private readonly gateway: RiskNotebookGateway){}
    public async execute(params: { [key: string]: any }): Promise<RiskNotebookResponse> {
        const notebookName = params['notebookName'];

        try{
            const response = await this.gateway.execute(notebookName);
            return response
            
        } catch{
            throw new ErrorResponse(422, "Não foi possível estabelecer conexão com serviço de riscos", null);
        }
    

    }
}