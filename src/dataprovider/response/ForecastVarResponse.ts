export interface ForecastVarResponse {
    historical_metrics: {
        "Retorno Anualizado (%)": {
            [key: string]: number;
        };
        "Volatilidade Anualizada (%)": {
            [key: string]: number;
        };
    };
    historical_allocation: Array<{
        Ativo: string;
        "Peso Sugerido (%)": number;
    }>;
    forecast_metrics: {
        "Retorno Anualizado (%)": {
            [key: string]: number;
        };
        "Volatilidade Anualizada (%)": {
            [key: string]: number;
        };
    };
    forecast_allocation: Array<{
        Ativo: string;
        "Peso Sugerido (%)": number;
    }>;
}
