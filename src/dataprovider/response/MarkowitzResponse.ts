export interface MarkowitzResponse {
    portfolio: Array<AssetAllocation>,
    plot_base64: string
}

export interface AssetAllocation{
    ticker: string, 
    allocation: number
}