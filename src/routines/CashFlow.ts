import CashFlowService from "../core/service/CashFlowService";

export const cashFlow = async () => {
    await new CashFlowService().execute();
}