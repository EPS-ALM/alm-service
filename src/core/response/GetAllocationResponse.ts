export interface GetAllocationResponse {
    portfolio: Array<AssetsNameAllocation>,
    plotBase64: string | null
}

export interface AssetsNameAllocation {
    name: string,
    allocation: number,
    historicalAnnualReturn: number,
    historicalAnnualVolatility: number,
    forecastAnnualReturn: number,
    forecastAnnualVolatility: number
}