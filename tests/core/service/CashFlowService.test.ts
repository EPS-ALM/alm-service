import CashFlowService from "../../../src/core/service/CashFlowService";
import { Cash } from "../../../src/db/model";
import { Clients } from "../../../src/db/model/Clients";

jest.mock("../../../src/db/model", () => ({
  Cash: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("../../../src/db/model/Clients", () => ({
  Clients: {
    findOne: jest.fn(),
  },
}));

describe("CashFlowService", () => {
  let cashFlowService: CashFlowService;

  beforeEach(() => {
    cashFlowService = new CashFlowService();
    jest.clearAllMocks();
  });

  it("should update cash value if both cashDb and clientsDb are found", async () => {
    // Arrange
    const mockCash = { id: 1, inCash: 1000 };
    const mockClients = { number: 10 };

    // Força o TypeScript a reconhecer como mock
    (Cash.findOne as jest.Mock).mockResolvedValue(mockCash);
    (Clients.findOne as jest.Mock).mockResolvedValue(mockClients);

    // Act
    await cashFlowService.execute();

    // Assert
    expect(Cash.findOne).toHaveBeenCalledTimes(1);
    expect(Clients.findOne).toHaveBeenCalledTimes(1);
    expect(Cash.update).toHaveBeenCalledWith(
      { inCash: 1000 + 300 * (10 + 5) },
      { where: { id: 1 } }
    );
  });

  it("should not update cash value if cashDb is not found", async () => {
    // Arrange
    (Cash.findOne as jest.Mock).mockResolvedValue(null);
    (Clients.findOne as jest.Mock).mockResolvedValue({ number: 10 });

    // Act
    await cashFlowService.execute();

    // Assert
    expect(Cash.findOne).toHaveBeenCalledTimes(1);
    expect(Clients.findOne).toHaveBeenCalledTimes(1);
    expect(Cash.update).not.toHaveBeenCalled();
  });

  it("should not update cash value if clientsDb is not found", async () => {
    // Arrange
    (Cash.findOne as jest.Mock).mockResolvedValue({ id: 1, inCash: 1000 });
    (Clients.findOne as jest.Mock).mockResolvedValue(null);

    // Act
    await cashFlowService.execute();

    // Assert
    expect(Cash.findOne).toHaveBeenCalledTimes(1);
    expect(Clients.findOne).toHaveBeenCalledTimes(1);
    expect(Cash.update).not.toHaveBeenCalled();
  });
});
