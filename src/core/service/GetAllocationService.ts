import { Assets } from "../../db/model/Assets";
import { EfficientFrontier } from "../../db/model/EfficientFrontier";
import { AssetsNameAllocation, GetAllocationResponse } from "../response/GetAllocationResponse";
import BaseService from "./BaseService";

export default class GetAllocationService implements BaseService{
    public async execute(params: { [key: string]: any }): Promise<GetAllocationResponse> {
        //Exemplo
        // const userId = params['userId'];
        // const request = params['request'] as Request;

        const assets = await Assets.findAll({where: {isActive: true}});

        const portfolio: Array<AssetsNameAllocation> = []

        assets.forEach((asset) => {
            portfolio.push({
                name: asset.ticker, 
                allocation: asset.markowitzAllocation ?? 0,
                historicalAnnualReturn: asset.historicalAnnualReturn ?? 0,
                historicalAnnualVolatility: asset.historicalAnnualVolatility ?? 0,
                forecastAnnualReturn: asset.forecastAnnualReturn ?? 0,
                forecastAnnualVolatility: asset.forecastAnnualVolatility ?? 0
            });
        });

        const plotBase64 = await EfficientFrontier.findOne();

        return {
            portfolio: portfolio,
            plotBase64: plotBase64 ? plotBase64.base64 : null
        }
    }
}