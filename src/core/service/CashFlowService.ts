import { Cash } from "../../db/model";
import { Clients } from "../../db/model/Clients";
import BaseService from "./BaseService";

export default class CashFlowService implements BaseService {
    public async execute(){
        const cashDb = await Cash.findOne();
        const clientsDb = await Clients.findOne();


        if(cashDb && clientsDb){
            const newClientsNumber = clientsDb.number + 5;
            const newCashValue = cashDb.inCash + (1500 * newClientsNumber);

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