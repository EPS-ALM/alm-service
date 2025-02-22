export interface TimeSeriesData {
  dates: string[];
  values: number[];
}

export interface ForecastLSTMRequest {
  data: TimeSeriesData;
  ticker: string;
  n_steps?: number;
  sequence_length?: number;
  n_features?: number;
  n_layers?: number;
  n_units?: number;
  epochs?: number;
  batch_size?: number;
}

export interface ForecastSARIMARequest {
  ticker: string;
  n_steps: number;
  order?: [number, number, number];
  seasonal_order?: [number, number, number, number];
  days?: number;
}
