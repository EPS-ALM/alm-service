import { Cash } from "../../db/model";
import { GetCashValueResponse } from "../response/GetCashValueResponse";
import BaseService from "./BaseService";

export default class GetCashValueService implements BaseService{
    public async execute(params: { [key: string]: any }): Promise<GetCashValueResponse> {
        const cash = await Cash.findOne();

        return {
            invested: cash ? cash.invested : 0,
            inCash:  cash ? cash.inCash : 0
        } as GetCashValueResponse;
    }
}