import { Cash } from "../../db/model";
import BaseService from "./BaseService";

export default class CashFlowService implements BaseService {
    public async execute(){
        const cashDb = await Cash.findOne();

        if(cashDb){
            const newCashValue = cashDb.inCash + 1500;

            await Cash.update({
                inCash: newCashValue
            }, {
                where: {
                    id: cashDb.id
                }
            });
        }
    }
}