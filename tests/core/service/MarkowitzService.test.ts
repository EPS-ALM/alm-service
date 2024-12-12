import MarkowitzService from "../../../src/core/service/MarkowitzService"
import { Assets } from "../../../src/db/model/Assets";
import { EfficientFrontier } from "../../../src/db/model/EfficientFrontier";
import AssetsConstants from "../../../src/utils/constants/AssetsConstants";

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

        Assets.update = jest
        .fn()
        .mockResolvedValue({});

        Assets.upsert = jest
        .fn()
        .mockResolvedValue({});

        EfficientFrontier.findOne = jest
        .fn()
        .mockResolvedValue(null);

        EfficientFrontier.create = jest
        .fn()
        .mockResolvedValue(null);

        const upsertSpy = jest
            .spyOn(Assets, "upsert")
        
        const updateSpy = jest
            .spyOn(Assets, "update")
        
        const createSpy = jest
            .spyOn(EfficientFrontier, "create")

        // Execute
        await service.execute();

        // Assertions
        expect(mockGateway.execute).toHaveBeenCalledWith({ tickers: AssetsConstants.ASSETS });
        expect(updateSpy).toHaveBeenCalledWith({ isActive: false }, { where: { isActive: true } });
        expect(upsertSpy).toHaveBeenCalledTimes(2);
        expect(upsertSpy).toHaveBeenCalledWith({ ticker: "AAPL", allocation: 0.4, isActive: true });
        expect(upsertSpy).toHaveBeenCalledWith({ ticker: "MSFT", allocation: 0.6, isActive: true });
        expect(createSpy).toHaveBeenCalledWith({ base64: "mock_base64_plot" });
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

        Assets.update = jest
        .fn()
        .mockResolvedValue({});

        Assets.upsert = jest
        .fn()
        .mockResolvedValue({});

        EfficientFrontier.findOne = jest
        .fn()
        .mockResolvedValue({ id: 1 });

        EfficientFrontier.update = jest
        .fn()
        .mockResolvedValue(null);

        const updateSpy = jest
            .spyOn(EfficientFrontier, "update")

        await service.execute();

        expect(updateSpy).toHaveBeenCalledWith(
            { base64: "mock_base64_plot" },
            { where: { id: 1 } }
        );
    });

    it("should handle gateway failure", async () => {
        mockGateway.execute.mockRejectedValue(new Error("Gateway error"));

        const upsertSpy = jest
            .spyOn(Assets, "upsert")
        
        const updateSpy = jest
            .spyOn(Assets, "update")

        const createSpy = jest
            .spyOn(EfficientFrontier, "create")

        await expect(service.execute()).rejects.toThrow("Gateway error");
        expect(updateSpy).not.toHaveBeenCalled();
        expect(upsertSpy).not.toHaveBeenCalled();
        expect(createSpy).not.toHaveBeenCalled();
    });
});