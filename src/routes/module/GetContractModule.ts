import GetContractService from "../../core/service/GetContractService";
import Controller from "../../entrypoint/controller/Controller";

export const getContractModule = (): Controller<GetContractService> => {
    const service = new GetContractService();
    return new Controller<GetContractService>(service);
}