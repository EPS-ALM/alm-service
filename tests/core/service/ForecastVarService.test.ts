import ForecastVarService from "../../../src/core/service/ForecastVarService";
import ForecastVarGateway from "../../../src/dataprovider/gateway/ForecastVarGateway";
import { ForecastVarResponse } from "../../../src/dataprovider/response/ForecastVarResponse";
import { Assets } from "../../../src/db/model";
import AssetsConstants from "../../../src/utils/constants/AssetsConstants";


jest.mock("sequelize", () => {
  return {
    Sequelize: jest.fn().mockImplementation(() => ({
      authenticate: jest.fn(),
    })),
    Model: class {
      static init = jest.fn();
      static upsert = jest.fn();
    },
    DataTypes: {
      STRING: "string",
      DOUBLE: "double",
      BOOLEAN: "boolean",
    },
  };
});


jest.mock("../../../src/db/model", () => ({
  Assets: {
    upsert: jest.fn(),
  },
}));


jest.mock("../../../src/dataprovider/gateway/ForecastVarGateway", () => {
  return jest.fn().mockImplementation(() => ({
    execute: jest.fn(),
  }));
});

describe("ForecastVarService", () => {
  let service: ForecastVarService;
  let mockGateway: ForecastVarGateway;
  let mockAssetsUpsert: jest.Mock;

  beforeEach(() => {
    mockGateway = new ForecastVarGateway() as jest.Mocked<ForecastVarGateway>;
    mockAssetsUpsert = Assets.upsert as jest.Mock;

    service = new ForecastVarService(mockGateway);
  });

  it("deve processar os dados corretamente", async () => {
    const mockResponse: ForecastVarResponse = {
      data: [
        {
          ativo: "AAPL",
          historical_metrics: {
            "Retorno Anualizado (%)": 10,
            "Volatilidade Anualizada (%)": 15,
          },
          forecast_metrics: {
            "Retorno Anualizado (%)": 12,
            "Volatilidade Anualizada (%)": 18,
          },
          forecast_allocation: 50,
          historical_allocation: 20, 
        },
      ],
    };

    
    (mockGateway.execute as jest.Mock).mockResolvedValue(mockResponse);

    
    mockAssetsUpsert.mockResolvedValue(undefined);

    
    await service.execute();

    
    expect(mockAssetsUpsert).toHaveBeenCalledTimes(1);
    expect(mockAssetsUpsert).toHaveBeenCalledWith({
      ticker: "AAPL",
      historicalAnnualReturn: 10,
      historicalAnnualVolatility: 15,
      forecastAnnualReturn: 12,
      forecastAnnualVolatility: 18,
      forecastVarAllocation: 50,
    });
  });

  it("deve lançar um erro se o upsert falhar", async () => {
    const mockResponse: ForecastVarResponse = {
      data: [
        {
          ativo: "AAPL",
          historical_metrics: {
            "Retorno Anualizado (%)": 10,
            "Volatilidade Anualizada (%)": 15,
          },
          forecast_metrics: {
            "Retorno Anualizado (%)": 12,
            "Volatilidade Anualizada (%)": 18,
          },
          forecast_allocation: 50,
          historical_allocation: 20, 
        },
      ],
    };

    
    (mockGateway.execute as jest.Mock).mockResolvedValue(mockResponse);

    
    mockAssetsUpsert.mockRejectedValue(new Error("Erro no upsert"));

    await expect(service.execute()).rejects.toThrow("Erro no upsert");
  });

  it("deve chamar o gateway com os tickers corretos", async () => {
    const mockResponse: ForecastVarResponse = {
      data: [
        {
          ativo: "AAPL",
          historical_metrics: {
            "Retorno Anualizado (%)": 10,
            "Volatilidade Anualizada (%)": 15,
          },
          forecast_metrics: {
            "Retorno Anualizado (%)": 12,
            "Volatilidade Anualizada (%)": 18,
          },
          forecast_allocation: 50,
          historical_allocation: 20, 
        },
      ],
    };

    
    (mockGateway.execute as jest.Mock).mockResolvedValue(mockResponse);
    mockAssetsUpsert.mockResolvedValue(undefined);

    
    await service.execute();

    
    expect(mockGateway.execute).toHaveBeenCalledWith({
      tickers: AssetsConstants.ASSETS,
    });
  });
});