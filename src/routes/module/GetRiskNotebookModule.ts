import GetRiskNotebookService from "../../core/service/GetRiskNotebookService";
import RiskNotebookGateway from "../../dataprovider/gateway/RiskNotebookGateway";
import Controller from "../../entrypoint/controller/Controller";

export const getRiskNotebookModule = (): Controller<GetRiskNotebookService> => {
    const gateway = new RiskNotebookGateway();
    const service = new GetRiskNotebookService(gateway);
    return new Controller<GetRiskNotebookService>(service);
}