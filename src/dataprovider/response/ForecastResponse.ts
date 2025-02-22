export interface ForecastResponse {
  forecast_dates: string[];
  forecast_values: number[];
  plot_base64?: string;
  metrics?: {
    [key: string]: number;
  };
}
