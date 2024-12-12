import GetCashValueService from "../../core/service/GetCashValueModule";
import Controller from "../../entrypoint/controller/Controller";

export const getCashValueModule = (): Controller<GetCashValueService> => {
    const service = new GetCashValueService;
    return new Controller<GetCashValueService>(service);
}