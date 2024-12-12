import GetAllocationService from "../../core/service/GetAllocationService";
import Controller from "../../entrypoint/controller/Controller";

export const getAllocationModule = (): Controller<GetAllocationService> => {
    const service = new GetAllocationService;
    return new Controller<GetAllocationService>(service);
}