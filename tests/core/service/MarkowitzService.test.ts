import MarkowitzService from "../../../src/core/service/MarkowitzService"
import { Assets } from "../../../src/db/model/Assets";
import { EfficientFrontier } from "../../../src/db/model/EfficientFrontier";
import AssetsConstants from "../../../src/utils/constants/AssetsConstants";

jest.mock("../../../src/db/model/Assets");
jest.mock("../../../src/db/model/EfficientFrontier");

const mockGateway = {
    execute: jest.fn(),
};

describe("MarkowitzService", () => {
    let service: MarkowitzService;

    beforeEach(() => {
        service = new MarkowitzService(mockGateway);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should update assets and efficient frontier successfully", async () => {
        // Mock data
        const mockResponse = {
            portfolio: [
                { ticker: "AAPL", allocation: 0.4 },
                { ticker: "MSFT", allocation: 0.6 },
            ],
            plot_base64: "mock_base64_plot",
        };
        mockGateway.execute.mockResolvedValue(mockResponse);

        EfficientFrontier.findOne = jest
        .fn()
        .mockResolvedValue(null);

        // Execute
        await service.execute();

        // Assertions
        expect(mockGateway.execute).toHaveBeenCalledWith({ tickers: AssetsConstants.ASSETS });
        expect(Assets.update).toHaveBeenCalledWith({ isActive: false }, { where: { isActive: true } });
        expect(Assets.upsert).toHaveBeenCalledTimes(2);
        expect(Assets.upsert).toHaveBeenCalledWith({ ticker: "AAPL", allocation: 0.4, isActive: true });
        expect(Assets.upsert).toHaveBeenCalledWith({ ticker: "MSFT", allocation: 0.6, isActive: true });
        expect(EfficientFrontier.create).toHaveBeenCalledWith({ base64: "mock_base64_plot" });
    });

    it("should update existing efficient frontier if it exists", async () => {
        const mockResponse = {
            portfolio: [
                { ticker: "AAPL", allocation: 0.4 },
                { ticker: "MSFT", allocation: 0.6 },
            ],
            plot_base64: "mock_base64_plot",
        };
        mockGateway.execute.mockResolvedValue(mockResponse);

        EfficientFrontier.findOne = jest
        .fn()
        .mockResolvedValue({ id: 1 });

        await service.execute();

        expect(EfficientFrontier.update).toHaveBeenCalledWith(
            { base64: "mock_base64_plot" },
            { where: { id: 1 } }
        );
    });

    it("should handle gateway failure", async () => {
        mockGateway.execute.mockRejectedValue(new Error("Gateway error"));

        await expect(service.execute()).rejects.toThrow("Gateway error");
        expect(Assets.update).not.toHaveBeenCalled();
        expect(Assets.upsert).not.toHaveBeenCalled();
        expect(EfficientFrontier.create).not.toHaveBeenCalled();
    });

    it("should handle database errors gracefully", async () => {
        const mockResponse = {
            portfolio: [
                { ticker: "AAPL", allocation: 0.4 },
                { ticker: "MSFT", allocation: 0.6 },
            ],
            plot_base64: "mock_base64_plot",
        };
        mockGateway.execute.mockResolvedValue(mockResponse);

        Assets.update = jest
        .fn()
        .mockRejectedValue(new Error("Database error"));


        await expect(service.execute()).rejects.toThrow("Database error");
        expect(Assets.upsert).not.toHaveBeenCalled();
        expect(EfficientFrontier.create).not.toHaveBeenCalled();
    });
});