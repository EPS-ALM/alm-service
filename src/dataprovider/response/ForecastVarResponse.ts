interface Metrics {
    "Retorno Anualizado (%)": number;
    "Volatilidade Anualizada (%)": number;
}

interface AllocationData {
    ativo: string;
    historical_metrics: Metrics;
    historical_allocation: number;
    forecast_metrics: Metrics;
    forecast_allocation: number;
}
  
export interface ForecastVarResponse {
    data: AllocationData[];
}